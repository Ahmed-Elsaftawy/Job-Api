import express from "express";
import { regester, getAllUsers, login } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
const userRouter = express.Router();

userRouter.route('/regester').post(regester);
userRouter.route('/login').post(login);
userRouter.route('/').get(verifyToken, verifyRole('admin', 'manager'), getAllUsers);

export { userRouter }