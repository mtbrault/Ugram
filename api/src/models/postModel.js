const mongoose = require('mongoose');
const votingPlugin = require('./plugins/votingPlugin');

const PostSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	imageUrl: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: false,
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

PostSchema.plugin(votingPlugin);

module.exports = mongoose.model('Post', PostSchema);
