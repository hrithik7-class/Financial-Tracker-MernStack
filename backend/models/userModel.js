import mongoose from 'mongoose';

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

}, {
    timestamps: true
    //real time update
})

const User = mongoose.model('User', userModel);
export default User;