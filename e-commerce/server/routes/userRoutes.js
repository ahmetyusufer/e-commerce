const express = require("express");
const User = require("../models/User");
const router = express.Router();

const authenticateToken = require("../middleware/authenticateToken");
router.use(authenticateToken);

//fetch user
router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Sunucu Hatası", error: err.message });
  }
});

//favorites
router.post("/favorites", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId gerekli" });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }

    const isFavorite = user.favorites
      .map((id) => id.toString())
      .includes(productId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== productId
      );
      await user.save();
      return res
        .status(200)
        .json({ message: "Favorilere ürün başarıyla kaldırıldı" });
    } else {
      user.favorites.push(productId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Favorilere ürün başarıyla eklendi" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Favoriler alınırken bir hata oluştu" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("favorites");

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı Bulunamadı " });
    }

    res.json(user.favorites);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Favoriler alınırken bir hata oluştu" });
  }
});

router.delete("/favorites", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "ProductId Gerekli" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı " });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== productId);
    await user.save();

    return res.status(200).json({ message: "ürün favoriden çıkarıldı" });
  } catch {
    return res
      .status(500)
      .json({ message: "favori çıkarılırken bir hata oluştu" });
  }
});

router.delete("/favorites/all", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    user.favorites = [];
    await user.save();
    return res.status(200).json({ message: "Favori Başarıyla Temizlendi" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Sepet Listesi Silinirken Bir Hata Oluştu " });
  }
});

//basket
router.post("/basket", async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı " });
    }

    const existingItem = user.basket.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.basket.push({ product: productId, quantity: 1 });
    }
    await user.save();

    return res.status(200).json({ message: "Sepete ürün başarıyla eklendi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Sepete ürünler eklenirken bir hata oluştu" });
  }
});

router.get("/basket", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "basket.product"
    );

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı " });
    }

    res.json(user.basket);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Sepetteki ürünler alınırken bir hata oluştu" });
  }
});

router.delete("/basket", async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı " });
    }
    user.basket = user.basket.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();
    res.status(200).json({ message: "ürün sepetten başarıyla çıkarıldı" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "ürün sepetten çıkarılırken bir hata oluştu" });
  }
});

router.patch("/basket", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    const item = user.basket.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.quantity = Math.max(1, item.quantity - 1);
    }
    await user.save();
    res.status(200).json({ message: "Ürün adeti başarıyla eksiltildi" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Ürün Adedi Eksiltirilirken Bir Hata Oluştu " });
  }
});

router.delete("/basket/all", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    user.basket = [];
    await user.save();
    return res.status(200).json({ message: "Sepet Başarıyla Temizlendi" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Sepet Listesi Silinirken Bir Hata Oluştu " });
  }
});

//address
router.get("/address", async (req, res) => {
  const user = await User.findById(req.user.userId);
  return res.json(user.addresses);
});

router.get("/address/:addressId", async (req, res) => {
  try {
    const addressId = req.params.addressId;

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    const address = user.addresses.find(
      (addr) => addr._id.toString() === addressId
    );
    if (!address) {
      return res.status(404).json({ message: "Adres Bulunamadı" });
    }

    return res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: "Server Hatası" });
  }
});

router.post("/address", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }
    user.addresses.push(req.body);
    await user.save();
    res
      .status(201)
      .json({ message: "Adres başarıyla eklendi.", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({
      message: "Adres eklenirken bir hata oluştu.",
      error: err.message,
    });
  }
});

router.patch("/address/:addressId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ message: "Adres Bulunamadı" });
    }

    // 2. Gönderilen alanları güncelle
    Object.assign(address, req.body);

    await user.save();
    return res.status(200).json({
      message: "Adres başarıyla güncellendi.",
      addresses: user.addresses,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Adres güncellenirken hata oluştu." });
  }
});

//card
router.get("/card", async (req, res) => {
  const user = await User.findById(req.user.userId);
  return res.json(user.card);
});

router.get("/card/:cardId", async (req, res) => {
  try {
    const cardId = req.params.cardId;

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: "Kart Bulunamadı" });
    }

    const card = user.card.find((crd) => crd._id.toString() === cardId);
    if (!card) {
      return res.status(404).json({ message: "Kart Bulunamadı" });
    }

    return res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/card/:cardId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    const card = user.card.id(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: "Cart Bulunamadı" });
    }

    // 2. Gönderilen alanları güncelle
    Object.assign(card, req.body);

    await user.save();
    return res.status(200).json({
      message: "Cart başarıyla güncellendi.",
      card: user.card,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
