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
		required: true
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
	phoneNumber: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		match: [/^\+?\d(?:\d-?)+$/, "Invalid phone number"]
	},
	email: {
		type: String,
		required : true,
		trim: true,
		unique: true,
		lowercase: true,
		match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Invalid e-mail address"]
	},
	profilePic: {
		type: String,
		trim: true
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}]
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
		throw new Error('Bad Credentials');
	return this;
};

UserSchema.methods.getJWT = function () {
	return jwt.sign({id:this._id}, config.jwt.secret, {expiresIn: parseInt(config.jwt.expiration)});
};

UserSchema.methods.toWeb = function () {
	const ret =  {
		id: this._id,
		username: this.displayname,
		email: this.email,
		phoneNumber: this.phoneNumber,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};

	for (key of ["firstname", "lastname", "profilePic"])
		if(this[key]) ret[key] = this[key];

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
