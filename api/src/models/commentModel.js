const mongoose = require('mongoose');
const votingPlugin = require('./plugins/votingPlugin');
const { NormalizedUserSchema } = require('./schemas/normalizedUser');

const CommentSchema = mongoose.Schema({
	author: {
		type: NormalizedUserSchema,
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
		type: [NormalizedUserSchema],
		required: false
	}
}, { timestamps: true });

CommentSchema.plugin(votingPlugin);

CommentSchema.methods.toWeb = function() {
	const {
		author, target, content, hashtags, mentions,
		votes, upvotes, downvotes, tally,
		createdAt, updatedAt
	} = this.toObject({virtuals: true});
	return {
		id: this._id, author, target, content,
		hashtags, mentions, votes, upvotes,
		downvotes, tally, createdAt, updatedAt
	};
}

CommentSchema.index({target: 1, author: 1});

module.exports = mongoose.model('Comment', CommentSchema);
