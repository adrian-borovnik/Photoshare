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
exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = void 0;
const user_1 = require("../models/user");
const post_1 = require("../models/post");
const comment_1 = require("../models/comment");
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.listUsers = listUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.sendStatus(400);
        const user = yield (0, user_1.getUserById)(id);
        if (!user)
            return res.sendStatus(404);
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        if (!id)
            return res.sendStatus(400);
        const user = yield (0, user_1.getUserById)(id);
        if (!user)
            return res.sendStatus(404);
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        yield user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.sendStatus(400);
        const deletedUser = yield (0, user_1.deleteUserById)(id);
        if (!deletedUser)
            return res.sendStatus(404);
        yield Promise.all([(0, post_1.deletePostByUser)(id), (0, comment_1.deleteCommentByUser)(id)]);
        return res.status(200).json(deletedUser).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deleteUser = deleteUser;
