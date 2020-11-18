"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const PG_URI = "postgres://ekwmfpwq:cnGh7BO3pHq6XaPX_Zh1b5yyUlglaNV3@raja.db.elephantsql.com:5432/ekwmfpwq";
const pool = new Pool({
    connectionString: PG_URI,
});
exports.default = {
    // @ts-ignore
    query: (text, params) => pool.query(text, params),
};
//# sourceMappingURL=database.js.map