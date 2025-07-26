const express = require("express");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions.routes");
const categoriesRoutes = require("./routes/categories.routes");
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:pass@billetera.1xerbtp.mongodb.net/?retryWrites=true&w=majority&appName=Billetera";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});

mongoose.connect(uri, {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));