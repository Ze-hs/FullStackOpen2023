require('express-async-errors');
const bloglistRouter = require('express').Router();
const Blog = require('../models/blog');

//Need to include routers after completing the
bloglistRouter.get('/', async (req, res) => {
	const data = await Blog.find({});
	res.json(data);
});

bloglistRouter.post('/', async (req, res) => {
	const newBlog = new Blog(req.body);
	const response = await newBlog.save();
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
