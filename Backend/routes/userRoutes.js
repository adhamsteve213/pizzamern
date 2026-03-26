import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET , { expiresIn: "1h" });
        await newUser.save();
        console.log('User registered successfully:', { id: newUser._id, name: newUser.name, email: newUser.email });
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            id: newUser._id, 
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token ,id: user._id, name: user.name,email:user.email,password:user.password });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post ('/logout', (req, res) => {
    // Invalidate the token on the client side by simply deleting it
    res.status(200).json({ message: 'User logged out successfully' });
});
    
export default router;