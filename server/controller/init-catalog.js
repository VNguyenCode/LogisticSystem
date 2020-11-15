import { DBProduct, DBStock } from '../db-models/index.js';

export async function initCatalog(req, res) {
    const { productInfo } = req.body;
    const catalogArray = [];
    const initStockArray = [];

    const results = await Promise.all(productInfo.map(async (item) => {
        // Insert product
       catalogArray.push(DBProduct.catalogArray(item.product_id, item.product_name, item.mass_g));
        // Insert 0 stock 
       initStockArray.push(DBProduct.initStockArray(item.product_id,0))
    }));

    DBProduct.insertCatalog(catalogArray)
    DBProduct.insertStock(initStockArray)

    res.send({ ok: true })

    // exit out by returning next 
}


