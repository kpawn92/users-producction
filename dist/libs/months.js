"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonth = void 0;
const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];
const getMonth = (month) => {
    return months.find((_item, i) => i === month);
};
exports.getMonth = getMonth;
//# sourceMappingURL=months.js.map