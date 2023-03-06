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
exports.isSubs = exports.isModerator = exports.isRoot = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const models_1 = require("../models");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json({ message: 'Access denied' });
        const payload = jsonwebtoken_1.default.verify(token, String(process.env.KEY_SECRET));
        const queryRole = yield models_1.User.getRoleById(payload.id);
        req.rol = queryRole[0].name;
        req.userID = payload.id;
        return next();
    }
    catch (e) {
        return res.status(404).json({ message: 'Token invalid' });
    }
});
exports.verifyToken = verifyToken;
const isRoot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield models_1.User.getRoleById(req.userID);
        if (role[0].name !== 'root')
            return res.status(401).json({ message: 'Unauthorized' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal err server ' + e });
    }
});
exports.isRoot = isRoot;
const isModerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield models_1.User.getRoleById(req.userID);
        if (role[0].name !== 'moderator')
            return res.status(401).json({ message: 'Unauthorized' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal err server ' + e });
    }
});
exports.isModerator = isModerator;
const isSubs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield models_1.User.getRoleById(req.userID);
        if (role[0].name !== 'user')
            return res.status(401).json({ message: 'Unauthorized' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal err server ' + e });
    }
});
exports.isSubs = isSubs;
//# sourceMappingURL=verifyJwt.midd.js.map