const { User, Post, Keyword, Notification } = require("../db");
const { to, terr, notEmpty } = require("../middlewares/utils");

const create = async (author, { imageUrl, description, hashtags, mentions }) => {
	if (!imageUrl || !imageUrl.trim()) terr("imageUrl field is required", 400);

	if (notEmpty(mentions)) {
		mentions = mentions.map((x) => {
			const username = x.toLowerCase();
			if (username === author.username) terr("User cannot mention himself", 400);
			return username;
		});
		const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
		if (err || users.length !== mentions.length) terr("Unknown Username in mentions", 400);
		mentions = users.map((x) => {
			return {
				id: x._id,
				username: x.username,
			};
		});
	} else {
		mentions = [];
	}

	notEmpty(hashtags) || (hashtags = []);

	for (const value of hashtags) addKeyword(value);

	!!description || (description = "");

	let post = new Post({
		author: { id: author._id, username: author.username },
		imageUrl,
		description,
		hashtags,
		mentions,
	});
	post = await post.save();
	return post;
};

const getAll = async (skip, limit, query = {}, requestParam = []) => {
	requestParam.forEach(function (value, index) {
		if (value.hashtags !== undefined && Array.isArray(requestParam[index].hashtags))
			requestParam[index].hashtags = { $all: requestParam[index].hashtags.split(".") };
	});

	if (requestParam.length !== 0) query.$and = requestParam;

	const posts = await Post.find(query)
		.sort("-createdAt")
		.skip(skip)
		.limit(limit + 1);
	const last = posts.length !== limit + 1;
	if (!last) posts.pop();
	return { last, posts };
};

const getByUser = (user, skip, limit) => {
	return getAll(skip, limit, { "author.id": user._id || user });
};

const getById = (id) => {
	return Post.findById(id);
};

const upvote = async (post, user) => {
	if (post.upvoted(user)) return { modified: false, post };
	const session = await Post.startSession();
	post.upvote(user);
	await session.withTransaction(async () => {
		await post.save({ session });
		if (!user._id.equals(post.author.id)) {
			await Notification.create(
				[
					{
						userId: post.author.id,
						text: `${user.displayname} upvoted one of your posts`,
					},
				],
				{
					session,
				},
			);
		}
	});
	await session.endSession();
	return { modified: true, post };
};

const downvote = async (post, user) => {
	if (post.downvoted(user)) return { modified: false, post };
	const session = await Post.startSession();
	post.downvote(user);
	await session.withTransaction(async () => {
		await post.save({ session });
		if (!user._id.equals(post.author.id)) {
			await Notification.create(
				[
					{
						userId: post.author.id,
						text: `${user.displayname} downvoted one of your posts`,
					},
				],
				{
					session,
				},
			);
		}
	});
	await session.endSession();
	return { modified: true, post };
};

const unvote = async (post, user) => {
	if (!post.voted(user).voted) return { modified: false, post };
	post.unvote(user);
	await post.save();
	return { modified: true, post };
};

const update = async (post, { imageUrl, description, hashtags, mentions }, merge = false) => {
	if (Array.isArray(mentions)) {
		if (mentions.length > 0) {
			mentions = mentions.map((x) => x.toLowerCase());
			const [err, users] = await to(User.find({ username: { $in: mentions } }).lean());
			if (err || users.length !== mentions.length) terr("Unknown Username in mentions", 400);
			mentions = users.map((x) => {
				if (post.author.id.equals(x._id)) terr("User cannot mention himself", 400);
				return {
					id: x._id,
					username: x.username,
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

		for (const value of hashtags) addKeyword(value);
	}

	post = await post.save();
	return post;
};

const remove = async (post) => {
	return Post.findByIdAndDelete(post._id);
};

const addKeyword = async (word) => {
	let keyword = await Keyword.findOne({ word });
	if (keyword) keyword.number += 1;
	else keyword = new Keyword({ word });
	keyword.save();
	return keyword;
};

const getKeyword = async (skip, limit, dateLimit) => {
	const keywords = await Keyword.find({ createdAt: { $gte: dateLimit } })
		.sort("-number")
		.skip(skip)
		.limit(limit + 1);
	const last = keywords.length !== limit + 1;
	if (!last) keywords.pop();
	return {
		last,
		keywords: keywords.map((x) => {
			return x.toWeb();
		}),
	};
};

module.exports = {
	create,
	getAll,
	getByUser,
	getById,
	upvote,
	downvote,
	unvote,
	update,
	addKeyword,
	getKeyword,
	remove,
};
