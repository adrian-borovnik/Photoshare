"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
exports.default = (router) => {
    router.get('/users', user_1.listUsers);
};
