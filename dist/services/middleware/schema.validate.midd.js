"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidition = void 0;
const zod_1 = require("zod");
const schemaValidition = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            return res.status(400).json(e.issues.map((issue) => ({
                path: issue.path,
                message: issue.message,
            })));
        }
        return res
            .status(500)
            .json({ message: 'Internal server error' + e });
    }
};
exports.schemaValidition = schemaValidition;
//# sourceMappingURL=schema.validate.midd.js.map