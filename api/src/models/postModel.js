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

PostSchema.methods.toWeb = function() {
	return {
		id: this._id,
		votes: this.votes,
		hashtags: this.hashtags,
		mentions: this.mentions,
		author: this.author,
		imageUrl: this.imageUrl,
		description: this.description,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	}
}

module.exports = mongoose.model('Post', PostSchema);
