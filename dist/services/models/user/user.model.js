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
exports.changeStateUser = exports.getUserByID = exports.getProfile = exports.searchUserByParams = exports.getRoleById = exports.getByEmail = exports.accountUser = exports.countUsers = void 0;
const mysql_conn_1 = require("../../../connection/mysql.conn");
require("dotenv/config");
const countUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT COUNT(id) as count FROM tb_user');
    return result;
});
exports.countUsers = countUsers;
const accountUser = ({ id, email, password, role, }) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('INSERT INTO tb_user SET ?', {
        id,
        email,
        password,
        role,
    });
    return { userResult: result, _id: id };
});
exports.accountUser = accountUser;
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT id, email, password as pass, state FROM tb_user WHERE email = ?', [email]);
    return result;
});
exports.getByEmail = getByEmail;
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT tb_role.name FROM tb_user JOIN tb_role ON tb_role.id = tb_user.role WHERE tb_user.id = ?', [id]);
    return result;
});
exports.getRoleById = getRoleById;
const searchUserByParams = (ref) => __awaiter(void 0, void 0, void 0, function* () {
    const [query] = yield mysql_conn_1.pool.query(`SELECT id, email FROM tb_user WHERE email LIKE '%${ref}%'`);
    return query;
});
exports.searchUserByParams = searchUserByParams;
const getProfile = (id, entity = 'subscriber') => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query(`SELECT tb_${entity}.id, tb_${entity}.name, lastname, email, createdAt FROM tb_${entity} JOIN tb_user ON tb_user.id = tb_${entity}.userId WHERE tb_user.id = ?`, [id]);
    return { result, permission: entity };
});
exports.getProfile = getProfile;
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT id FROM tb_user WHERE id= ?', [
        id,
    ]);
    return result;
});
exports.getUserByID = getUserByID;
const changeStateUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('UPDATE tb_user SET state = 0 WHERE id = ?', [id]);
    return result;
});
exports.changeStateUser = changeStateUser;
//# sourceMappingURL=user.model.js.map