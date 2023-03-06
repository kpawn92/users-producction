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
exports.verifyUserAccount = exports.verifyUserID = void 0;
const models_1 = require("../models");
const verify_role_midd_1 = require("./verify.role.midd");
const verifyUserID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.query.role;
        if (!verify_role_midd_1.roles.includes(role))
            return res.status(400).json({ message: 'Invalid role' });
        if (role === 'user') {
            const queryUser = (yield models_1.Subscriber.getSubsById(req.params.id));
            if (queryUser.length === 0)
                return res
                    .status(404)
                    .json({ message: 'Subscriber not found' });
            return next();
        }
        const queryMod = (yield models_1.Moderator.getModByUserID(req.params.id));
        if (queryMod.length === 0)
            return res.status(404).json({ message: 'Moderator not found' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.verifyUserID = verifyUserID;
const verifyUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = models_1.User.getUserByID(req.params.id);
        if (user.length === 0)
            return res.status(404).json({ message: 'User not found' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.verifyUserAccount = verifyUserAccount;
//# sourceMappingURL=verify.user.midd.js.map