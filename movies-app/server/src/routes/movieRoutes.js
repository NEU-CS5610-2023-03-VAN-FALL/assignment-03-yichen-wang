const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/popular', movieController.getPopularMovies);
router.get('/details/:id', movieController.getMovieDetails);
router.get("/search", movieController.searchMovies);

module.exports = router;
