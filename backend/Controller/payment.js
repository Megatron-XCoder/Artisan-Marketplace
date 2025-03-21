const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
    "/process",
    catchAsyncErrors(async (req, res, next) => {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Artisan MarketPlace",
            },
        });
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret,
        });
    })
);

router.get(
    "/stripeApikey",
    catchAsyncErrors(async (req, res, next) => {
        res.status(200).json({stripeApikey: process.env.STRIPE_API_KEY});
    })
);


module.exports = router;