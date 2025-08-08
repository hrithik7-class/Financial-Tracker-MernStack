import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jsonWebToken.js'


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const jwtToken = generateToken(user)
        res.cookie("jwt", jwtToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "strict"
        })
        res.json({
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const signup = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name , email and password" })
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        const jwtToken = generateToken(user)
        res.cookie("jwt", jwtToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true,
            sameSite: "strict"
        })

        res.status(201).json({
            user: { name: user.name, email: user.email, ...user._doc },
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ message: "logout successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({
            name: user.name,
            ...user._doc,

        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}