import mongoose from 'mongoose';


const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [1, 'Amount must be positive']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
