const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSign } = require('../utils/jwtPromises');
const { SALT_ROUNDS, SECRET } = require('../config/env');

exports.createSession = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    const options = { expiresIn: '2d' }

    const accessToken = await jwtSign(payload, SECRET, options);

    return {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken
    }
}

exports.register = async ({ firstName, lastName, password, email, address, phoneNumber }) => {
    const user = await User.findOne({ email });

    if (user) {
        throw 'Този имейл адрес вече съществува!';
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        address,
        phoneNumber
    });

    return this.createSession(createdUser);
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw 'Невалиден имейл адрес или парола!';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw 'Невалиден имейл адрес или парола!';
    }

    return this.createSession(user);
}