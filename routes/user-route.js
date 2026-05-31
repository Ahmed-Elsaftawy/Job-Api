import express from "express";
import { register, getAllUsers, login } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/').get(verifyToken, verifyRole('admin', 'manager'), getAllUsers);

export { userRouter }