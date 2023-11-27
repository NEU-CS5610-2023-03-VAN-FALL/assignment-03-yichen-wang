const { PrismaClient } = require('@prisma/client');
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
