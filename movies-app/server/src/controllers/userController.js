const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).send('User not authenticated');
    }

    try {
        const userEmail = req.oidc.user.email;
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.verifyUser = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });

    if (user) {
        res.json(user);
    } else {
        const newUser = await prisma.user.create({
            data: {
                email,
                auth0Id,
                name,
            },
        });

        res.json(newUser);
    }
};