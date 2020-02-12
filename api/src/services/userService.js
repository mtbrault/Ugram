const { User } = require("../db");
const { terr } = require("../middlewares/utils");

const authenticate = async ({ username, password }) => {
	if (!username || !password)
		terr("missing username or password field", 400);
	let key = "username";
	if (username.includes("@")){
		key = "email";
	} else if ("+0123456789".includes(username[0])) {
		key = "phoneNumber";
	}
	let user = await User.findOne({ [key]: username.toLowerCase() });
	if (!user)
		throw new Error("Bad Credentials");
	user = await user.comparePassword(password);
	return user;
};

const create = async ({
	username, password, firstname, lastname,
	email, profilePic, phoneNumber,
	}) => {
	for (let [key, value] of Object.entries({ username, password, email, phoneNumber}))
		if(!value) terr(`${key} field is required`, 400);

	let user = await User.findOne({ $or: [
		{ username: username.toLowerCase() },
		{ email: email.toLowerCase() },
		{ phoneNumber }
	]});
	if(user) {
		let reason = "username";
		if(email === user.email) {
			reason = "email address";
		} else if(phoneNumber === user.phoneNumber) {
			reason = "phone number";
		}
		terr(`${reason} already taken`, 400);
	}
	const data = {
		username, password, displayname: username,
		email, phoneNumber
	};
	for (let [key, value] of Object.entries({ firstname, lastname, profilePic }))
		if(!!value) data[key] = value;

	user = new User(data);
	user = await user.save();
	return user;
}

const getById = async id => {
	const user = await User.findById(id);
	if(!user)
		throw new Error(`user with id ${id} doesn't exist`);
	return user;
}

const update = async (user, {firstname, lastname, email, profilePic, phoneNumber}) => {
	let query = [];
	if (email && email !== user.email) query.push({ email: email.toLowerCase()});
	if (phoneNumber && phoneNumber !== user.phone_number) query.push({phoneNumber});

	if (query.length) {
		let existingUser = await User.findOne({ $or: query});

		if(existingUser) {
			let reason = "email address";
			if(phoneNumber === existingUser.phoneNumber) {
				reason = "phone number";
			}
			terr(`${reason} already taken`, 400);
		}
	}

	for (let [key, value] of Object.entries({firstname, lastname, email, profilePic, phoneNumber }))
		if(!!value) user[key] = value;

	user = await user.save();
	return user;
}

const remove = async (user) => {
	const res = await User.findByIdAndDelete(user._id);
	return res;
};

const removeById = async (id) => {
	const res = await User.findByIdAndDelete(id);
	return res;
};

module.exports = {
	authenticate,
	create,
	getById,
	remove,
	removeById,
	update
};
