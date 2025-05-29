import React, { useState } from 'react';
import {
  Container, TextField, Typography, Button, Box, Grid, Paper,
} from '@mui/material';

const PutItem = () => {
  const [itemData, setItemData] = useState({
    id: '',
    name: '',
    originalPrice: '',
    discountedPrice: '',
    description: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }

    setUploading(true);

    try {
      // 1. Upload image to backend ImgBB upload route
      const imageForm = new FormData();
      imageForm.append('image', imageFile);

      const uploadResponse = await fetch('https://health-backend-admin.vercel.app/api/upload/upload-image', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'), // remove if backend doesn't require auth here
        },
        body: imageForm,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Image upload failed');
      }

      const imageUrl = uploadData.imageUrl;

      // 2. Send full product data with image URL to product add API
      const productResponse = await fetch('https://health-backend-admin.vercel.app/api/upload/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token'),
  },
  body: JSON.stringify({ ...itemData, imageUrl: imageUrl }),  // <-- change here
});


      const productData = await productResponse.json();

      if (productResponse.ok) {
        alert('Product added successfully!');
        setItemData({
          id: '',
          name: '',
          originalPrice: '',
          discountedPrice: '',
          description: '',
          stock: '',
        });
        setImageFile(null);
      } else {
        alert(productData.error || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New First Aid Item
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product ID"
                name="id"
                value={itemData.id}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Original Price"
                name="originalPrice"
                value={itemData.originalPrice}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Discounted Price"
                name="discountedPrice"
                value={itemData.discountedPrice}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stock"
                name="stock"
                value={itemData.stock}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={itemData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth disabled={uploading}>
                Upload Product Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {imageFile && (
                <Typography variant="body2" mt={1}>
                  Selected: {imageFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PutItem;
