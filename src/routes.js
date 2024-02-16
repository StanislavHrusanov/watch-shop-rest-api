const routes = require('express').Router();
const authController = require('./controllers/authController');
const watchController = require('./controllers/watchController');
const myProfileController = require('./controllers/myProfileController');

routes.use('/auth', authController);
routes.use('/watches', watchController);
routes.use('/myProfile', myProfileController);

module.exports = routes;
