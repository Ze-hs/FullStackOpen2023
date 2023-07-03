require('express-async-errors');
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
	const { username, password, name } = request.body;

	if (password.length < 3) {
		response.status(400).json({
			error: '"user validation failed: password is shorter than the minimum allowed length (3)."'
		});
	}
	const saltRound = 10;
	const passwordHash = await bcrypt.hash(password, saltRound);

	const user = new User({
		name,
		passwordHash,
		username
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

userRouter.get('/', async (request, response) => {
	const data = await User.find({});
	response.json(data);
});
module.exports = userRouter;
