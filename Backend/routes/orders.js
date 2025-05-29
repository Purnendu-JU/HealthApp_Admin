const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
var fetchuser = require('../middleware/fetchuser');
router.get("/", fetchuser, async (req, res) => {
  try {
    const orders = await Order.find({ dispatchStatus: "Pending" }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching pending orders:", err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id/dispatch", fetchuser, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { dispatchStatus: "Dispatched" },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Dispatch update failed:", err);
    res.status(500).send("Dispatch update failed");
  }
});

module.exports = router;
