const mongoose = require("mongoose");

const votingPlugin = (schema, opts = {}) => {
	const ref = opts.ref || "User";
	schema.add({
		votes: {
			up: [{ type: mongoose.Schema.Types.ObjectId, ref }],
			down: [{ type: mongoose.Schema.Types.ObjectId, ref }],
		},
	});

	schema.virtual("upvotes").get(function () {
		return this.votes.up.length;
	});

	schema.virtual("downvotes").get(function () {
		return this.votes.down.length;
	});

	schema.virtual("tally").get(function () {
		return this.votes.up.length - this.votes.down.length;
	});

	schema.methods.upvoted = function (voter) {
		return this.votes.up.includes(voter._id || voter);
	};

	schema.methods.downvoted = function (voter) {
		return this.votes.down.includes(voter._id || voter);
	};

	schema.methods.voted = function (voter) {
		if (!voter) return {};
		const upvoted = this.upvoted(voter);
		const downvoted = this.downvoted(voter);
		return {
			upvoted,
			downvoted,
			voted: upvoted || downvoted,
		};
	};

	schema.methods.upvote = function (voter) {
		const id = voter._id || voter;
		this.votes.down.pull(id);
		this.votes.up.addToSet(id);
		return this.save();
	};

	schema.methods.downvote = function (voter) {
		const id = voter._id || voter;
		this.votes.up.pull(id);
		this.votes.down.addToSet(id);
		return this.save();
	};

	schema.methods.unvote = function (voter) {
		const id = voter._id || voter;
		const path = this.upvoted(id) ? "up" : "down";
		this.votes[path].pull(id);
		return this.save();
	};
};

module.exports = votingPlugin;
