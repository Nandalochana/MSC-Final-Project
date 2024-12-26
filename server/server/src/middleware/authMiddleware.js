const jwt = require('jsonwebtoken');
const LoginInfo = require('../models/loginInfo');

const authenticateJWT = (req, res, next) => {
    // Bypass authentication for login and create login info routes
    if (req.path === '/login' || (req.path === '/loginInfos' && req.method === 'POST')) {
        return next();
    }

    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = await LoginInfo.findById(user.id).populate('userRoleId');
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;