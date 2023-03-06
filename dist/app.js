"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
//SWAGGER
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = require("./swaggerOptions");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const video_routes_1 = __importDefault(require("./routes/video.routes"));
//const initialSetup_1 = require("./libs/initialSetup");
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
// Initial Setup
//(0, initialSetup_1.createRoles)();
//(0, initialSetup_1.accountAdmin)();
// routes
app.use('/auth/', auth_routes_1.default);
app.use('/user/', user_routes_1.default);
app.use('/film/', video_routes_1.default);
// Swagger UI
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
exports.default = app;
//# sourceMappingURL=app.js.map
