const express = require("express");
const {isShop, isAuthenticated, isAdmin} = require("../Middleware/auth");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../Model/product");
const Shop = require("../Model/shop");
const Order = require("../Model/order");
const ErrorHandler = require("../Utils/ErrorHandler");
const upload = require("../multer");
const fs = require("fs");

// create product
router.post(
    "/create-product", upload.array("images"),
    catchAsyncErrors(async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await Shop.findById(shopId);
            if (!shop) {
                return next(new ErrorHandler("Shop Id is invalid!", 400));
            } else {
                const files = req.files;
                const imageUrls = files.map((file) => `${file.filename}`);
                const productData = req.body;
                productData.images = imageUrls;
                productData.shop = shop;

                const product = await Product.create(productData);

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

// get all products of a shop
router.get(
    "/get-all-products-shop/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find({shopId: req.params.id});

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// delete product of a shop
router.delete(
    "/delete-shop-product/:id",
    isShop,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const productId = req.params.id;

            // First find the Product to get images
            const productData = await Product.findById(productId);

            if (!productData) {
                return next(new ErrorHandler("Product not found with this id", 404));
            }

            // Delete associated images from server
            productData.images.forEach((image) => {
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
            const product = await Product.findByIdAndDelete(productId);

            if (!product) {
                return next(new ErrorHandler("Product is not found with this id", 500));
            }

            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Get a product based on ID
router.get(
    `/:id`,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json({
                success: true,
                product,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
