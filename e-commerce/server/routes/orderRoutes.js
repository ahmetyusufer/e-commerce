const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

const authenticateToken = require("../middleware/authenticateToken");
router.use(authenticateToken);

router.get("/order/all", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate(
      "items.product"
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Siparişler getirilirken bir hata oluştu." });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sipariş getirilirken bir hata oluştu." });
  }
});

router.post("/order", async (req, res) => {
  const maxRetries = 5;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      // Her seferinde fresh user data al
      const user = await User.findById(req.user.userId).populate(
        "basket.product"
      );

      if (!user) {
        return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
      }

      // Sepet boşsa hata ver
      if (!user.basket || user.basket.length === 0) {
        return res.status(400).json({ message: "Sepetiniz boş!" });
      }

      const {
        phone,
        country,
        city,
        district,
        street,
        postalCode,
        cardName,
        cardNumber,
        ccv,
        cardLastDate,
      } = req.body;

      const userSnapshot = {
        phone,
        country,
        city,
        district,
        street,
        postalCode,
        cardName,
        cardNumber,
        ccv,
        cardLastDate,
      };

      const items = user.basket.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      let totalAmount = 0;
      user.basket.forEach((item) => {
        totalAmount += item.quantity * item.product.price;
      });

      // Önce siparişi oluştur
      const newOrder = new Order({
        user: user._id,
        userSnapshot,
        totalAmount,
        items,
      });

      await newOrder.save();

      // Kullanıcıyı güncelle - atomic update ile
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: user._id,
          __v: user.__v, // Version kontrolü ekle
        },
        {
          $set: { basket: [] },
          $push: { orders: newOrder._id },
          $inc: { __v: 1 }, // Version'ı manuel artır
        },
        {
          new: true,
          runValidators: true,
        }
      );

      // Eğer güncelleme başarısızsa (version conflict)
      if (!updatedUser) {
        // Siparişi temizle
        await Order.findByIdAndDelete(newOrder._id);
        throw new Error("Version conflict - retry needed");
      }

      return res.status(201).json({
        message: "Sipariş başarıyla oluşturuldu",
        orderId: newOrder._id,
      });
    } catch (err) {
      console.log(`Attempt ${retryCount + 1} failed:`, err.message);

      // Version conflict veya matching document hatası ise retry yap
      if (
        (err.message.includes("No matching document found") ||
          err.message.includes("Version conflict")) &&
        retryCount < maxRetries - 1
      ) {
        retryCount++;
        // Exponential backoff - bekleme süresini artır
        const delay = Math.min(100 * Math.pow(2, retryCount), 1000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Retry limiti aşıldı veya farklı bir hata
      console.error("Order creation failed after retries:", err);
      return res.status(500).json({
        message:
          "Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  }

  // Bu noktaya gelirse tüm retry'lar başarısız olmuş
  return res.status(500).json({
    message: "Sipariş oluşturulamadı. Lütfen daha sonra tekrar deneyin.",
  });
});

module.exports = router;
