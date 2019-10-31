const errors = require('restify-errors');
const Topic = require('../models/Topic');

module.exports = server => {
    // get topics
    server.get('/topics', async (req, res, next) => {
        try {
            const topics = await Topic.find().limit(20).sort({upvote: -1, updatedAt: -1});
            res.send(topics);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // get topics based on device id
    server.get('/topics/:deviceId', async (req, res, next) => {
        try {
            const topics = await Topic.find({deviceId: req.params.deviceId}).limit(20).sort({upvote: -1});
            res.send(topics);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(err));
        }
    });

    // add topic
    server.post('/topics', async (req, res, next) => {
        const {deviceId, topic, upvote, downvote} = req.body;

        const topicData = new Topic({
            deviceId,
            topic,
            upvote,
            downvote
        });

        try {
            const newTopic = await topicData.save();
            res.send(newTopic);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    });

    // upvote a topic
    server.put('/topics/:id/upvote', async (req, res, next) => {
        try {
            const findTopic = await Topic.findById(req.params.id);
            if (findTopic != null) {
                var newUpvote = ++findTopic.upvote;
                const upvotedTopic = await Topic.findByIdAndUpdate(req.params.id, {upvote: newUpvote});
                upvotedTopic.upvote = newUpvote;
                res.send(upvotedTopic);
                next();
            } else {
                return next(new errors.ResourceNotFoundError(err));
            }
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    });

    // downvote a topic
    server.put('/topics/:id/downvote', async (req, res, next) => {
        try {
            const findTopic = await Topic.findById(req.params.id);
            if (findTopic != null) {
                var newDownvote = ++findTopic.downvote;
                const downvotedTopic = await Topic.findByIdAndUpdate(req.params.id, {downvote: newDownvote});
                downvotedTopic.downvote = newDownvote;
                res.send(downvotedTopic);
                next();
            } else {
                return next(new errors.ResourceNotFoundError(err));
            }
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    });
}