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
exports.register = exports.login = void 0;
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: 'Missing required fields' });
        const user = yield (0, user_1.getUserByUsername)(username).select('+auth.salt +auth.password');
        if (!user)
            return res.status(400).json({ message: 'User is not registered' });
        const expectedHash = (0, utils_1.authentication)(user.auth.salt, password);
        if (expectedHash !== user.auth.password)
            return res.status(403).json({ message: 'Invalid username or password' });
        const salt = (0, utils_1.random)();
        user.auth.sessionToken = (0, utils_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie('AUTH', user.auth.sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: 'Error logging user' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ message: 'Missing required fields' });
        const existingUser = yield (0, user_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const salt = (0, utils_1.random)();
        const user = yield (0, user_1.createUser)({
            username,
            email,
            auth: {
                password: (0, utils_1.authentication)(salt, password),
                salt,
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ status: 400, message: 'Error registering user' });
    }
});
exports.register = register;
