import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, totalPrice, checkout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ Firstname: '', Lastname: '', Middlename: '', phone: '', address: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Cart is empty');
      return;
    }
    try {
      const res = await checkout(form);
      if (res.success) {
        setSuccess('Order placed successfully');
        navigate('/myorders');
      } else {
        setSuccess('Order saved locally (backend error): ' + (res.error || 'unknown'));
        navigate('/myorders');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="First name" name="Firstname" value={form.Firstname} onChange={handleChange} sx={{ my: 1 }} required />
        <TextField fullWidth label="Last name" name="Lastname" value={form.Lastname} onChange={handleChange} sx={{ my: 1 }} required />
        <TextField fullWidth label="Middle name" name="Middlename" value={form.Middlename} onChange={handleChange} sx={{ my: 1 }} />
        <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} sx={{ my: 1 }} required />
        <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ my: 1 }} required />
        <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} sx={{ my: 1 }} required />
        <Typography sx={{ mt: 2 }}>Total: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" type="submit" sx={{ mt: 2, backgroundColor: 'red' }}>Place Order</Button>
      </form>
    </Box>
  );
};

export default Checkout;
