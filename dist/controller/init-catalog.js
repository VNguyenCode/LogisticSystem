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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCatalog = void 0;
const index_1 = require("../db-models/index");
/**
 * Initialize the catalog table with JSON data of product_info
 */
function initCatalog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Assign req.body to a variable called req.body
        const catalogItems = req.body;
        //catalogArray = to store formatted JSON data to push into DB
        const catalogArray = [];
        yield Promise.all(catalogItems.map((item) => __awaiter(this, void 0, void 0, function* () {
            //Iterate through the JSON request and format it to be written into DB
            catalogArray.push(index_1.DBCatalog.catalogArray(item.product_id, item.product_name, item.mass_g, 0));
        })));
        //Function that makes a  POST request to DB to save the catalog 
        index_1.DBCatalog.insertCatalog(catalogArray);
        res.send({ ok: true });
    });
}
exports.initCatalog = initCatalog;
//# sourceMappingURL=init-catalog.js.map