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
exports.getUsersByReference = exports.updateReference = exports.createdReference = exports.searchSponsor = void 0;
const mysql_conn_1 = require("../../../connection/mysql.conn");
const searchSponsor = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT affilies FROM tb_references WHERE userId = ?', [userId]);
    return result;
});
exports.searchSponsor = searchSponsor;
const createdReference = ({ userId, affilies }) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('INSERT INTO tb_references SET ?', {
        userId,
        affilies,
    });
    return result;
});
exports.createdReference = createdReference;
const updateReference = ({ userId, affilies }) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('UPDATE tb_references SET affilies = ? WHERE userId = ?', [affilies, userId]);
    return result;
});
exports.updateReference = updateReference;
const getUsersByReference = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT affilies FROM tb_references WHERE userId = ?', [userId]);
    return result;
});
exports.getUsersByReference = getUsersByReference;
//# sourceMappingURL=reference.model.js.map