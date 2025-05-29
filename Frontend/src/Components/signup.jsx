// components/Signup.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', AccID: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://health-backend-admin.vercel.app/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('user', credentials.name);
      alert("Admin account created successfully!");
      navigate('/');
    } else {
      alert(json.error || "Failed to create admin account.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Admin Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full Name"
            value={credentials.name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={credentials.email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={credentials.password}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="AccID"
            label="Accession ID (12 characters)"
            value={credentials.AccID}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 2 }}
          >
            Create Admin
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
