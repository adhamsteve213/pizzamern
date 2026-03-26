import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { apiUrl } from '../config/api';

const MyOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        // Try backend fetch first
        const res = await fetch(apiUrl(`/orders/${user.id}`), {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
          return;
        }
      } catch (e) {
        // ignore
      }
      // Fallback to local orders
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      setOrders(local);
    };
    fetchOrders();
  }, [isAuthenticated, user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.length === 0 && <Typography>No orders found.</Typography>}
      {orders.map((order) => (
        <Card key={order._id || order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1">Order: {order._id || order.id}</Typography>
            <Typography variant="body2">Total: ${order.totalPrice || (order.items || []).reduce((s,i)=>s+(i.price||0)*(i.quantity||1),0)}</Typography>
            <Typography variant="body2">Placed: {order.createdAt || 'n/a'}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyOrders;
