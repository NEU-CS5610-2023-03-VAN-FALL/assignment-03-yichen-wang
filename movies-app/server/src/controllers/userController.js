const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {
    // if (!req.oidc.isAuthenticated()) {
    //     return res.status(401).send('User not authenticated');
    // }

    try {
        const userEmail = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
        console.log('userEmail', userEmail);
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
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.verifyUser = async (req, res) => {

    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    console.log('auth0Id', auth0Id);
    console.log('email', email);
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

exports.updateUser = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const {name} = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                auth0Id,
            },
            data: {
                name,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};