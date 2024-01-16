const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SALT_ROUNDS, SECRET } = require('../config/env');

exports.createSession = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
    }

    const options = { expiresIn: '2d' }

    const accessToken = jwtSign(payload, SECRET, options);

    return {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken
    }
}

exports.register = async ({ username, firstName, lastName, password, email, address, phoneNumber }) => {
    const user = await User.findOne({ username });

    if (user) {
        throw 'Това потребителско име вече съществува!';
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword,
        email,
        address,
        phoneNumber
    });

    return this.createSession(createdUser);
}

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw 'Невалидно потребителско име или парола!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Невалидно потребителско име или парола!';
    }

    return this.createSession(user);
}