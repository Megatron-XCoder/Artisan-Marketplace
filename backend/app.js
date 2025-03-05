const express = require("express");
const ErrorHandler = require("./Middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(express.json());
app.use(cookieParser());
// app.use("/test", (req, res) => {
//     res.send("Hello world!");
// });
app.use("/uploads",express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: ".env",
    });
}
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

// import routes
const user = require("./Controller/user");
const shop = require("./controller/shop");
// const product = require("./controller/product");
// const event = require("./controller/event");
// const coupon = require("./controller/coupounCode");
// const payment = require("./controller/payment");
// const order = require("./controller/order");
// const conversation = require("./controller/conversation");
// const message = require("./controller/message");
// const withdraw = require("./controller/withdraw");
//
app.use("/user", user);
app.use("/shop", shop);
// app.use("/conversation", conversation);
// app.use("/message", message);
// app.use("/order", order);
// app.use("/product", product);
// app.use("/event", event);
// app.use("/coupon", coupon);
// app.use("/payment", payment);
// app.use("/withdraw", withdraw);
//
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
