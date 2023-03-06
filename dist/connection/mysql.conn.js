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
exports.isConn = exports.pool = void 0;
const promise_1 = require("mysql2/promise");
require("dotenv/config");
exports.pool = (0, promise_1.createPool)({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASS || '',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_MYSQL || 'usersdb',
});
const isConn = () => __awaiter(void 0, void 0, void 0, function* () {
    const [res] = yield exports.pool.query('SELECT NOW()');
    return res;
});
exports.isConn = isConn;
//# sourceMappingURL=mysql.conn.js.map