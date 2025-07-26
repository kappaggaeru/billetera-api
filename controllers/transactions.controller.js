const Transaction = require("../models/transaction.model");
const {
    validateObjectId,
    handleBadRequest,
    handleNotFound,
    handleServerError
} = require("../utils/controllerHelpers");

exports.list = async (req, res) => {
    console.log("GET /api/transactions");
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        return handleServerError(res, err);
    }
};

exports.find = async (req, res) => {
    const { id } = req.params;
    console.log("GET /api/transactions/id", id);
    if (!validateObjectId(id, res)) return;
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) return handleNotFound(res, "Transaction not found");
        res.json(transaction);
    } catch (err) {
        return handleServerError(res, err);
    }
}

exports.add = async (req, res) => {
    console.log("POST /api/transactions", req.body);
    try {
        const { type, amount, category, account, description } = req.body;
        const transaction = new Transaction({ type, amount, category, account, description });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        return handleBadRequest(res, err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    console.log("PUT /api/transactions", id, req.body);
    if (!validateObjectId(id, res)) return;
    try {
        const { type, amount, category, account, description } = req.body;
        const updated = await Transaction.findByIdAndUpdate(
            id,
            { type, amount, category, account, description },
            { new: true }
        );
        if (!updated) return handleNotFound(res, "Transaction not found");
        res.json(updated);
    } catch (err) {
        return handleBadRequest(res, err);
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    console.log("DELETE /api/transactions", id);
    if (!validateObjectId(id, res)) return;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) return handleNotFound(res, "Transaction not found");
        res.sendStatus(204);
    } catch (err) {
        return handleServerError(res, err);
    }
};
