const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TopicSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    }
});

TopicSchema.plugin(timestamp);

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;