const express = require('express');
const router = express.Router();
const { authenticate, allowPublicAccess, logout } = require('../middleware/auth.js');
const commonController = require('../controller/commonController.js');

// Logout route
router.post('/logout', authenticate, logout);

// Public access routes
router.get('/:indexName/:id', allowPublicAccess, commonController.findOne);
router.get('/:indexName', allowPublicAccess, commonController.find);

// Protected routes
router.post('/:indexName', authenticate, commonController.insert);


module.exports = router;
