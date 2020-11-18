"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controller/index");
// Creating an instance of a router 
const router = express_1.default.Router();
/**
 * Primary app routes.
 */
router.post('/init_catalog', index_1.initCatalogController.initCatalog);
router.post('/process_order', index_1.processOrderController.checkOrder, index_1.processOrderController.checkStock, index_1.processOrderController.processOrder);
router.post('/restock_order', index_1.processRestockController.processRestock);
exports.default = router;
//# sourceMappingURL=index.js.map