import express from 'express';
import Checkout from '../models/checkoutSchema.js';
import isAdmin from '../middleware/adminauth.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all checkout sessions
router.get('/',isAdmin, async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get checkout session for a user
router.get('/:userId',isAdmin, async (req, res) => {
  try {
    const checkout = await Checkout.findOne({ userId: req.params.userId });
    if (!checkout) return res.status(404).json({ message: 'Checkout session not found' });
    res.json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new checkout session
router.post('/',authMiddleware, async (req, res) => {
  const checkout = new Checkout(req.body);
  try {
    const newCheckout = await checkout.save();
    res.status(201).json(newCheckout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a checkout session
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedCheckout = await Checkout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCheckout) return res.status(404).json({ message: 'Checkout session not found' });
    res.json(updatedCheckout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a checkout session
router.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const deletedCheckout = await Checkout.findByIdAndDelete(req.params.id);
    if (!deletedCheckout) return res.status(404).json({ message: 'Checkout session not found' });
    res.json({ message: 'Checkout session deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
