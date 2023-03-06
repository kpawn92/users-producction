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
exports.verifyParams = void 0;
const models_1 = require("../models");
const verifyParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ref } = req.params;
        if (ref) {
            const searchUser = (yield models_1.User.searchUserByParams(ref));
            if (searchUser.length === 0)
                return res
                    .status(404)
                    .json({ message: 'Reference invalid, not exists user' });
            const reference = searchUser.find(({ email }) => email.split('@')[0] === ref);
            if (reference.length === 0)
                return res.status(404).json({ message: 'Invalid reference' });
            req.userRef = reference.id;
        }
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.verifyParams = verifyParams;
//# sourceMappingURL=verify.params.midd.js.map