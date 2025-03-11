const express = require("express");
const {isShop, isAuthenticated} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Event = require("../model/event");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const fs = require("fs");


// create event
router.post(
    "/create-event", upload.array("images"),
    catchAsyncErrors(async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await Shop.findById(shopId);
            if (!shop) {
                return next(new ErrorHandler("Shop Id is invalid!", 400));
            } else {
                const files = req.files;
                const imageUrls = files.map((file) => `${file.filename}`);


                const eventData = req.body;
                eventData.images = imageUrls;
                eventData.shop = shop;

                const product = await Event.create(eventData);

                res.status(201).json({
                    success: true,
                    product,
                });
            }
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// get all events
router.get(
    "/get-all-events/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const events = await Event.find({shopId: req.params.id});

            res.status(201).json({
                success: true,
                events,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// delete events of a shop
router.delete(
    "/delete-shop-event/:id",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const eventId = req.params.id;

            // First find the event to get images
            const eventData = await Event.findById(eventId);

            if (!eventData) {
                return next(new ErrorHandler("Event not found with this id", 404));
            }

            // Delete associated images from server
            eventData.images.forEach((image) => {
                const filename = image;
                const filePath = `uploads/${filename}`; // Adjust path according to your storage

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log("❌ Error deleting file:", err);
                        // You might want to handle this error differently
                    }
                });
            });

            // Then delete from database
            const event = await Event.findByIdAndDelete(eventId);

            if (!event) {
                return next(new ErrorHandler("Event is not found with this id", 500));
            }

            res.status(200).json({
                success: true,
                message: "Event deleted successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// // get all products
// router.get(
//     "/get-all-products",
//     catchAsyncErrors(async (req, res, next) => {
//         try {
//             const products = await Product.find().sort({ createdAt: -1 });
//
//             res.status(201).json({
//                 success: true,
//                 products,
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error, 400));
//         }
//     })
// );
//
// // all events --- for admin
// router.get(
//   "/admin-all-events",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const events = await Event.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         events,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
