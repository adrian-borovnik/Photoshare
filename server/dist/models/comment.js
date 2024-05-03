"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentByUser = exports.deleteCommentByPost = exports.unlikeComment = exports.likeComment = exports.deleteCommentById = exports.updateCommentById = exports.createComment = exports.getCommentByPost = exports.getCommentByUser = exports.getCommentById = exports.getComments = exports.CommentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentShema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
exports.CommentModel = mongoose_1.default.model('Comment', CommentShema);
const getComments = () => exports.CommentModel.find();
exports.getComments = getComments;
const getCommentById = (id) => exports.CommentModel.findById(id);
exports.getCommentById = getCommentById;
const getCommentByUser = (userId) => exports.CommentModel.find({ user: userId });
exports.getCommentByUser = getCommentByUser;
const getCommentByPost = (postId) => exports.CommentModel.find({ post: postId });
exports.getCommentByPost = getCommentByPost;
const createComment = (values) => new exports.CommentModel(values).save().then((comment) => comment.toObject());
exports.createComment = createComment;
const updateCommentById = (id, values) => exports.CommentModel.findByIdAndUpdate(id, values).then((comment) => comment === null || comment === void 0 ? void 0 : comment.toObject());
exports.updateCommentById = updateCommentById;
const deleteCommentById = (id) => exports.CommentModel.findOneAndDelete({ _id: id });
exports.deleteCommentById = deleteCommentById;
const likeComment = (commentId, userId) => exports.CommentModel.findByIdAndUpdate(commentId, { $addToSet: { likes: userId } }, { new: true }).then((comment) => comment === null || comment === void 0 ? void 0 : comment.toObject());
exports.likeComment = likeComment;
const unlikeComment = (commentId, userId) => exports.CommentModel.findByIdAndUpdate(commentId, { $pull: { likes: userId } }, { new: true }).then((comment) => comment === null || comment === void 0 ? void 0 : comment.toObject());
exports.unlikeComment = unlikeComment;
const deleteCommentByPost = (postId) => exports.CommentModel.deleteMany({ post: postId });
exports.deleteCommentByPost = deleteCommentByPost;
const deleteCommentByUser = (userId) => exports.CommentModel.deleteMany({ user: userId });
exports.deleteCommentByUser = deleteCommentByUser;
