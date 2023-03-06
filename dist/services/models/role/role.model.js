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
exports.getRoleByName = exports.countRole = exports.createRols = void 0;
const mysql_conn_1 = require("../../../connection/mysql.conn");
const createRols = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = mysql_conn_1.pool.query(`INSERT INTO tb_role VALUES(name, 'root')`);
    const user = mysql_conn_1.pool.query(`INSERT INTO tb_role VALUES(name, 'user')`);
    const moderator = mysql_conn_1.pool.query(`INSERT INTO tb_role VALUES(name, 'moderator')`);
    yield Promise.all([admin, moderator, user]);
});
exports.createRols = createRols;
const countRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT COUNT(id) as count FROM tb_role');
    return result;
});
exports.countRole = countRole;
const getRoleByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT id FROM tb_role WHERE name = ?', [
        name,
    ]);
    return result;
});
exports.getRoleByName = getRoleByName;
//# sourceMappingURL=role.model.js.map