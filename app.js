const express = require('express');
const morgan = require('morgan');
const app = express();

// Load Routes //
const helloRoutes = require('./routes/hello.routes');
const taskRoutes = require('./routes/task.routes')

// Middlewares //
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base routes //
app.use('/api', helloRoutes);
app.use('/api', taskRoutes);

module.exports = app;
