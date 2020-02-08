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

const create = async ({ username, password, phone_number, name, email }) => {
    if (!username || !password || !phone_number || !name || !email)
        throw new Error("Missing one argument");
    let user = await User.findOne({ username: username.toLowerCase() });
    if (user)
        throw new Error("Username already taken");
    const data = {
        username, password, phone_number, name, email
    };
    user = new User(data);
    user.save(function (err, user) {
        if (err) {
            console.log(err);
        }
    });
    return user;
}

const getById = async id => {
    const user = await User.findById(id);
    if (!user)
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
