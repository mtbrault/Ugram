const mongoose = require('mongoose');
const votingPlugin = require('./plugins/votingPlugin');

const NormalizedUserSchema = mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	username: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	}
}, {_id: false});

const PostSchema = mongoose.Schema({
	author: {
		type: NormalizedUserSchema,
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
		type: [NormalizedUserSchema],
		required: false
	}
}, { timestamps: true });

PostSchema.plugin(votingPlugin);

PostSchema.methods.toWeb = function() {
	const {
		author, imageUrl, hashtags, mentions,
		votes, upvotes, downvotes, tally,
		description, createdAt, updatedAt
	} = this.toObject({virtuals: true});
	return {
		id: this._id, author, imageUrl, hashtags,
		mentions, votes, upvotes, downvotes,
		tally, description, createdAt, updatedAt
	};
}

module.exports = mongoose.model('Post', PostSchema);
