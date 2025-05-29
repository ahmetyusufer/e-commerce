const mongoose = require("mongoose");

//snapshot
const orderUserDataSchema = mongoose.Schema({
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  district: { type: String },
  street: { type: String },
  postalCode: { type: String },
  cardName: { type: String },
  cardNumber: { type: String },
  ccv: { type: String },
  cardLastDate: { type: String },
});

const orderItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  userSnapshot: orderUserDataSchema,
  totalAmount: { type: Number },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
