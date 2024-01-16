const router = require('express').Router();
const authService = require('../services/authService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        res.status(201).json(token);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

module.exports = router;