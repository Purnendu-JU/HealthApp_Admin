import React from "react";
import { Box, Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import {
  Lightbulb,
  AddBox,
  ShoppingCartCheckout,
  Psychology,
  LocalHospital,
  MedicalServices,
  ContactMail,
} from "@mui/icons-material";
import { RateReview } from '@mui/icons-material';
import { Link } from "react-router-dom";

const features = [
  {
    title: "Put Items",
    icon: <AddBox fontSize="large" color="primary" />,
    description: "Update your inventory by adding new products",
    link: "/put-item"
  },
  {
    title: "View Orders",
    icon: <ShoppingCartCheckout fontSize="large" color="primary" />,
    description: "View orders made by clients and dispatch them",
    link: "/view"
  },
  {
    title: "Check reviews",
    icon: <RateReview fontSize="large" color="primary" />,
    description: "Go through all the reviews given by the clients",
    link: "/reviews"
  }
];


const Home = () => {
  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg,rgb(11, 105, 6),rgb(59, 149, 71),rgb(27, 173, 8))",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 4s linear infinite",
          mt: 7,
          mb: 5,
          "@keyframes shine": {
            "0%": { backgroundPosition: "0% center" },
            "100%": { backgroundPosition: "200% center" },
          },
        }}
      >
        AI Based Medical Health Website
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={feature.link} style={{ textDecoration: "none" }}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  textAlign: "center",
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  width: "250px", // Fixed width
                  height: "250px", // Fixed height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 1, color: "#1976d2" }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;