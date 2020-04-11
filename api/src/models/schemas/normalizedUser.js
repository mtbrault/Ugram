const mongoose = require('mongoose');

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

module.exports = {
	NormalizedUserSchema
};
