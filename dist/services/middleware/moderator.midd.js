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
exports.accountMod = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const models_1 = require("../models");
const uuid_1 = require("uuid");
const pass_tool_1 = require("../../tools/pass.tool");
const accountMod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, email, role } = req.body;
        if (role !== 'moderator')
            return res.status(404).json({ message: 'Invalid role' });
        const idRole = yield models_1.Roles.getRoleByName(role);
        const user = yield models_1.User.accountUser({
            id: (0, uuid_1.v4)(),
            email,
            password: yield (0, pass_tool_1.encryptPassword)(req.body.password),
            role: idRole[0].id,
        });
        const { userResul, _id } = Object(user);
        const mod = yield models_1.Moderator.createMod({ name, lastname, userId: _id });
        const token = jsonwebtoken_1.default.sign({ _id }, String(process.env.KEY_SECRET), {
            expiresIn: 86400, // 24h valid
        });
        return res.status(200).json({ mod, userResul, token });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.accountMod = accountMod;
//# sourceMappingURL=moderator.midd.js.map