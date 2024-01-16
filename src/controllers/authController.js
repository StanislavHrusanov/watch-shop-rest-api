const router = require('express').Router();
const authService = require('../services/authService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const userSession = await authService.register(userData);
        res.status(201).json(userSession);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    const userData = req.body;
    userData.username = userData.username.trim();
    userData.password = userData.password.trim();

    try {
        if (userData.username == '' || userData.password == '') {
            throw ('Невалидно потребителско име или парола!');
        }

        const userSession = await authService.login(userData);
        res.json(userSession);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', async (req, res) => {
    if (req.user) {
        req.user = null;
    }
    res.status(204).end();
});

module.exports = router;