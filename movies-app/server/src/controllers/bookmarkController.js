const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBookmarksByUser = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const apiKey = process.env.TMDB_API_KEY;

    try {
        const user = await prisma.user.findUnique({
            where: {
                auth0Id,
            },
        });

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: user.id
            },
            include: {
                movie: true // Include related movie data
            }
        });

        const movieDetailsPromises = bookmarks.map(bookmark =>
            fetch(`https://api.themoviedb.org/3/movie/${bookmark.movie.externalId}?api_key=${apiKey}`)
                .then(response => response.json())
        );

        const movieDetails = await Promise.all(movieDetailsPromises);

        res.json(movieDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};


exports.createBookmark = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const movieId = parseInt(req.params.movieId);
    console.log('movieId', movieId);

    try {
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                user: {auth0Id},
                movie: {externalId: movieId}
            }
        });

        if (existingBookmark) {
            res.status(409).send('Bookmark already exists');
        } else {
            const newBookmark = await prisma.bookmark.create({
                data: {
                    user: {connect: {auth0Id}},
                    movie: {connect: {externalId: movieId}}
                }
            });

            res.status(201).json(newBookmark);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.getBookmarkStatus = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const movieId = parseInt(req.params.movieId);

    try {
        const user = await prisma.user.findUnique({
            where: {
                auth0Id,
            },
        });

        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: user.id,
                movieId: movieId
            }
        });

        if (bookmark) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.deleteBookmark = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const movieId = parseInt(req.params.movieId);

    try {
        const user = await prisma.user.findUnique({
            where: {
                auth0Id,
            },
        });

        const deleteCount = await prisma.bookmark.deleteMany({
            where: {
                userId: user.id,
                movieId: movieId
            }
        });

        if (deleteCount.count > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};