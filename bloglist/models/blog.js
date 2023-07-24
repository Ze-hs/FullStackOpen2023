const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	url: { type: String, required: true },
	likes: {
		type: Number,
		required: true,
		default: 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'comment'
		}
	]
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('blog', blogSchema);
