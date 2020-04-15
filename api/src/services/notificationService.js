const { Notification } = require("../db");

const getAll = async (skip, limit, query = {}) => {
    const notifications = await Notification.find(query).sort("+createdAt").skip(skip).limit(limit + 1);
    const last = notifications.length != limit + 1;
    if (!last)
        notifications.pop();
    return {
        last,
        notifications: notifications.map(x => {
            return x.toWeb();
        })
    };
};

const create = async (userId, text = "empty") => {
    let notification = new Notification({userId: userId._id, text: text});
    notification = await notification.save();
    return notification;
};

const getById = async id => {
    const notification = await Notification.findById(id);
    if (!notification)
        throw new Error(`notification with id ${id} doesn't exist`);
    return notification;
};

const getByUser = (user, skip, limit) => {
    return getAll(skip, limit, { "userId": user._id || user});
};

const markAsRead = async (notification) => {
    notification.isRead = true;
    notification = await notification.save();
    return notification
};

const markAllAsRead = async (user) => {
    console.log(user);
    notification = await Notification.updateMany({"userId": user._id || user, isRead: false },
        { $set: {isRead: true}});
    return notification
};

const remove = async notification => {
    return Notification.findByIdAndDelete(notification._id);
};

module.exports = {
    create,
    getByUser,
    getById,
    markAsRead,
    markAllAsRead,
    remove,
};