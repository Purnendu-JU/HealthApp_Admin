require('dotenv').config();
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const base64Image = req.file.buffer.toString('base64');

    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('image', base64Image);
    formData.append('expiration', '600');

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = await response.json();

    if (data.success) {
      res.json({ imageUrl: data.data.url });
    } else {
      res.status(500).json({ error: 'Upload failed', details: data });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/add', async (req, res) => {
  try {
    const { id, name, originalPrice, discountedPrice, description, stock, imageUrl } = req.body;
    if (!id || !name || !originalPrice || !discountedPrice || !description || !stock || !imageUrl) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newProduct = new Product({
      id,
      name,
      originalPrice,
      discountedPrice,
      description,
      stock,
      imageUrl,  
    });


    await newProduct.save();

    res.json({ message: 'Product added successfully' });
  } 
  catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
