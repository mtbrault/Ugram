const notificationService = require('../services/notificationService');
const { to, rerr } = require('../middlewares/utils');

// NOTIFICATIONS

// Authenticated calls

//use only after extractPageParams
const  getSelf = async (req, res, next) => {
    const [err, ret] = await to(notificationService.getByUser(req.user, req.skip, req.limit));
    if (err)
        return rerr(next, err);
    const {last, notifications} = ret;
    const chunk = {
        page: req.page,
        limit: req.limit,
        count: notifications.length,
        notifications
    };
    if (!last)
        chunk.next = `/self/notification?page=${req.page + 1}&limit=${req.limit}`;
    return res.status(200).json(chunk);
};

// use only after isValidUserId and extractPageParams
const getByUser = async (req, res, next) => {
    const [err, ret] = await to(notificationService.getByUser(req.refUser, req.skip, req.limit));
    if (err)
        return rerr(next, err);
    const {last, notifications} = ret;
    const chunk = {
        page: req.page,
        limit: req.limit,
        count: notifications.length,
        notifications
    };
    if (!last)
        chunk.next = `/user/${req.refUser._id}/notification?page=${req.page + 1}&limit=${req.limit}`;
    return res.status(200).json(chunk);
};

// use only after isValidNotificationId
const markAsRead = async (req, res, next) => {
    const [err, notification] = await to(notificationService.markAsRead(req.refNotification));
    if (err)
        return rerr(next, err);
    return res.status(200).json(notification.toWeb());
};

// use only after isValidNotificationId
const remove = async (req, res, next) => {
    const [err, notification] = await to(notificationService.remove(req.refNotification));
    if (err)
        return rerr(next, err, 500);
    return res.status(204).send();
};

//
//const create = async (req, res, next) => {
//    const [err, notification] = await to(notificationService.create(req.refUser, req.body.text));
//    if (err)
//        return rerr(next, err, 500);
//    return res.status(200).json(notification.toWeb());
//};
//

module.exports = {
   // create,
    getSelf,
    getByUser,
    markAsRead,
    remove
};