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
exports.updatePassword = exports.getSubsById = exports.getSubs = exports.getDataSubscriber = exports.createSubs = void 0;
const mysql_conn_1 = require("../../../connection/mysql.conn");
const uuid_1 = require("uuid");
const createSubs = ({ name, lastname, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const [result] = yield mysql_conn_1.pool.query('INSERT INTO tb_subscriber SET ?', {
        id,
        name,
        lastname,
        userId,
    });
    return {
        subsResult: result,
        id,
        name,
        lastname,
    };
});
exports.createSubs = createSubs;
const getDataSubscriber = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT tb_subscriber.id, tb_subscriber.name, tb_subscriber.lastname, tb_user.email, tb_user.state FROM tb_subscriber JOIN tb_user ON tb_user.id = tb_subscriber.userId JOIN tb_role ON tb_role.id = tb_user.role WHERE tb_subscriber.id = ?', [id]);
    return result;
});
exports.getDataSubscriber = getDataSubscriber;
const getSubs = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT tb_user.id as userId, tb_subscriber.`name`, tb_subscriber.lastname, email, state, createdAt FROM tb_subscriber JOIN tb_user ON tb_user.id = tb_subscriber.userId');
    return result;
});
exports.getSubs = getSubs;
const getSubsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT id FROM tb_subscriber WHERE id = ?', [id]);
    return result;
});
exports.getSubsById = getSubsById;
const updatePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('UPDATE tb_subscriber SET password = ? WHERE id = ?', [password, id]);
    return result;
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=subscriber.model.js.map