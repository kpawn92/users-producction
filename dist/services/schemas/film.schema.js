"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmBodySchema = void 0;
const zod_1 = require("zod");
exports.filmBodySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        year: zod_1.z.string().min(4).max(4),
        runtime: zod_1.z.string().min(1),
        genre: zod_1.z.string().min(1),
        director: zod_1.z.string().min(1),
        actors: zod_1.z.string().min(1),
        plot: zod_1.z.string().min(1),
        poster: zod_1.z.string().min(1),
        currency_code: zod_1.z.string().min(2),
        value: zod_1.z.string().min(2),
    }),
});
//# sourceMappingURL=film.schema.js.map