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
exports.affilies = void 0;
const models_1 = require("../services/models");
const updateAffilities = (userId, affiliesLast, idAffilies) => __awaiter(void 0, void 0, void 0, function* () {
    const last = JSON.parse(affiliesLast[0].affilies);
    const newAffilies = JSON.stringify([
        ...last,
        { idAffilies, createdAt: new Date() },
    ]);
    const updateAff = {
        userId,
        affilies: newAffilies,
    };
    const result = yield models_1.References.updateReference(updateAff);
    console.log('render update reference');
    return result;
});
const affilies = (userId, idAffilies) => __awaiter(void 0, void 0, void 0, function* () {
    const affilies = JSON.stringify([
        { idAffilies, createdAt: new Date() },
    ]);
    const affiliesLast = yield models_1.References.searchSponsor(userId);
    if (affiliesLast.length > 0)
        return updateAffilities(userId, affiliesLast, idAffilies);
    const result = yield models_1.References.createdReference({ userId, affilies });
    console.log('render create reference');
    return { result };
});
exports.affilies = affilies;
//# sourceMappingURL=affilies.tool.js.map