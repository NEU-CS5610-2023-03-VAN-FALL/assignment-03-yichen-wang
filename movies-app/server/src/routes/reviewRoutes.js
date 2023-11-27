const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:movieId', reviewController.getReviewsByMovie);
router.post('/:movieId', reviewController.createReview);

module.exports = router;
