const { User, Post } = require("../db");
const { terr } = require("../middlewares/utils");

const authenticate = async ({ username, password }) => {
	if (!username || !password)
		terr("missing username or password field", 400);
	let key = "username";
	if (username.includes("@")) {
		key = "email";
	} else if ("+0123456789".includes(username[0])) {
		key = "phoneNumber";
	}
	let user = await User.findOne({ [key]: username.toLowerCase() });
	if (!user || !user.password)
		throw new Error("Bad Credentials");
	user = await user.comparePassword(password);
	return user;
};

const create = async ({
	username, password, firstname, lastname,
	email, profilePic, phoneNumber
}) => {
	for (let [key, value] of Object.entries({ username, password, email, phoneNumber }))
		if (!value) terr(`${key} field is required`, 400);

	let user = await User.findOne({
		$or: [
			{ username: username.toLowerCase() },
			{ email: email.toLowerCase() },
			{ phoneNumber }
		]
	});
	if (user) {
		let reason = "phone number";
		if (username.toLowerCase() === user.username) {
			reason = "username";
		} else if (email === user.email) {
			reason = "email address";
		}
		terr(`${reason} already taken`, 400);
	}
	const data = {
		username, password, displayname: username,
		email, phoneNumber
	};
	for (let [key, value] of Object.entries({ firstname, lastname, profilePic }))
		if (value) data[key] = value;

	user = new User(data);
	user = await user.save();
	return user;
};

const getById = async id => {
	const user = await User.findById(id);
	if (!user)
		throw new Error(`user with id ${id} doesn't exist`);
	return user;
};

const getAll = async (skip, limit, id, userParam) => {
	const query = {};
	if (id)
		query._id = { $ne: id };
	if (userParam.length !== 0)
		query.$or = userParam;
	const users = await User.find(query).skip(skip).limit(limit + 1).lean();

	const last = users.length != limit + 1;
	if (!last)
		users.pop();
	return {
		last,
		users: users.map(x => {
			const {
				_id, displayname, email,
				phoneNumber, firstname, lastname,
				profilePic, createdAt, updatedAt
			} = x;
			return {
				id: _id, username: displayname, email,
				phoneNumber, firstname, lastname,
				profilePic, createdAt, updatedAt
			};
		})
	};
};

// TODO: maybe change username in all posts mentions and authors (really heavy, maybe not the best thing)
// or prevent username modification in update.
const update = async (user, {
	username, password, firstname, lastname,
	email, profilePic, phoneNumber
}) => {
	let query = [];
	for (let [key, value] of Object.entries({ username, email, phoneNumber })) {
		if (value && user[key] != value) {
			query.push({ [key]: value.toLowerCase() });
			user[key] = value.toLowerCase();
			if (key === "username")
				user.displayname = value;
		}
	}
	if (query.length) {
		let existingUser = await User.findOne({ $or: query });

		if (existingUser) {
			let reason = "phone number";
			if (username.toLowerCase() === existingUser.username) {
				reason = "username";
			} else if (email.toLowerCase() === existingUser.email) {
				reason = "email address";
			}
			console.log(`${reason} already taken`);
			terr(`${reason} already taken`, 400);
		}
	}

	for (let [key, value] of Object.entries({ password, firstname, lastname, profilePic }))
		if (value && user[key] != value) user[key] = value;

	user = await user.save();
	return user;
}

const remove = async (user) => {
	await Post.deleteMany({"author.id": user._id});
	// do Comment.updateMany() to set user to [deleted]
	return User.findByIdAndDelete(user._id);
};

module.exports = {
	authenticate,
	create,
	getById,
	getAll,
	update,
	remove
};
