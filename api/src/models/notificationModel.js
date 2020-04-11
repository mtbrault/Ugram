const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
        required: false
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true });

NotificationSchema.methods.toWeb = function () {
    return {
        id: this._id,
        userId: this.userId,
        isRead: this.isRead,
        text: this.text,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

module.exports = mongoose.model('Notification', NotificationSchema);
