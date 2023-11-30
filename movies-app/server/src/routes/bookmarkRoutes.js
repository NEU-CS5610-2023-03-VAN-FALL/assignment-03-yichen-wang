const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const {auth} = require('express-oauth2-jwt-bearer');
const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});
router.get('/', requireAuth, bookmarkController.getBookmarksByUser);
router.post('/:movieId', requireAuth, bookmarkController.createBookmark);
router.get('/status/:movieId', requireAuth, bookmarkController.getBookmarkStatus);
router.delete('/:movieId', requireAuth, bookmarkController.deleteBookmark);
module.exports = router;
