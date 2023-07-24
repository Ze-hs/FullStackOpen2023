const commentRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');
commentRouter.get('/:id/comments', async (req, res) => {
	const data = await Comment.find({ blog: req.params.id }).populate('blog');
	res.json(data);
});

commentRouter.post('/:id/comments', async (req, res) => {
	const { text } = req.body;

	const blog = await Blog.findById(req.params.id);
	const newComment = new Comment({
		text,
		blog: blog._id
	});

	if (text) {
		const response = await newComment.save();
		blog.comments = blog.comments.concat(response._id);
		blog.save();
		res.status(201).json(response);
	}
	res.status(400).end();
});

module.exports = commentRouter;
