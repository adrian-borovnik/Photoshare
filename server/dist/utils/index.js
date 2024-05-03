"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromRequest = exports.authentication = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const lodash_1 = require("lodash");
const SECRET = process.env.SECRET || 'secret';
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
const authentication = (salt, password) => crypto_1.default.createHmac('sha512', [salt, password].join('/')).update(SECRET).digest('hex');
exports.authentication = authentication;
const getUserIdFromRequest = (req) => {
    const currentUserId = (0, lodash_1.get)(req, 'identity._id');
    return currentUserId;
};
exports.getUserIdFromRequest = getUserIdFromRequest;
