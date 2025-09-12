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
exports.SigninUser = exports.SignupUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
const SignupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    if (!email || !name) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    const foundUser = yield prisma_1.default.user.findUnique({
        where: {
            email: email
        }
    });
    if (foundUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 3);
    const user = yield prisma_1.default.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        }
    });
    return res.status(200).json({
        message: "User Sucessfully created",
        id: user.id
    });
});
exports.SignupUser = SignupUser;
const SigninUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password Required"
            });
        }
        const foundUser = yield prisma_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (!foundUser) {
            return res.status(400).json({
                message: "User Not Found! Check Credentials Or SignUp"
            });
        }
        const isMatch = yield bcrypt_1.default.compare(password, foundUser.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: foundUser.id, email: foundUser.email }, JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        });
    }
});
exports.SigninUser = SigninUser;
