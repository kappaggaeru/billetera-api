const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;