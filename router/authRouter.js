const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = require('../schema/schema.js');

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key_here";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"; // Default to "1h" if not defined in .env


// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const Model = mongoose.models["signupModel"] || mongoose.model("signupModel", Schema.signup, "signups");

        const user = new Model({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User signed up successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const Model = mongoose.models["signupModel"] || mongoose.model("signupModel", Schema.signup, "signups");

        const user = await Model.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: JWT_EXPIRATION });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
