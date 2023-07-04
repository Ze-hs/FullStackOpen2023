require('express-async-errors');
const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

bloglistRouter.get('/', async (req, res) => {
	const data = await Blog.find({}).populate('user', { name: 1, username: 1 });
	res.json(data);
});

bloglistRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = await User.findById(body.user);

	const newBlog = new Blog({
		...body,
		user: user._id
	});

	const response = await newBlog.save();

	user.blogs = user.blogs.concat(response._id);
	await user.save();
	res.status(201).json(response);
});

bloglistRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

bloglistRouter.put('/:id', async (req, res) => {
	const response = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	res.json(response);
});

module.exports = bloglistRouter;
