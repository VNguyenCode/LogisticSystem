"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCatalog = exports.catalogArray = void 0;
const database_1 = __importDefault(require("../config/database"));
const pg_format_1 = __importDefault(require("pg-format"));
const format = pg_format_1.default;
function catalogArray(id, name, mass, qty) {
    return [id, name, mass, qty];
}
exports.catalogArray = catalogArray;
function insertCatalog(arr) {
    const query = format('INSERT INTO catalog (id,name,mass_g, qty) VALUES %L', arr);
    // @ts-ignore
    database_1.default.query(query);
}
exports.insertCatalog = insertCatalog;
//# sourceMappingURL=catalog.js.map