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
exports.invalidUser = exports.getUsers = exports.getUserDataById = exports.getUsersAffilies = void 0;
const months_1 = require("../../libs/months");
const models_1 = require("../models");
const getUsersAffilies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (yield models_1.References.getUsersByReference(req.params.ref));
        if (result.length === 0)
            return res
                .status(406)
                .json({ message: 'Sponsor does not contain affiliates' });
        const arr = JSON.parse(result[0].affilies);
        const listMonth = arr
            .map(({ createdAt }) => Date.parse(createdAt))
            .map((item) => new Date(item).getMonth());
        const listIdAffilies = arr.filter((item) => item.createdAt.split('-')[1] ===
            (Number(req.query.month) < 10
                ? '0' + req.query.month
                : req.query.month));
        const amountForMonth = listMonth.filter((item) => item === Number(req.query.month) - 1).length;
        if (req.query.month === undefined)
            return res.status(202).json(arr);
        return res.status(200).json({
            month: (0, months_1.getMonth)(Number(req.query.month) - 1),
            amountAffilies: arr.length,
            amountForMonth,
            listIdAffilies,
        });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error ' + e });
    }
});
exports.getUsersAffilies = getUsersAffilies;
const getUserDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.role === 'user') {
            const user = yield models_1.Subscriber.getDataSubscriber(req.params.id);
            return res.status(202).json({ subscriber: user });
        }
        const moderator = yield models_1.Moderator.getDataModerator(req.params.id);
        return res.status(200).json({ moderator });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.getUserDataById = getUserDataById;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.role === 'moderator') {
            const moderators = yield models_1.Moderator.getModerators();
            return res.status(202).json({ moderators });
        }
        const subscribers = yield models_1.Subscriber.getSubs();
        return res.status(200).json({ subscribers });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.getUsers = getUsers;
const invalidUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.User.changeStateUser(req.params.id);
        return res.status(200).json({ result });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.invalidUser = invalidUser;
//# sourceMappingURL=user.ctrl.js.map