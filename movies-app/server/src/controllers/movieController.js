const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getPopularMovies = async (req, res) => {
    const apiKey = process.env.TMDB_API_KEY;
    const page = req.query.page || 1; // Default to page 1 if no page specified
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error: ${data.status_message}`);
        }

        res.json(data); // Sending back just the results array
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMovieDetails = async (req, res) => {
    const apiKey = process.env.TMDB_API_KEY;
    const movieId = parseInt(req.params.id);
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const movieDetails = await response.json();

        if (!response.ok) {
            throw new Error(`Error: ${movieDetails.status_message}`);
        }

        // Save movie to database
        const savedMovie = await prisma.movie.upsert({
            where: { externalId: movieId },
            update: {
                title: movieDetails.title,
                overview: movieDetails.overview,

            },
            create: {
                externalId: movieId,
                title: movieDetails.title,
                overview: movieDetails.overview,
            },
        });

        res.json(movieDetails);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

exports.searchMovies = async (req, res) => {
    const apiKey = process.env.TMDB_API_KEY;
    const page = req.query.page || 1; // Default to page 1 if no page specified
    const query = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error: ${data.status_message}`);
        }

        res.json(data); // Sending back just the results array
    } catch (error) {
        res.status(500).send(error.message);
    }
}