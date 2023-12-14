const express = require('express');
const morgan = require('morgan');
const app = express();

// Middlewares //
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Routes //
const helloRoutes = require('./routes/hello.routes');
const taskRoutes = require('./routes/task.routes')
const userRoutes = require('./routes/user.routes');

// base routes //
app.use('/api', helloRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

module.exports = app;
