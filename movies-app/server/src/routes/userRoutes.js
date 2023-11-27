const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// This route can be accessed by any authenticated user
router.get('/profile', userController.getUserProfile);

module.exports = router;
