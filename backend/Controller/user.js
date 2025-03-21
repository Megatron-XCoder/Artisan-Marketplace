const express = require("express");
const User = require("../Model/user");
const router = express.Router();
const upload = require("../multer");
const fs = require("fs");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");
const sendToken = require("../Utils/sendToken");
const {isAuthenticated, isAdmin} = require("../Middleware/auth");

// Create and activate user
router.post("/create-user", upload.single("avatar"), async (req, res, next) => {
    try {
        console.log("📩 Incoming Request:", req.body);
        console.log("📁 Uploaded File:", req.file);

        if (!req.file) {
            console.log("❌ No file received");
            return res.status(400).json({message: "File upload failed. No file received."});
        }

        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("🚫 User already exists:", email);

            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("❌ Error deleting file:", err);
                }
            });
            return next(new ErrorHandler("User already exists", 400));
        }

        // Store file path correctly
        const fileUrl = req.file.path;

        // Create user object
        const user = new User({
            name,
            email,
            password,
            avatar: fileUrl,
        });

        // Generate activation token
        const activationToken = createActivationToken(user);

        // Activation URL
        const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;

        try {
            // ... (previous code remains the same)
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title> Email for Activation </title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f7f9fc;">
                <table style="max-width: 600px; margin: 40px auto;">
                    <tr>
                        <td style="padding: 40px 30px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 30px;">
                                        <img src="https://cdn.shopify.com/s/files/1/0412/5117/6615/files/The_Artisan_Marketplace_-_Logo_1caa2512-2a37-417f-948e-bb571f16e582.jpg" alt="Company Logo" width="150" style="max-width: 150px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #1a1a1a;">
                                        <h1 style="font-size: 24px; margin: 0 0 25px; color: #2d3436; text-align: center;">Welcome to Artisan Marketplace!</h1>
                                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hi ${user.name},</p>
                                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px;">Thank you for creating an account. Please click the button below to verify your email address and activate your account.</p>
                                        <div style="text-align: center; margin: 40px 0;">
                                            <a href="${activationUrl}" style="background-color: #4361ee; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(67,97,238,0.25);">Activate Account</a>
                                        </div>
                                        <p style="font-size: 14px; line-height: 1.6; margin: 30px 0 0; color: #666;">
                                            If you didn't create this account, you can safely ignore this email.
                                            <br>Need help? Contact our <a href="mailto:support@artisanmarket.com" style="color: #4361ee; text-decoration: none;">support team</a>.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 25px 30px; text-align: center;">
                            <p style="font-size: 12px; color: #666; margin: 0;">
                                © ${new Date().getFullYear()} Artisan Marketplace. All rights reserved.
                                <br>123 Market Street, Suite 456, Creative City, CC 7890
                            </p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `,
            });

            console.log("📧 Activation email sent to:", user.email);

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account!`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        console.log("❌ Error creating user:", error.message);
        return next(new ErrorHandler(error.message, 400));
    }
});

const createActivationToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
    };
    return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
        expiresIn: "10m",
    });
};

// Activate user
router.get(
    "/activation/:activation_token",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const {activation_token} = req.params;
            const decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

            // Check if user already exists
            const existingUser = await User.findOne({email: decoded.email});
            if (existingUser) {
                return next(new ErrorHandler("User already exists!", 400)); // Graceful error
            }

            // Create user if they don't exist
            const user = await User.create({...decoded});
            sendToken(user, 200, res); // Send token and response

        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//login user
router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please provide the all fields!", 400));
            }

            const user = await User.findOne({email}).select("+password");

            if (!user) {
                return next(new ErrorHandler("User doesn't exists!", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// load user
router.get(`/getUser`,
    isAuthenticated,
    async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return next(new ErrorHandler(`User doesn't exists!`));
            }

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    });


// log out user
router.get(
    "/logout",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.status(201).json({
                success: true,
                message: "Log out successful!",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


// update user info
router.put(
    "/update-user-info",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const {email, password, phoneNumber, name} = req.body;

            const user = await User.findOne({email}).select("+password");

            if (!user) {
                return next(new ErrorHandler("User not found", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }

            user.name = name;
            user.email = email;
            user.phoneNumber = phoneNumber;

            await user.save();

            res.status(201).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


// update user addresses
router.put(
    "/update-user-addresses",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            const sameTypeAddress = user.addresses.find(
                (address) => address.addressType === req.body.addressType
            );
            if (sameTypeAddress) {
                return next(
                    new ErrorHandler(`${req.body.addressType} address already exists`)
                );
            }

            const existsAddress = user.addresses.find(
                (address) => address._id === req.body._id
            );

            if (existsAddress) {
                Object.assign(existsAddress, req.body);
            } else {
                // add the new address to the array
                user.addresses.push(req.body);
            }

            await user.save();

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user information with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



module.exports = router;


//
// // update user avatar
// router.put(
//   "/update-avatar",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       let existsUser = await User.findById(req.user.id);
//       if (req.body.avatar !== "") {
//         const imageId = existsUser.avatar.public_id;
//
//         await cloudinary.v2.uploader.destroy(imageId);
//
//         const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//           folder: "avatars",
//           width: 150,
//         });
//
//         existsUser.avatar = {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         };
//       }
//
//       await existsUser.save();
//
//       res.status(200).json({
//         success: true,
//         user: existsUser,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
//



//
// // all users --- for admin
// router.get(
//   "/admin-all-users",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const users = await User.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         users,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
//
// // delete users --- admin
// router.delete(
//   "/delete-user/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);
//
//       if (!user) {
//         return next(
//           new ErrorHandler("User is not available with this id", 400)
//         );
//       }
//
//       const imageId = user.avatar.public_id;
//
//       await cloudinary.v2.uploader.destroy(imageId);
//
//       await User.findByIdAndDelete(req.params.id);
//
//       res.status(201).json({
//         success: true,
//         message: "User deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
//
