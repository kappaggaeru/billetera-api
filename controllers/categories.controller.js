const Category = require("../models/category.model");
const {
    validateObjectId,
    handleBadRequest,
    handleNotFound,
    handleServerError
} = require("../utils/controllerHelpers");

exports.list = async (req, res) => {
    console.log("GET /api/categories");
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        return handleServerError(err);
    }
};

exports.find = async (req, res) => {
    const { id } = req.params;
    console.log("GET /api/categories", id);
    if (!validateObjectId(id, res)) return;
    try {
        const category = await Category.findById(id);
        if (!category) return handleNotFound(res, "Category not found");
        res.json(category);
    } catch (err) {
        return handleServerError(res, err);
    }
}

exports.add = async (req, res) => {
    console.log("POST /api/categories", req.body);
    try {
        const { type, name } = req.body;
        const category = new Category({ type, name });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        return handleBadRequest(res, err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    console.log("PUT /api/categories", req.body);
    if (!validateObjectId(id, res)) return;
    try {
        const { type, name } = req.body;
        const updated = await Category.findByIdAndUpdate(
            id,
            { type, name },
            { new: true }
        );
        if (!updated) return handleNotFound(res, "Category not found");
        res.json(updated);
    } catch (err) {
        return handleBadRequest(res, err);
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    console.log("DELETE /api/categories", id);
    if (!validateObjectId(id, res)) return;
    try {
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) return handleNotFound(res, "Category not found");
        res.sendStatus(204);
    } catch (err) {
        return handleServerError(res, err);
    }
};