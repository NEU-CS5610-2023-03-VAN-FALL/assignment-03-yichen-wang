const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/:userId', bookmarkController.getBookmarksByUser);
router.post('/:userId', bookmarkController.createBookmark);

module.exports = router;
