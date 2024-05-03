"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:5173',
}));
// app.options('*', cors())
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/api', (0, routers_1.default)());
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGODB_URI);
mongoose_1.default.connection.on('error', (error) => console.error(error));
