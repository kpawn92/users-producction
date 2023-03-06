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
exports.getModByUserID = exports.getModerators = exports.getDataModerator = exports.createMod = void 0;
const mysql_conn_1 = require("../../../connection/mysql.conn");
const uuid_1 = require("uuid");
const createMod = ({ name, lastname, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const [result] = yield mysql_conn_1.pool.query('INSERT INTO tb_moderator SET ?', {
        id,
        name,
        lastname,
        userId,
    });
    return {
        modResult: result,
        id,
        name,
        lastname,
    };
});
exports.createMod = createMod;
const getDataModerator = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT tb_moderator.userId, tb_moderator.name, tb_moderator.lastname, tb_user.email, tb_user.state FROM tb_moderator JOIN tb_user ON tb_user.id = tb_moderator.userId JOIN tb_role ON tb_role.id = tb_user.role WHERE tb_moderator.userId = ?', [id]);
    return result;
});
exports.getDataModerator = getDataModerator;
const getModerators = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT tb_user.id as userId, tb_moderator.`name`, tb_moderator.lastname, email, state, tb_user.createdAt FROM  tb_moderator JOIN tb_user ON tb_user.id = tb_moderator.userId JOIN tb_role ON tb_role.id = tb_user.role');
    return result;
});
exports.getModerators = getModerators;
const getModByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT userId FROM tb_moderator WHERE userId = ?', [userId]);
    return result;
});
exports.getModByUserID = getModByUserID;
//# sourceMappingURL=moderator.model.js.map