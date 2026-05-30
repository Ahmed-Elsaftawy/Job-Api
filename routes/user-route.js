import express from "express";
import { regester,getAllUsers } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route('/regester').post(regester);
userRouter.route('/').get(getAllUsers);

export { userRouter }