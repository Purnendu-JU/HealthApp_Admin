const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Review = require('../models/Review');
router.get('/getreview', fetchuser, async(req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } 
    catch (err) {
        console.error("Error fetching pending reviews:", err);
        res.status(500).send("Server Error");
    }
});
module.exports = router;