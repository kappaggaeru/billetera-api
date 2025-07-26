const mongoose = require("mongoose");
const Category = require("../models/category.model");

exports.list = async (req, res) => {
    console.log("GET /api/categories");
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.find = async (req, res) => {
    const id = req.params.id;
    console.log("GET /api/categories", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: "Server error", detail: err.message });
    }
}

exports.add = async (req, res) => {
    console.log("POST /api/categories", req.body);
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    console.log("PUT /api/categories", req.body);
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).send("Not found");
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    console.log("DELETE /api/categories", req.params.id);
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send("Not found");
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};