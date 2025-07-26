const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
