const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email zaten sisteme kayıtlı" });

    const user = new User({ name, email, password });
    await user.save();

    return res
      .status(200)
      .json({ message: "Kayıt başarılı", userId: user._id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Kayıt sırasında bir hata oluştu", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "mail sisteme kayıtlı değil " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifreniz Yanlış" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "giriş başarılı",
      userId: user._id,
      token,
    });
  } catch (err) {
    res.json({
      message: "Giriş sırasında bir hata oluştu",
      error: err.message,
    });
  }
});

module.exports = router;
