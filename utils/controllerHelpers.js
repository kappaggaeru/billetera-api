const mongoose = require("mongoose");

exports.validateObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return false;
    }
    return true;
};

exports.handleBadRequest = (res, err) => {
    res.status(400).json({ error: "Bad request", detail: err.message });
}

exports.handleNotFound = (res, message = "Not found") => {
    res.status(404).json({ error: message });
}

exports.handleServerError = (res, err) => {
    res.status(500).json({ error: "Server error", detail: err.message });
};

