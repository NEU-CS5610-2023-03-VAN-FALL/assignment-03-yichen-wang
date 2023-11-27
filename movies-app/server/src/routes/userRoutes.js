const express = require('express');
const router = express.Router();
const { auth } = require('express-oauth2-jwt-bearer');

const userController = require('../controllers/userController');
// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});
// This route can be accessed by any authenticated user
router.get('/profile', userController.getUserProfile);
router.post("/verify-user", requireAuth, userController.verifyUser);

module.exports = router;
