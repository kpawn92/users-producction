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
exports.setFilm = exports.getFilms = void 0;
const models_1 = require("../models");
const getFilms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Video.getVideos();
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.getFilms = getFilms;
const setFilm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Video.getFilmByBody({
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
        });
        if (result.length > 0)
            return res.status(400).json({ message: 'Film already exists' });
        const query = yield models_1.Video.create(req.body);
        return res.status(200).json(query);
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.setFilm = setFilm;
//# sourceMappingURL=video.ctrl.js.map