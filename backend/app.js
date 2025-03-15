const express = require("express");
const ErrorHandler = require("./Middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Page</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    color: white;
                    text-align: center;
                }
                .container {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    max-width: 400px;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 1.2rem;
                    margin-top: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1> 🚀 Test Successful !!! </h1>
                <p>Enjoy your Day.. ~ Artisan MarketPlace</p>
                <p>Thanks for testing our Backend..</p>
            </div>
        </body>
        </html>
    `);
});

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

// config
require("dotenv").config();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

// import routes
const user = require("./Controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
// const payment = require("./controller/payment");
// const order = require("./controller/order");
// const conversation = require("./controller/conversation");
// const message = require("./controller/message");
// const withdraw = require("./controller/withdraw");
//
app.use("/user", user);
app.use("/shop", shop);
app.use("/product", product);
app.use("/event", event);
app.use("/coupon", coupon);
// app.use("/conversation", conversation);
// app.use("/message", message);
// app.use("/order", order);
// app.use("/payment", payment);
// app.use("/withdraw", withdraw);


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
