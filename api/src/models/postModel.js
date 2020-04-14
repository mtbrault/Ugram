const mongoose = require("mongoose");
const votingPlugin = require("./plugins/votingPlugin");
const { NormalizedUserSchema } = require("./schemas/normalizedUser");

const PostSchema = new mongoose.Schema(
	{
		author: {
			type: NormalizedUserSchema,
			required: true,
		},
		imageUrl: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: false,
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

PostSchema.plugin(votingPlugin);

PostSchema.methods.toWeb = function (user) {
	return (({
		author,
		imageUrl,
		description,
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
		imageUrl,
		description,
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

module.exports = mongoose.model("Post", PostSchema);
