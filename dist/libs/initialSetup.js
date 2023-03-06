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
exports.accountAdmin = exports.createRoles = void 0;
require("dotenv/config");
const uuid_1 = require("uuid");
const models_1 = require("../services/models");
const pass_tool_1 = require("../tools/pass.tool");
const createRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield models_1.Roles.countRole();
        if (count[0].count > 0)
            return;
        yield models_1.Roles.createRols();
        console.log('Created roles');
    }
    catch (e) {
        console.log(e);
    }
});
exports.createRoles = createRoles;
const accountAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield models_1.User.countUsers();
        if (count[0].count > 0)
            return;
        const pass = process.env.PASSWORD;
        const email = process.env.EMAIL;
        const password = yield (0, pass_tool_1.encryptPassword)(pass);
        const arrRole = yield models_1.Roles.getRoleByName('root');
        const admin = {
            id: (0, uuid_1.v4)(),
            email,
            password,
            role: arrRole[0].id,
        };
        yield models_1.User.accountUser(admin);
        console.log('Root created');
    }
    catch (e) {
        console.log(e);
    }
});
exports.accountAdmin = accountAdmin;
//# sourceMappingURL=initialSetup.js.map