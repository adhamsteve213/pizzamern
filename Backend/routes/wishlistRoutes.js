import express from 'express';
import Wishlist from '../models/wishlistSchema.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all wishlist items
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get wishlist items for a user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ userId: req.params.userId });
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to wishlist
router.post('/', authMiddleware, async (req, res) => {
  const wishlistItem = new Wishlist(req.body);
  try {
    const newWishlistItem = await wishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update wishlist item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedWishlistItem = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });
    res.json(updatedWishlistItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete wishlist item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });
    res.json({ message: 'Wishlist item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
