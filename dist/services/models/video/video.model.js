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
exports.getFilmByBody = exports.getVideos = exports.getVideoByParams = exports.create = void 0;
const uuid_1 = require("uuid");
const mysql_conn_1 = require("../../../connection/mysql.conn");
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const [result] = yield mysql_conn_1.pool.query('INSERT INTO tb_video SET ?', Object.assign({ id }, body));
    return { result, id, body };
});
exports.create = create;
const getVideoByParams = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getVideoByParams = getVideoByParams;
const getVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT * FROM tb_video');
    return result;
});
exports.getVideos = getVideos;
const getFilmByBody = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield mysql_conn_1.pool.query('SELECT id FROM tb_video WHERE title = ? AND year = ? AND director = ?', [body.title, body.year, body.director]);
    return result;
});
exports.getFilmByBody = getFilmByBody;
//# sourceMappingURL=video.model.js.map