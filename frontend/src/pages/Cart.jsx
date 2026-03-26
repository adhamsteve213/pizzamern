import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const { items, increase, decrease, remove, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {items.length === 0 && <Typography>Your cart is empty.</Typography>}
      {items.map(item => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <img src={item.img} alt={item.title} style={{ width: 100, height: 80, objectFit: 'cover' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>${item.price.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => decrease(item.id)}><RemoveIcon /></IconButton>
            <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
            <IconButton onClick={() => increase(item.id)}><AddIcon /></IconButton>
          </Box>
          <Button color="error" onClick={() => remove(item.id)}>Remove</Button>
        </Box>
      ))}
      {items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" sx={{ mt: 2, backgroundColor: 'red' }} onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
