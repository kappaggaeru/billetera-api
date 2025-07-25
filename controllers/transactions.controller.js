const { transactions } = require("../models/transaction.model");

let idCounter = 1;

exports.list = (req, res) => {
    res.json(transactions);
};

exports.add = (req, res) => {
    const { type, amount, category } = req.body;
    const newTransaction = { id: idCounter++, type, amount, category };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { type, amount, category } = req.body;
    const index = transactions.findIndex((t) => t.id == id);
    if (index === -1) return res.status(404).send("Not found");
    transactions[index] = { id: parseInt(id), type, amount, category };
    res.json(transactions[index]);
};

exports.remove = (req, res) => {
    const { id } = req.params;
    const index = transactions.findIndex((t) => t.id == id);
    if (index === -1) return res.status(404).send("Not found");
    transactions.splice(index, 1);
    res.sendStatus(204);
};