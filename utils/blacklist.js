const jwt = require('jsonwebtoken');

// A Set to store blacklisted tokens
const blacklist = new Set();

/**
 * Add a token to the blacklist.
 * @param {string} token - The JWT token to be blacklisted.
 */
function addToBlacklist(token) {
    blacklist.add(token);
}

/**
 * Check if a token is blacklisted.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is blacklisted, otherwise false.
 */
function isBlacklisted(token) {
    return blacklist.has(token);
}

/**
 * Periodically clear expired tokens from the blacklist.
 * Runs every hour by default.
 */
function startTokenCleanup() {
    setInterval(() => {
        const now = Date.now();
        blacklist.forEach((token) => {
            try {
                const decoded = jwt.decode(token);
                if (decoded && decoded.exp * 1000 < now) {
                    blacklist.delete(token); // Remove expired token
                }
            } catch (error) {
                blacklist.delete(token); // Remove malformed token
            }
        });
    }, 3600000); // Run every hour (1 hour = 3600000 ms)
}

// Start the cleanup process
startTokenCleanup();

// Export blacklist management functions and the blacklist itself
module.exports = {
    blacklist,
    addToBlacklist,
    isBlacklisted,
};
