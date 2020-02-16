const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    imageUrl : {
        type: String,
        trim: true,
        required: true
    },
    hashtags: [{
        type: String,
        trim: true,
        // TODO: regexp
    }],
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reactions: {
        likes: {
            type: Number,
            min: 0
        },
        dislikes: {
            type: Number,
            min: 0
        },
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);