import { AppError } from "../utils/appError.js"

const verifyRole = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return next(new AppError("You Are not Allowed to Access this", "Failed", 401));
        }
    }

}

export { verifyRole };