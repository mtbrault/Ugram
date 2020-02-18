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

const getById = async (req, res, next) => {
    return res.status(200).json(req.post.toWeb());
};

const remove = async (req, res, next) => {
    const [err, post] = await to(postService.remove(req.user, req.post));
    if(err)
        return rerr(next, err, 500);
    return res.status(204).send();
};

module.exports = {
    upload,
    getById,
    remove
};