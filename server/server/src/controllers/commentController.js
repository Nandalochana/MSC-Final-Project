const Comment = require('../models/comment');

class CommentController {
    async getComments(req, res) {
        const comments = await Comment.find().populate('taskId userId');
        res.status(200).json({ data: comments });
    }

    async getCommentById(req, res) {
        const comment = await Comment.findById(req.params.id).populate('taskId userId');
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }

    async createComment(req, res) {
        try {
            const newComment = new Comment(req.body);
            console.log(newComment);
            await newComment.save();
            res.status(201).json({ data: newComment });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateComment(req, res) {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId userId');
        if (updatedComment) {
            res.status(200).json(updatedComment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }

    async deleteComment(req, res) {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (deletedComment) {
            res.status(200).json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    }

    async getCommentsByTaskId(req, res) {
        try {
            const comments = await Comment.find({ taskId: req.params.taskId }).populate('taskId userId');
            res.status(200).json({ data: comments });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = CommentController;