"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.listPosts = void 0;
const utils_1 = require("../utils");
const post_1 = require("../models/post");
const comment_1 = require("../models/comment");
const listPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_1.getPosts)().populate('user').populate('comments');
        return res.status(200).json(posts).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.listPosts = listPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.sendStatus(400);
        const post = yield (0, post_1.getPostById)(id).populate('user').populate('comments');
        if (!post)
            return res.sendStatus(404);
        return res.status(200).json(post).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUserId = (0, utils_1.getUserIdFromRequest)(req);
        if (!currentUserId)
            return res.sendStatus(403);
        // console.log(req)
        // TODO | Retrive image from request
        // const { content, imagePath } = req.body
        // if (!content || !imagePath) return res.sendStatus(400)
        // const post = await _createPost({
        // 	content,
        // 	imagePath,
        // 	user: currentUserId,
        // })
        // return res.status(200).json(post).end()
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.createPost = createPost;
// TODO | Check if the user is the owner of the post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.sendStatus(400);
        const { content, imagePath } = req.body;
        console.log(content, imagePath);
        const post = yield (0, post_1.getPostById)(id);
        if (!post)
            return res.sendStatus(404);
        if (content)
            post.content = content;
        if (imagePath)
            post.imagePath = imagePath;
        post.save();
        return res.status(200).json(post).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updatePost = updatePost;
// TODO | Check if the user is the owner of the post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.sendStatus(400);
        const deletedPost = yield (0, post_1.deletePostById)(id);
        if (!deletedPost)
            return res.sendStatus(404);
        yield (0, comment_1.deleteCommentByPost)(id);
        return res.status(200).json(deletedPost).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deletePost = deletePost;
