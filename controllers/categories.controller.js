const { categories } = require("../models/category.model");

let idCounter = 1;

exports.list = (req, res) => {
    res.json(categories);
};

exports.add = (req, res) => {
    const { type, name } = req.body;
    const newCategory = { id: idCounter++, type, name };
    categories.push(newCategory);
    res.status(201).json(newCategory);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { type, name } = req.body;
    const index = categories.findIndex((c) => c.id == id);
    if (index === -1) return res.status(404).send("Not found");
    categories[index] = { id: parseInt(id), type, name };
    res.json(categories[index]);
};

exports.remove = (req, res) => {
    const { id } = req.params;
    const index = categories.findIndex((c) => c.id == id);
    if (index === -1) return res.status(404).send("Not found");
    categories.splice(index, 1);
    res.sendStatus(204);
};