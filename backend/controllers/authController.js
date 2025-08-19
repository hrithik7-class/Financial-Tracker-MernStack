import User from '../models/userModel.js'
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccesstoken();
        const refreshToken = await user.generateRefreshtoken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }

    } catch (error) {
        res.status(500).json("Something went wrong while generation access and refresh token");
    }
};

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
        const passwordValid = await user.comparePassword(password)
        if (!passwordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)

            .json({
                user: loggedInUser,
                accessToken,
                refreshToken,
                message: "User logged In Successfully"
            })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name , email and password" })
        }

        const Existinguser = await User.findOne({
            $or: [
                { email }, { password }
            ]
        });
        if (Existinguser) {
            return res.status(400).json({ meassage: "user is alreasy  exist" })
        }
        
        const user = await User.create({ name, email, password });
       
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const RegisterUser = await User.findById(user._id).select("-password -refreshToken")

         if (!RegisterUser) {
            res.status(500).json({ meassage: "something went wrong while registering the user!" });
        }


        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)

            .json({
                user: RegisterUser,
                accessToken,
                refreshToken,
                message: "User Ragistrated successfully"
            })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};

export const logout = async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1 // this removes the field from document
        }
    },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ meassage: "user logout successfully" })
};

export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        res.status(401).json("Unauthorized request");
    }
    try {
        const decordedToken = jwt.verify(
            incomingRefreshToken,
            REFRESH_TOKEN_SECRET
        )
        const user = await User.fingById(decordedToken._id)
        if (!user) {
            res.status(401).json("Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            res.status(401).json("refresh token in expired or used!");
        }
        const options = {
            httpOnly: true,
            secure: true
        }

        const { newRefreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                accessToken, refeshToken: newRefreshToken
            }, "Access token refresh succesfully.")

    } catch (error) {
        res.status(401).json(error.message)

    }

};

export const getProfile = async (req, res) => {
    try {
        return res.status(200)
        .json({user:req.user, message: "current user fetched" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};