import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : "";


    if (!token) return next(new AppError("token is required", 'Failed', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next()
}

export { verifyToken };