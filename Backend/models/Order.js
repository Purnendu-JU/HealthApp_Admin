const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  razorpayOrderId: String,
  paymentId: String,
  signature: String,
  productName: String,
  amount: Number,
  dispatchStatus: {
    type: String,
    enum: ["Pending", "Dispatched"],
    default: "Pending"
  },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
