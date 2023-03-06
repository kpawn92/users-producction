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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const server = http_1.default.createServer(app_1.default);
const httpServer = server.listen(process.env.PORT || 3000);
const io = new socket_io_1.Server(httpServer);
(0, socket_1.default)(io);
try {
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            // app.listen(process.env.PORT || 3000);
            console.log(`Server listened on: ${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}`);
            console.log(`Documentation listened on: ${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}/docs`);
        });
    }
    main();
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=index.js.map