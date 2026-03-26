import express from 'express';
import Cart from '../models/cartSchema.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/adminauth.js';

const router = express.Router();

// Get all cart items
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart items for a user
router.get('/:userId',isAdmin, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
  const cartItem = new Cart(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json(updatedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete cart item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
