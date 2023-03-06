"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Name is required'),
        lastname: zod_1.z.string().nonempty('Lastname is required'),
        email: zod_1.z.string().nonempty('Email is required').email(),
        password: zod_1.z.string().nonempty('Password is required').min(6),
    }),
    params: zod_1.z.object({
        ref: zod_1.z.string().min(3).optional(),
    }),
});
exports.signInSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().nonempty('Email is required').email(),
        password: zod_1.z.string().nonempty('Password is required').min(6),
    }),
});
//# sourceMappingURL=auth.schema.js.map