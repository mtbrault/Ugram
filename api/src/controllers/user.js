const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 *
 * @param req.body {
 *     username: "ptitlouis32",
 *     name: "Louis",
 *     email: "louis@truc.troc",
 *     phone_number: "000000",
 *     profile_picture: "url...." (optional)
 * }
 * @param res
 */
function post(req, res) {
        if (req.body.username && req.body.name && req.body.email
        && req.body.phone_number) {
            new User({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                profile_picture: req.body.profile_picture,
                creation_date: Date.now(),
                last_update_date: Date.now()
            }).save((err) => {
                if (err) {
                    res.status(500).json({
                        message: "Couldn't create user"
                    })
                } else {
                    res.status(201).json({
                        message: "Created",
                    })
                }
            });
        } else {
            res.status(400).json({
                message: "Invalid data passed to create user"
            })
        }
}

/**
 *
 * @param req.params {
 *     id: "ObjectId"
 * }
 * @param res
 */
function get(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        User.findOne({_id: req.params.id}).then((user) => {
            if (user)
                res.status(200).json(user);
            else
                res.status(404).json({
                    message: "User not found"
                });
        });
    } else {
        res.status(400).json({
            message: "Invalid user id passed as parameter"
        });
    }
}

/**
 *
 * @param req.body {
 *     username: "ptitlouis32",
 *     name: "Louis",
 *     email: "louis@truc.troc",
 *     phone_number: "000000",
 *     profile_picture: "url...."
 * }
 *
 * @param req.params {
 *     id: "ObjectId"
 * }
 *
 * @param res
 */
function put(req, res) {
    let authorizedField = [
        "username", "name",
        "email", "phone_number", "profile_picture"];

    if (ObjectId.isValid(req.params.id)) {
        for (item of Object.keys(req.body)) {
            if (!authorizedField.includes(item)) {
                res.status(400).json({
                    message: "Invalid parameter passed in the body"
                })
                return;
            }
        }

        User.findOne({_id: req.params.id}).then((user) => {
            if (user) {
                user.username = req.body.username;
                user.name = req.body.name;
                user.email = req.body.email;
                user.phone_number = req.body.phone_number;
                user.profile_picture = req.body.profile_picture;
                user.last_update_date = Date.now();

                user.save((err) => {
                    if (err) {
                        res.status(500).json({
                            message: "Couldn't update user"
                        })
                    } else {
                        res.status(200).json(user)
                    }
                })
            }
            else
                res.status(404).json({
                    message: "User not found"
                });
        })

    } else {
        res.status(400).json({
            message: "Invalid user id passed as parameter"
        });
    }
}

/**
 *
 * @param req (none)
 * @param res
 */
function getAll(req, res) {
    User.find({}).then((user) => {
        if (user === null) {
            res.status(500).json({
                message: "Couldn't get users"
            })
        } else {
            res.status(200).json(user)
        }
    })
}

module.exports = {
    post: post,
    get: get,
    put: put,
    getAll: getAll
};