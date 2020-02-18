const postService = require('../services/postService');
const { to, rerr } = require('../middlewares/utils');

//POSTS

// Authenticated calls

const upload = async (req, res, next) => {
    const [err, post] = await to(postService.create(req.user, req.body));
    if (err)
        return rerr(next, err);
    return res.status(201).json(post.toWeb());
};

module.exports = {
    upload
};