const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionsRoutes = require("./routes/transactions.routes");
const categoriesRoutes = require("./routes/categories.routes");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger.config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const uri = "mongodb+srv://kappaggaeru:aezCZpVnUrHKqJHd@billetera.1xerbtp.mongodb.net/?retryWrites=true&w=majority&appName=Billetera";

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
    console.log("📚 Swagger docs at http://localhost:3000/api/docs");
});

mongoose.connect(uri, {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));