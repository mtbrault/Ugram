const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { to } = require('../middlewares/utils');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		match: [/^[a-zA-Z]\w{3,}$/, "Invalid Username"]
	},
	displayname: {
		type: String,
		trim: true,
		unique: true,
		match: [/^[a-zA-Z]\w{3,}$/, "Invalid displayName"]
	},
	password: {
		type: String,
		required: function() { return this.username ? true : false }
	},
	isadmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	firstname: {
		type: String,
		trim: true
	},
	lastname: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	profile_pic_url: {
		type: String,
		trim: true
	}
	// posts: [Post.schema]
}, { timestamps: true });

UserSchema.pre('save', async function () {
	if(this.password && (this.isModified('password') || this.isNew)){
		let res = await bcrypt.genSalt(10);
		res = await bcrypt.hash(this.password, res);
		this.password = res;
	}
});

UserSchema.methods.comparePassword = async function (pw) {
	if(!this.password)
		throw new Error('password not set');
	const res = await bcrypt.compare(pw, this.password);
	if(!res)
		throw new Error('invalid password');
	return this;
};

UserSchema.methods.getJWT = function () {
	return jwt.sign({id:this._id}, config.jwt.secret, {expiresIn: parseInt(config.jwt.expiration)});
};

UserSchema.methods.toWeb = function () {
	const ret =  {
		username: this.displayname,
		id: this._id,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};
	if (this.firstname) ret.firstname = this.firstname;
	if (this.lastname) ret.lastname = this.lastname;
	if (this.email) ret.email = this.email;
	if (this.profile_pic_url) ret.profile_pic_url = this.profile_pic_url;
	return ret;
};

UserSchema.virtual('fullname').set(function (name) {
	var split = name.split(' ');
	this.first = split[0];
	this.last = split[1];
});

UserSchema.virtual('fullname').get(function () {
	if(!this.first) return null;
	if(!this.last) return this.first;

	return this.first + ' ' + this.last;
});

module.exports = mongoose.model('User', UserSchema);
