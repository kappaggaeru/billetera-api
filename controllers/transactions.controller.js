const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");

exports.list = async (req, res) => {
    console.log("GET /api/transactions");
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.find = async (req, res) => {
    const { id } = req.params.id;
    console.log("GET /api/transactions/id", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Server error", detail: err.message });
    }
}

exports.add = async (req, res) => {
    console.log("POST /api/transactions", req.body);
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    console.log("PUT /api/transactions", req.body);
    try {
        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).send("Not found");
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.remove = async (req, res) => {
    console.log("DELETE /api/transactions", req.params.id);
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).send("Not found");
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
