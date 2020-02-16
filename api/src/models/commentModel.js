const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        // required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reactions: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         liked: {
             type: Boolean,
             // default: false
         }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
