const mongoose = require('mongoose');
const votingPlugin = require('./plugins/votingPlugin');

const CommentSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	target: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	content: {
		type: String,
		trim: true,
		required: true
	},
	hashtags: {
		type: [{type: String, trim: true}],
		required: false
	},
	mentions: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
		required: false
	}
}, { timestamps: true });

CommentSchema.plugin(votingPlugin);

CommentSchema.index({target: 1, author: 1});

module.exports = mongoose.model('Comment', CommentSchema);
