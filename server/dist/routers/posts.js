"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const posts_1 = require("../controllers/posts");
exports.default = (router) => {
    router.get('/posts', posts_1.listPosts);
    router.get('/posts/:id', posts_1.getPost);
    router.put('/posts/:id', middlewares_1.isAuthenticated, posts_1.updatePost);
    router.delete('/posts/:id', middlewares_1.isAuthenticated, posts_1.deletePost);
    router.post('/posts', middlewares_1.isAuthenticated, posts_1.createPost);
};
