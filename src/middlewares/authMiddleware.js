const { jwtVerify } = require('../utils/jwtPromises');
const { SECRET } = require('../config/env');

exports.auth = async (req, res, next) => {
    const token = req.headers['X-Authorization'];

    if (token) {
        try {
            const verifiedToken = await jwtVerify(token, SECRET);

            req.user = verifiedToken;

        } catch (error) {
            res.status(498).json({ message: 'Невалиден токен!' });
        }
    }
    next();
}