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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const chatService_1 = __importDefault(require("./routes/chatService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: '*' },
});
app.use('/user', userRoutes_1.default);
app.use('/chat', chatRoutes_1.default);
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room :${room}`);
    });
    socket.on("chatMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, room, msg }) {
        const savedMsg = yield chatService_1.default.saveMessage(userId, room, msg);
        io.to(room).emit("chatMessage", savedMsg);
    }));
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});
app.listen(4000);
