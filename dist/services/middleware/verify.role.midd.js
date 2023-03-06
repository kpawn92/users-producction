"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = exports.roles = void 0;
exports.roles = ['moderator', 'user'];
const verifyRole = (req, res, next) => {
    try {
        const role = req.query.role;
        if (!exports.roles.includes(role))
            return res.status(400).json({ message: 'Invalid role' });
        return next();
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal error: ' + e });
    }
};
exports.verifyRole = verifyRole;
//# sourceMappingURL=verify.role.midd.js.map