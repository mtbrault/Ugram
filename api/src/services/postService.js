const { User, Post } = require("../db");
const { to, terr, notEmpty } = require("../middlewares/utils");

const create = async (author, { imageUrl, description, hashtags, mentions }) => {
	if (!imageUrl || !imageUrl.trim())
		terr("imageUrl field is required", 400);

	if (notEmpty(mentions)) {
		mentions = mentions.map(x => {
			const username = x.toLowerCase();
			if (username === author.username)
				terr("User cannot mention himself", 400);
			return username;
		});
		const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
		if (err || users.length !== mentions.length)
			terr("Unknown Username in mentions", 400);
		mentions = users.map(x => {
			return {
				id: x._id,
				username: x.username
			};
		});
	} else {
		mentions = [];
	}

	notEmpty(hashtags) || (hashtags = []);

	!!description || (description = "");

	let post = new Post({
		author: { id: author._id, username: author.username },
		imageUrl, description, hashtags, mentions
	});
	post = await post.save();
	return post;
};

const getAll = async (skip, limit, query = {}, requestParam = []) => {
	requestParam.forEach(function (value, index) {
		if (value["hashtags"] !== undefined && Array.isArray(requestParam[index].hashtags))
			requestParam[index].hashtags = {$all: requestParam[index].hashtags.split(".")};
	});

	if (requestParam.length !== 0)
		query.$and = requestParam;

	const posts = await Post.find(query).sort("-createdAt").skip(skip).limit(limit + 1);
	const last = posts.length !== limit + 1;
	if (!last)
		posts.pop();
	return {
		last,
		posts: posts.map(x => {
			return x.toWeb();
		})
	};
};

const getByUser = (user, skip, limit) => {
	return getAll(skip, limit, { "author.id": user._id || user });
};

const getById = (id) => {
	return Post.findById(id);
};

const update = async (post, { imageUrl, description, hashtags, mentions }, merge=false) => {
	if (Array.isArray(mentions)) {
		if (mentions.length > 0) {
			mentions = mentions.map(x => x.toLowerCase());
			const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
			if (err || users.length !== mentions.length)
				terr("Unknown Username in mentions", 400);
			mentions = users.map(x => {
				if (post.author.id.equals(x._id))
					terr("User cannot mention himself", 400);
				return {
					id: x._id,
					username: x.username
				};
			});
		}
		if (!merge) {
			post.mentions = mentions;
		} else if (mentions.length > 0) {
			post.mentions.addToSet(...mentions);
		}
	}
	if (imageUrl && imageUrl.trim()) post.imageUrl = imageUrl;
	if (description) post.description = description;
	if (Array.isArray(hashtags)) {
		if (!merge) {
			post.hashtags = hashtags;
		} else if (hashtags.length > 0) {
			post.hashtags.addToSet(...hashtags);
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
