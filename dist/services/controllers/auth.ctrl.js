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
exports.profile = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const uuid_1 = require("uuid");
const pass_tool_1 = require("../../tools/pass.tool");
const models_1 = require("../models/");
const affilies_tool_1 = require("../../tools/affilies.tool");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.params;
        const { name, lastname, email, password } = req.body;
        const rol = yield models_1.Roles.getRoleByName('user');
        const userId = (0, uuid_1.v4)();
        const user = {
            id: userId,
            email,
            password: yield (0, pass_tool_1.encryptPassword)(password),
            role: rol[0].id,
        };
        const subs = {
            name,
            lastname,
            userId,
        };
        console.time('Creating user');
        yield models_1.User.accountUser(user);
        const accountSubscriber = (yield models_1.Subscriber.createSubs(subs));
        console.timeEnd('Creating user');
        console.time('Execution affilies');
        if (ref)
            yield (0, affilies_tool_1.affilies)(req.userRef, accountSubscriber.id); //TODO: condicion para llamar al metodo de affilies
        console.timeEnd('Execution affilies');
        return res.status(200).json(accountSubscriber);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal server error' + e });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const verifyUser = yield models_1.User.getByEmail(email);
    if (verifyUser.length === 0)
        return res.status(404).json({ message: 'Email not found' });
    const { id, pass, state } = verifyUser[0];
    if (state === 0)
        return res.status(401).json({ message: 'Invalid user' });
    const mathPassword = yield (0, pass_tool_1.comparePassword)(password, pass);
    if (!mathPassword)
        return res.status(400).json({ message: 'Invalid password' });
    const token = jsonwebtoken_1.default.sign({ id }, String(process.env.KEY_SECRET), {
        expiresIn: 86400, // 24h valid
    });
    return res.status(200).json({ token });
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.rol === 'user') {
            const subsProfile = yield models_1.User.getProfile(req.userID);
            return res.status(200).json(subsProfile);
        }
        const modProfile = yield models_1.User.getProfile(req.userID, req.rol);
        return res.status(200).json(modProfile);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.profile = profile;
//# sourceMappingURL=auth.ctrl.js.map