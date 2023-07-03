const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3
	},
	passwordHash: {
		type: String,
		required: true,
		minLength: 3
	},
	name: {
		type: String,
		required: true
	}
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
