const { User, Post } = require("../db");
const { terr } = require("../middlewares/utils");
const ObjectId = require('mongoose').Types.ObjectId;

const create = async (user, {
    author, imageUrl, description = "", hashtags = [], mentions = []
}) => {
    for (let [key, value] of Object.entries({author, imageUrl} ))
        if (!value) terr(`${key} field is required`, 400);

    if (!ObjectId.isValid(String(author)))
        terr("author should be a valid mongo objectId string", 400);
    author = ObjectId(String(author));

    for (let item of mentions) {
        if (!ObjectId.isValid(String(item)))
            terr(`'${item}' is not a valid mongo objectId string`);
        item = ObjectId(String(item));
    }

    const data = {author, imageUrl, description, hashtags, mentions};
    for (let [key, value] of Object.entries(data))
        data[key] = value;

    let post = new Post(data);
    post = await post.save();
    user.posts.push(post._id);
    await user.save();

    return post;
};

module.exports = {
    create
};