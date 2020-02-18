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
    if (author !== user._id.toString())
        terr("author is not the logged used", 400);
    author = ObjectId(String(author));

    for (let item of mentions) {
        if (!ObjectId.isValid(String(item)))
            terr(`'${item}' is not a valid mongo objectId string`, 400);
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

const getById = async id => {
    const post = await Post.findById(id);
    if (!post)
        throw new Error(`post with id ${id} doesn't exist`);
    return post;
};

const remove = async (user, post) => {
    console.log(user._id, post.author)
    if (user._id.toString() !== post.author.toString())
        terr("the post author is not the same as the logged user", 400);
    const res = await User.update({_id: ObjectId(post.author)}, {$pull : { posts: new ObjectId(post._id)}});
    post.remove();

    return res;
};

module.exports = {
    create,
    getById,
    remove
};