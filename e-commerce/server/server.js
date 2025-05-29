const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/users", orderRoutes);

//db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb bağlantısı başarılı");
    app.listen(process.env.PORT, () =>
      console.log(`sunucu çalışıyor: http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB bağlantı hatası:", err.message));
