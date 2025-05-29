import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://health-backend-admin.vercel.app/api/view/", {
        method: "GET",
        headers: {
            "auth-token": localStorage.getItem('token')
        }
      }
      );
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const markAsDispatched = async (orderId) => {
    try {
      const res = await fetch(`https://health-backend-admin.vercel.app/api/view/${orderId}/dispatch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      if (res.ok) {
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } else {
        console.error("Failed to update dispatch status");
      }
    } catch (err) {
      console.error("Dispatch update error", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Pending Orders</Typography>
      <Divider sx={{ mb: 3 }} />
      {orders.length === 0 ? (
        <Typography>No pending orders!</Typography>
      ) : (
        orders.map(order => (
          <Paper key={order._id} sx={{ mb: 2, p: 2 }}>
            <Typography><b>Product:</b> {order.productName}</Typography>
            <Typography><b>Amount:</b> ₹{order.amount}</Typography>
            <Typography><b>Customer:</b> {order.customerName}</Typography>
            <Typography><b>Email:</b> {order.customerEmail}</Typography>
            <Typography><b>Phone:</b> {order.customerPhone}</Typography>
            <Typography><b>Address:</b> {order.customerAddress}</Typography>
            <Typography><b>Order ID:</b> {order.razorpayOrderId}</Typography>
            <Typography><b>Status:</b> {order.dispatchStatus}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => markAsDispatched(order._id)}
              sx={{ mt: 2 }}
            >
              Mark as Dispatched
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default AdminOrders;
