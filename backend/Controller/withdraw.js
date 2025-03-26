const Shop = require("../Model/shop");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const express = require("express");
const {isAuthenticated, isAdmin, isShop} = require("../Middleware/auth");
const Withdraw = require("../Model/withdraw");
const sendMail = require("../Utils/sendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
    "/create-withdraw-request",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
      try {
        console.log("🔍 Received withdraw request:", req.body);

        const { amount } = req.body;

        if (!amount || amount <= 0) {
          console.log("❌ Invalid amount received:", amount);
          return next(new ErrorHandler("Invalid withdraw amount", 400));
        }

        console.log("✅ Withdraw amount is valid:", amount);

        const data = {
          shop: req.shop,
          amount,
        };

        console.log("📩 Sending withdrawal email to:", req.shop.email);

        try {
          await sendMail({
            email: req.shop.email,
            subject: "Withdrawal Request Received",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Withdrawal Request Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f7f9fc;">
                <table style="max-width: 600px; margin: 40px auto;">
                    <tr>
                        <td style="padding: 40px 30px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 30px;">
                                        <img src="https://cdn.shopify.com/s/files/1/0412/5117/6615/files/The_Artisan_Marketplace_-_Logo_1caa2512-2a37-417f-948e-bb571f16e582.jpg" 
                                             alt="Company Logo" 
                                             width="150" 
                                             style="max-width: 150px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #1a1a1a;">
                                        <h1 style="font-size: 24px; margin: 0 0 25px; color: #2d3436; text-align: center;">
                                            Withdrawal Request Received
                                        </h1>
                                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                            Hello ${req.shop.name},
                                        </p>
                                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                                            We've received your request to withdraw:
                                        </p>
                                        <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                                            <div style="font-size: 32px; font-weight: 600; color: #4361ee;">
                                                $${amount.toFixed(2)}
                                            </div>
                                        </div>
                                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px; text-align: center;">
                                            Your withdrawal is being processed and should be completed within 
                                            <strong>3-7 business days</strong>.
                                        </p>
                                        <div style="border-top: 1px solid #e9ecef; margin: 40px 0; padding-top: 30px;">
                                            <h3 style="font-size: 18px; margin: 0 0 15px;">Next Steps:</h3>
                                            <ul style="font-size: 14px; line-height: 1.6; padding-left: 20px; margin: 0 0 30px;">
                                                <li>Monitor your bank account for the deposit</li>
                                                <li>Check your email for confirmation of completion</li>
                                                <li>Contact support if not received within 7 days</li>
                                            </ul>
                                        </div>
                                        <p style="font-size: 14px; line-height: 1.6; margin: 30px 0 0; color: #666;">
                                            Need assistance? Contact our 
                                            <a href="mailto:support@artisanmarket.com" 
                                               style="color: #4361ee; text-decoration: none;">
                                                support team
                                            </a> 
                                            or visit our 
                                            <a href="https://artisanmarket.com/help" 
                                               style="color: #4361ee; text-decoration: none;">
                                                Help Center
                                            </a>.
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
                    `
          });

          console.log("✅ Email sent successfully!");
          res.status(201).json({
            success: true,
          });
        } catch (error) {
          console.log("❌ Error sending email:", error.message);
          return next(new ErrorHandler(error.message, 500));
        }

        console.log("💾 Creating withdraw record in database...");
        const withdraw = await Withdraw.create(data);
        console.log("✅ Withdraw record created:", withdraw);

        console.log("🔄 Fetching shop details...");
        const shop = await Shop.findById(req.shop._id);
        console.log("✅ Shop details fetched:", shop);

        console.log("💰 Updating shop balance...");
        shop.availableBalance = shop.availableBalance - amount;

        await shop.save();
        console.log("✅ Shop balance updated successfully:", shop.availableBalance);

        res.status(201).json({
          success: true,
          withdraw,
        });
      } catch (error) {
        console.log("❌ Error in withdraw request process:", error.message);
        return next(new ErrorHandler(error.message, 500));
      }
    })
);


// // get all withdraws --- admin
//
// router.get(
//   "/get-all-withdraw-request",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const withdraws = await Withdraw.find().sort({ createdAt: -1 });
//
//       res.status(201).json({
//         success: true,
//         withdraws,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // update withdraw request ---- admin
// router.put(
//   "/update-withdraw-request/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { shopId } = req.body;
//
//       const withdraw = await Withdraw.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "succeed",
//           updatedAt: Date.now(),
//         },
//         { new: true }
//       );
//
//       const shop = await Shop.findById(shopId);
//
//       const transaction = {
//         _id: withdraw._id,
//         amount: withdraw.amount,
//         updatedAt: withdraw.updatedAt,
//         status: withdraw.status,
//       };
//
//       shop.transactions = [...shop.transactions, transaction];
//
//       await shop.save();
//
//       try {
//         await sendMail({
//           email: shop.email,
//           subject: "Payment confirmation",
//           message: `Hello ${shop.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
//         });
//       } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//       }
//       res.status(201).json({
//         success: true,
//         withdraw,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
