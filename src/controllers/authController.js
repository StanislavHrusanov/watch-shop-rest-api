const router = require('express').Router();
const authService = require('../services/authService');
const validation = require('../utils/validation');
const { mapErrors } = require('../utils/errorMapper');
const { isGuest, isLoggedIn } = require('../middlewares/authMiddleware');
const { trimUserData } = require('../utils/trimUserData');

router.post('/register', isGuest, async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        repass: req.body.repass,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };

    try {
        trimUserData(userData);
        validation.validateUser(userData);

        const userSession = await authService.register(userData);
        res.status(201).json(userSession);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest, async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        trimUserData(userData);

        if (userData.email == '' || userData.password == '') {
            throw ('Невалиден имейл или парола!');
        }

        const userSession = await authService.login(userData);
        res.json(userSession);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', isLoggedIn, async (req, res) => {
    if (req.user) {
        req.user = null;
    }
    res.status(204).end();
});

module.exports = router;