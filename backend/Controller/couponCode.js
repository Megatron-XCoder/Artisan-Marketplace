const express = require("express");
const {isShop, isAuthenticated} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Shop = require("../model/shop");
const CouponCode = require("../Model/couponCode");
const ErrorHandler = require("../utils/ErrorHandler");


// create coupon code
// Update create-coupon-code route
router.post(
    "/create-coupon-code",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const exists = await CouponCode.findOne({ name: req.body.name });
            if (exists) {
                return next(new ErrorHandler("Coupon code already exists!", 400));
            }

            const couponData = {
                ...req.body,
                shop: req.body.shop,
            };

            const couponCode = await CouponCode.create(couponData);

            res.status(201).json({
                success: true,
                couponCode,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    })
);


// get all coupons of a shop
router.get(
    "/get-coupon/:id",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const couponCodes = await CouponCode.find({
                "shop._id": req.params.id // Use dot notation for nested object
            });
            res.status(200).json({ // Change status to 200 for GET requests
                success: true,
                couponCodes,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Add this route to your backend
router.delete(
    "/delete-coupon/:id",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const coupon = await CouponCode.findByIdAndDelete(req.params.id);
            if (!coupon) {
                return next(new ErrorHandler("Coupon not found!", 404));
            }
            res.status(200).json({
                success: true,
                message: "Coupon deleted successfully!"
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// // get coupon code value by its name
// router.get(
//   "/get-coupon-value/:name",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const couponCode = await CouponCode.findOne({ name: req.params.name });
//
//       res.status(200).json({
//         success: true,
//         couponCode,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

module.exports = router;
