import jwt from "jsonwebtoken";


const createToken = (user) => {
    return jwt.sign({
        email: user.email,
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export { createToken };