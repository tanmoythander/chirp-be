var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}]
});

var postSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	created_by: {
		type: String,
		ref: 'User'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

// declare a model called User which has schema userSchema
mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);