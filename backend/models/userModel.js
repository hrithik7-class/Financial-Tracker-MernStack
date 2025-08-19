import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userModel =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must be at least 6 characters']
    },
    refreshToken:{
        type:String,
    }

}, {
    timestamps: true
})
//Arrow functions do not bind their own this, so this.isModified and this.password will be undefined.
userModel.pre(("save"), async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
        next();
    } catch (error) {
        console.log(error.message,"Error in hashing the password"); 
    }    
})

userModel.methods.comparePassword= async function(password){
    try {
        return await bcrypt.compare(password , this.password);
    } catch (error) {
        console.log(error.message, "error in comparing the Password")  
    }
}

userModel.methods.generateAccesstoken=  function(){

        return jwt.sign({_id: this._id, email: this.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRED}
        )
}

userModel.methods.generateRefreshtoken=  function(){

        return  jwt.sign({_id:this._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:process.env.REFRESH_TOKEN_EXPIRED}
        )
}

const User = mongoose.model('User', userModel);
export default User;