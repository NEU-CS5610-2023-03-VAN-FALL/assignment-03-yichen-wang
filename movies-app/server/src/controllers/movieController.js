const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');


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

        res.json(data.results); // Sending back just the results array
    } catch (error) {
        res.status(500).send(error.message);
    }
};
