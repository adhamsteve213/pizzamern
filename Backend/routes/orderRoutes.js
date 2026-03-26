import express from 'express';
import Order from '../models/orderSchema.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/adminauth.js';

const router = express.Router();

// Get all orders
router.get('/', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for a user (user can access own orders; admin can access any)
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const requester = req.user || {};
    const { userId } = req.params;
    const isSelf = requester.id === userId || requester._id === userId;
    const isAdminUser = requester.role === 'admin' || requester.isAdmin === true;

    if (!isSelf && !isAdminUser) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an order
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
