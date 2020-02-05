const { User } = require("../db");

const authenticate = async ({ username, password }) => {
    if (!username || !password)
        throw new Error("missing username or password");
    let user = await User.findOne({ username: username.toLowerCase() });
    if (!user)
        throw new Error("Unknown user");
    user = await user.comparePassword(password);
    return user;
};

const create = async ({ username, password, firstname, lastname, email, profile_pic_url }) => {
    if(!username || !password)
        throw new Error("missing username or password");
    let user = await User.findOne({ username: username.toLowerCase() });
    if(user)
        throw new Error("username already taken");
	const data = {
		username, password, displayname: username
	};
	if(firstname) data.firstname = firstname;
	if(lastname) data.lastname = lastname;
	if(email) data.email = email;
	if(profile_pic_url) data.profile_pic_url = profile_pic_url;
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

// module.exports.update = async (user, data) => {
//     if(data._id)
//         delete data._id;
//
//
// }

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
	removeById
};
