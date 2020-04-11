const notification = require('../controllers/notificationController');
const { isValidNotificationId, isValidUserId,  isAdminOrNotificationOwner } = require("../middlewares/validation");
const { extractPageParams } = require("../middlewares/query");

const notificationRouter = router => {
    // ** Notification **
    router.get('/self/notification', extractPageParams, notification.getSelf); //R
    router.patch('/notification/read/:id', isValidNotificationId("id"), isAdminOrNotificationOwner, notification.markAsRead); //U
    router.patch('/self/notification/read', notification.markAllAsRead); //U
    router.delete('/notification/:id', isValidNotificationId("id"), isAdminOrNotificationOwner, notification.remove); //D
    return router;
};

module.exports = notificationRouter;
