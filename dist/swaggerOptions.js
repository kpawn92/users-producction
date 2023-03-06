"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
require("dotenv/config");
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestor de usuarios',
            version: '1.0.0',
            description: 'API-REST-MYSQL-NODEJS',
        },
        servers: [
            {
                url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
//# sourceMappingURL=swaggerOptions.js.map