import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

//use secure the token
dotenv.config();
const app = express();

//parsing data in the body of request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//innitialize and connect db
mongoose.connect(
    "mongodb+srv://rukshan:0000@cluster0.jp80oft.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    }
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use((err, req, res) => {
    res.status(500).send({ message: err.message });
});

const port = 5001;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
