const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const correctPassword =
		user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);

	if (!(user && correctPassword)) {
		return response
			.status(401)
			.json({ error: 'Incorrect Password or Username' });
	}

	const usedForToken = {
		username: user.name,
		id: user._id
	};

	const token = await jwt.sign(usedForToken, process.env.SECRET);
	return response.send({
		token,
		username: user.username,
		name: user.name
	});
});

module.exports = loginRouter;
