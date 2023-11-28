const express = require('express');
const router = express.Router();
const { auth } = require('express-oauth2-jwt-bearer');
const reviewController = require('../controllers/reviewController');
// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});
router.get('/:movieId', reviewController.getReviewsByMovie);
router.post('/:movieId', requireAuth, reviewController.createReview);

module.exports = router;
