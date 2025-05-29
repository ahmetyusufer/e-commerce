const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Ürünler alınamadı", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Ürün alınamadı", error: err.message });
  }
});

router.post("/:productId/review", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { userName, point, comment } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "ürün bulunamadı" });
    }

    product.reviews.push({ userName, point, comment });
    await product.save();
    res
      .status(201)
      .json({ message: "Yorum eklendi", reviews: product.reviews });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "yorum eklenirken bir hata oluştu" });
  }
});

module.exports = router;
