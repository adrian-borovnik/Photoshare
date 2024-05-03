"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostLikes = exports.undislikePost = exports.unlikePost = exports.dislikePost = exports.likePost = exports.deletePostByUser = exports.deletePostById = exports.updatePostById = exports.createPost = exports.getPostByUser = exports.getPostById = exports.getPosts = exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostShema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    imagePath: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });
exports.PostModel = mongoose_1.default.model('Post', PostShema);
const getPosts = () => exports.PostModel.find();
exports.getPosts = getPosts;
const getPostById = (id) => exports.PostModel.findById(id);
exports.getPostById = getPostById;
const getPostByUser = (userId) => exports.PostModel.find({ user: userId });
exports.getPostByUser = getPostByUser;
const createPost = (values) => new exports.PostModel(values).save().then((post) => post.toObject());
exports.createPost = createPost;
const updatePostById = (id, values) => exports.PostModel.findByIdAndUpdate(id, values).then((post) => post === null || post === void 0 ? void 0 : post.toObject());
exports.updatePostById = updatePostById;
const deletePostById = (id) => exports.PostModel.findOneAndDelete({ _id: id });
exports.deletePostById = deletePostById;
const deletePostByUser = (userId) => exports.PostModel.deleteMany({ user: userId });
exports.deletePostByUser = deletePostByUser;
// TODO | Myb not needed
const likePost = (postId, userId) => exports.PostModel.findByIdAndUpdate(postId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, { new: true }).then((post) => post === null || post === void 0 ? void 0 : post.toObject());
exports.likePost = likePost;
const dislikePost = (postId, userId) => exports.PostModel.findByIdAndUpdate(postId, { $addToSet: { dislikes: userId }, $pull: { likes: userId } }, { new: true }).then((post) => post === null || post === void 0 ? void 0 : post.toObject());
exports.dislikePost = dislikePost;
const unlikePost = (postId, userId) => exports.PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true }).then((post) => post === null || post === void 0 ? void 0 : post.toObject());
exports.unlikePost = unlikePost;
const undislikePost = (postId, userId) => exports.PostModel.findByIdAndUpdate(postId, { $pull: { dislikes: userId } }, { new: true }).then((post) => post === null || post === void 0 ? void 0 : post.toObject());
exports.undislikePost = undislikePost;
const getPostLikes = (postId) => exports.PostModel.findById(postId).then((post) => post === null || post === void 0 ? void 0 : post.likes);
exports.getPostLikes = getPostLikes;
