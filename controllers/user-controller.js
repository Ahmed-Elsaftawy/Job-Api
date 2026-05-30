import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { userModel } from "../models/User.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";




const regester = asyncWrapper(async (req, res, next) => {
    const { username, password, email, role } = req.body;

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

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await userModel.find({}, { __v: false });

    res.status(200).json({ status: "Success", data: users });
})


export { regester,getAllUsers }