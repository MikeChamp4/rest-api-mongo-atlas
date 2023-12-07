const express = require('express');
const taskCtrl = require('../controllers/task.controller.js');

const api = express.Router();

api.post('/task', taskCtrl.createTask);
api.get('/task', taskCtrl.getTask);
api.get('/task/:id', taskCtrl.getTaskById);
api.put('/task/:id', taskCtrl.updateTask);
api.delete('/task/:id', taskCtrl.deleteTask);

module.exports = api;