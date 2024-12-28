const Attachment = require('../models/attachment');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

class AttachmentController {
    async getAttachments(req, res) {
        const attachments = await Attachment.find().populate('taskId');
        res.status(200).json(attachments);
    }

    async getAttachmentById(req, res) {
        const attachment = await Attachment.findById(req.params.id).populate('taskId');
        if (attachment) {
            res.status(200).json(attachment);
        } else {
            res.status(404).json({ message: 'Attachment not found' });
        }
    }

    async createAttachment(req, res) {
        try {
            const newAttachment = new Attachment({
                taskId: req.body.taskId,
                description: req.file.filename,
                status: req.body.status
            });
            await newAttachment.save();
            res.status(201).json(newAttachment);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateAttachment(req, res) {
        const updatedAttachment = await Attachment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId');
        if (updatedAttachment) {
            res.status(200).json(updatedAttachment);
        } else {
            res.status(404).json({ message: 'Attachment not found' });
        }
    }

    async deleteAttachment(req, res) {
        const deletedAttachment = await Attachment.findByIdAndDelete(req.params.id);
        if (deletedAttachment) {
            res.status(200).json({ message: 'Attachment deleted' });
        } else {
            res.status(404).json({ message: 'Attachment not found' });
        }
    }
}

module.exports = { AttachmentController, upload };