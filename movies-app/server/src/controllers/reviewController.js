const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getReviewsByMovie = async (req, res) => {
    const movieId = parseInt(req.params.movieId);

    try {
        const reviews = await prisma.review.findMany({
            where: {
                movieId: movieId
            },
            include: {
                user: {
                    select: {name: true, email: true} // Include only necessary fields from the user
                }
            }
        });

        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.createReview = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const movieId = parseInt(req.params.movieId);
    const {content, rating} = req.body;
    if (!content || !rating) {
        res.status(400).send("Content and rating are required!");
    } else {
        try {
            const newReview = await prisma.review.create({
                data: {
                    content: content,
                    rating: parseInt(rating),
                    user: { connect: { auth0Id } },
                    movie: { connect: { externalId: movieId } } // Connect to the movie
                }
            });

            res.status(201).json(newReview);
            console.log(newReview);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
};
