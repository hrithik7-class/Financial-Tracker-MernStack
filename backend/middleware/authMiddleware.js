import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    // const token = req.cookies.jwt ;
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded?._id).select("-password -refreshToken") //add line
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Invalid token");
        return res.status(401).json({ message: 'Invalid token' });
    }
}