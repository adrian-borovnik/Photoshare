"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserBySessionToken = exports.getUserByUsername = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserShema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    auth: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
    posts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', UserShema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => exports.UserModel.findOne({ username });
exports.getUserByUsername = getUserByUsername;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({ 'auth.sessionToken': sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const updateUserById = (id, values) => exports.UserModel.findByIdAndUpdate(id, values).then((user) => user === null || user === void 0 ? void 0 : user.toObject());
exports.updateUserById = updateUserById;
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
