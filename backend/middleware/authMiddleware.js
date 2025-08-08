import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.log("Invalid token");
        return res.status(401).json({ message: 'Invalid token' });
    }
}