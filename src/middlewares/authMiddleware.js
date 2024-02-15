const { jwtVerify } = require('../utils/jwtPromises');
const { SECRET } = require('../config/env');

exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {

        if (token) {
            const verifiedToken = await jwtVerify(token, SECRET);

            req.user = verifiedToken;
        }


    } catch (error) {
        res.status(498).json({ message: 'Невалиден токен!' });
    }
    next();

}

exports.isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'Моля влезте в профила си!' });
    } else {
        next();
    }
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        res.status(400).json({ message: 'Вече сте влезли в профила си!' });
    } else {
        next();
    }
}