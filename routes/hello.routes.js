const express = require('express');
const helloCtrl = require('../controllers/hello.controller');

const api = express.Router();

api.get('/hello', helloCtrl.getHello)

module.exports = api;