import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { userModel } from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/generateJWTToken.js";
const getAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await userModel.find({}, { __v: false, password: false, token: false });

    res.status(200).json({ status: "Success", data: users });
});


const register = asyncWrapper(async (req, res, next) => {
    const { username, password, email, role } = req.body;
    if (!username || !password) {
        return next(new AppError("Please Provide Your all Data", "Failed", 400));
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
        return next(new AppError("this Email is already exist", 'Failed', 400))
    }
    // const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        username,
        password: hashedPassword,
        email,
        role
    });

    await newUser.save();
    newUser.password = "********";
    res.status(201).json({ status: "Success", data: newUser });
})

const login = asyncWrapper(async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password) {
        return next(new AppError("Please Provide Your all Data", "Failed", 400));
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
        return next(new AppError('Not Found User', "Failed", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new AppError('The Password Is Wrong', 'Failed', 400));
    }
    const token = await createToken(user);
    user.token = token;
    await user.save();
    user.password = '******';
    res.status(200).json({ status: "Success", message: `welcome back ${username}`, data: user });
})


export { register, getAllUsers, login }