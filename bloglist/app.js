const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const bloglistRouter = require('./controllers/bloglist');
const userRouter = require('./controllers/users');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const mongoUrl =
	process.env.NODE_ENV == 'Production'
		? config.MONGODB_URI
		: config.TEST_MONGODB_URI;

mongoose
	.connect(mongoUrl)
	.then(() => {
		logger.info('Connected');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use('/api/blogs', bloglistRouter);
app.use('/api/users', userRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
