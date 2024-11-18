const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key_here"; // Use a strong secret key
const { addToBlacklist, isBlacklisted } = require('../utils/blacklist');


exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }


    if (isBlacklisted(token)) {
        return res.status(401).json({ message: "Token has been invalidated. Please log in again." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded user info to the request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};

exports.allowPublicAccess = (req, res, next) => {
    console.log("inside allowpublic");

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
        } catch (error) {
            // Invalid token, but allow access
        }
    }
    next();
};

exports.logout = (req, res) => {
    console.log("Inside logout")
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {     
        addToBlacklist(token); // Add token to the blacklist
        res.json({ message: "Logged out successfully." });
    } else {
        res.status(400).json({ message: "No token provided." });
    }
};