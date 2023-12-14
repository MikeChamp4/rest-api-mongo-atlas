const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
require('dotenv').config();

const {SECRET_KEY} = process.env;

function createToken(user, expiresIn) {
    const { id, email } = user;
    const payload = { id, email };

    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken,
}