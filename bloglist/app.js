const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const bloglistRouter = require('./controllers/bloglist');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const commentRouter = require('./controllers/comment');
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

if (process.env.NODE_ENV == 'Test') {
	const resetRouter = require('./controllers/reset');
	app.use('/api/testing', resetRouter);
}

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', commentRouter);
//Only blogs router needs the token
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', bloglistRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
