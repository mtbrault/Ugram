const mongoose = require("mongoose");
const votingPlugin = require("./plugins/votingPlugin");
const { NormalizedUserSchema } = require("./schemas/normalizedUser");

const CommentSchema = new mongoose.Schema(
	{
		author: {
			type: NormalizedUserSchema,
			required: true,
		},
		target: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		content: {
			type: String,
			trim: true,
			required: true,
		},
		hashtags: {
			type: [{ type: String, trim: true }],
			required: false,
		},
		mentions: {
			type: [NormalizedUserSchema],
			required: false,
		},
	},
	{ timestamps: true },
);

CommentSchema.plugin(votingPlugin);

CommentSchema.methods.toWeb = function (user) {
	return (({
		author,
		target,
		content,
		hashtags,
		mentions,
		upvotes,
		downvotes,
		tally,
		createdAt,
		updatedAt,
	}) => ({
		id: this._id,
		author,
		target,
		content,
		hashtags,
		mentions,
		upvotes,
		downvotes,
		tally,
		...this.voted(user),
		createdAt,
		updatedAt,
	}))(this.toObject({ virtuals: true }));
};

module.exports = mongoose.model("Comment", CommentSchema);
