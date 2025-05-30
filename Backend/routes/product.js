require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const router = express.Router();
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-image', fetchuser, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  let cld_upload_stream = cloudinary.uploader.upload_stream(
    { folder: 'first-aid-store' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary Upload Error:', error);
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }
      res.json({ imageUrl: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
});

router.post('/add', fetchuser, async (req, res) => {
  const { id, name, originalPrice, discountedPrice, description, stock, imageUrl } = req.body;
  if (!id || !name || !originalPrice || !discountedPrice || !description || !stock || !imageUrl) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
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
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
