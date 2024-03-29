import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { genarateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        const createdUSers = await User.insertMany(data.users);
        res.send({ createdUSers });
    })
);

userRouter.post(
    "/signin",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: genarateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password..." });
    })
);

userRouter.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: genarateToken(createdUser),
        });
    })
);
userRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);

export default userRouter;
