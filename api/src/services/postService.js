const { User, Post } = require("../db");
const { terr, notEmpty } = require("../middlewares/utils");

const create = async (author, { imageUrl, description, hashtags, mentions }) => {
	if (!imageUrl)
		terr("imageUrl field is required", 400);

	if (notEmpty(mentions)) {
		const count = await User.countDocuments({ _id: { $in: mentions } })
		if (count !== mentions.length)
			terr("Bad User Id in mentions", 400);
	} else {
		mentions = [];
	}

	notEmpty(hashtags) || (hashtags = []);

	!!description || (description = "");

	let post = new Post({ author, imageUrl, description, hashtags, mentions });
	post = await post.save();
	return post;
};

const getAll = async (skip, limit, query = {}) => {
	const posts = await Post.find(query).skip(skip).limit(limit + 1); // TODO: make request lean with mongoose-lean-virtuals
	const last = posts.length != limit + 1;
	if(!last)
		posts.pop();
	return {
		last,
		posts: posts.map(x => {
			return x.toWeb();
		})
	};
};

const getByUser = (user, skip, limit) => {
	return getAll(skip, limit, { _id: user._id || user });
};

const getById = async id => {
	const post = await Post.findById(id);
	if (!post)
		throw new Error(`post with id ${id} doesn't exist`);
	return post;
};

const update = async (post, { imageUrl, description, hashtags, mentions }, merge=false) => {
	if (Array.isArray(mentions)) {
		if (mentions.length > 0) {
			const count = await User.countDocuments({ _id: { $in: mentions } })
			if (count !== mentions.length)
				terr("Bad User Id in mentions", 400);
		}
		if (!merge) {
			post.mentions = mentions;
		} else if (mentions.length > 0) {
			post.mentions.addToSet(...mentions);
		}
	}
	if (imageUrl) post.imageUrl = imageUrl;
	if (description) post.description = description;
	if (Array.isArray(hashtags)) {
		if(!merge) {
			post.hashtags = hashtags;
		} else if (hashtag.length > 0) {
			post.hashtags.addToSet(...hashtag);
		}
	}
	post = await post.save();
	return post;
};

const remove = async post => {
	return Post.findByIdAndDelete(post._id);
};

module.exports = {
	create,
	getAll,
	getByUser,
	getById,
	update,
	remove
};
