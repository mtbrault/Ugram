const mongoose = require("mongoose");

const KeywordSchema = new mongoose.Schema(
	{
		word: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true },
);

KeywordSchema.methods.toWeb = function () {
	return {
		id: this._id,
		word: this.word,
		number: this.number,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	};
};

module.exports = mongoose.model("Keyword", KeywordSchema);
