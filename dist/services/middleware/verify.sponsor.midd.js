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
exports.verifySponsor = void 0;
const models_1 = require("../models");
const iMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const verifySponsor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sponsor = req.params.ref;
        const indexMonth = req.query.month;
        if (indexMonth) {
            if (!iMonths.includes(indexMonth))
                return res.status(400).json({ message: 'Invalid month' });
        }
        const querySponsor = (yield models_1.Moderator.getModByUserID(sponsor));
        if (querySponsor.length === 0)
            return res.status(404).json({ message: 'Moderator not exits' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
});
exports.verifySponsor = verifySponsor;
//# sourceMappingURL=verify.sponsor.midd.js.map