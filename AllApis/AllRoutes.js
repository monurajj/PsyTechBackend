const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../Schemas/schemas');
const { authenticate } = require('./MiddleWare');

const router = express.Router();
const secretKey = "yourSecretKey";

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error });
    }
});

// Add bookmark for saving 
router.post('/bookmarks', authenticate, async (req, res) => {
    const { stocks, link } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.bookmarks.push({ stocks, link });
        await user.save();

        res.status(201).json({ message: "Bookmark added successfully", bookmarks: user.bookmarks });
    } catch (error) {
        res.status(400).json({ message: "Error adding bookmark", error });
    }
});

// Get all bookmarks
router.get('/bookmarks', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ bookmarks: user.bookmarks });
    } catch (error) {
        res.status(400).json({ message: "Error fetching bookmarks", error });
    }
});

module.exports = router;
