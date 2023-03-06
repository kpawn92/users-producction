"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidUserSchema = exports.usersSchema = exports.userSchema = exports.affiliesSchema = void 0;
const zod_1 = require("zod");
exports.affiliesSchema = zod_1.z.object({
    params: zod_1.z.object({
        ref: zod_1.z.string().min(4).max(36),
    }),
    query: zod_1.z.object({
        month: zod_1.z.string().min(1).max(2).optional(),
    }),
});
exports.userSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(4).max(36),
    }),
    query: zod_1.z.object({
        role: zod_1.z.string().min(4).max(9),
    }),
});
exports.usersSchema = zod_1.z.object({
    query: zod_1.z.object({
        role: zod_1.z.string().min(4).max(9),
    }),
});
exports.invalidUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(4).max(36),
    }),
});
//# sourceMappingURL=user.schema.js.map