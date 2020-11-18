import express from 'express';
import { initCatalogController, processOrderController, processRestockController } from '../controller/index'


// Creating an instance of a router 
const router = express.Router();

/**
 * Primary app routes.
 */
router.post('/init_catalog',
  initCatalogController.initCatalog,
);

router.post('/process_order',
  processOrderController.checkOrder,
  processOrderController.checkStock,
  processOrderController.processOrder
);

router.post('/restock_order',
  processRestockController.processRestock);

export default router;