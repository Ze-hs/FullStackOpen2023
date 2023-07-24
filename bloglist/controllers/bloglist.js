require('express-async-errors');
const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');

bloglistRouter.get('/', async (req, res) => {
	const data = await Blog.find({}).populate('user', { name: 1, username: 1 });
	res.json(data);
});

bloglistRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = req.user;
	const newBlog = new Blog({
		...body,
		user: user._id
	});

	const response = await newBlog.save();

	req.user.blogs = req.user.blogs.concat(response._id);
	await req.user.save();
	res.status(201).json(response);
});

bloglistRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	const user = req.user;

	if (user.id.toString() === blog.user.toString()) {
		await Blog.findByIdAndDelete(req.params.id);
		res.status(204).end();
	}
	res.status(400).json({ error: 'Not the owner of the blog' });
});

bloglistRouter.put('/:id', async (req, res) => {
	const response = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}).populate('user', { name: 1, username: 1 });
	res.json(response);
});

module.exports = bloglistRouter;
