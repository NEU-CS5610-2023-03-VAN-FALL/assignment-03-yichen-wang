const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: {id: parseInt(req.params.id)},
        });
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await prisma.movie.create({
            data: req.body,
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const axios = require('axios');

exports.getPopularMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;  // Default to page 1 if not specified
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
