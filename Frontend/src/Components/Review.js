import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch("https://health-backend-admin.vercel.app/api/review/getreview", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error loading reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client Reviews
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <CircularProgress />
      ) : reviews.length === 0 ? (
        <Typography>No reviews found.</Typography>
      ) : (
        reviews.map((review) => (
          <Paper
            key={review._id}
            elevation={3}
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="textSecondary">
                Subject:
              </Typography>
              <Typography variant="h6">
                {review.subject || "Untitled Review"}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                Message:
              </Typography>
              <Typography>{review.msg}</Typography>

              <Typography variant="subtitle2" color="textSecondary">
                From:
              </Typography>
              <Typography>
                {review.name || "Anonymous"}{" "}
                {review.email && `(${review.email})`}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                Date:
              </Typography>
              <Typography>
                {new Date(review.date).toLocaleString()}
              </Typography>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Review;
