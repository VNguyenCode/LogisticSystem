import { DBProduct, DBStock } from '../db-models/index.js';

export async function initCatalog(req, res) {
    const { productInfo } = req.body;
    const catalogArray = [];

    const results = await Promise.all(productInfo.map(async (item) => {
        // Insert product
       catalogArray.push(DBProduct.catalogArray(item.product_id, item.product_name, item.mass_g,0));
        
    }));

    DBProduct.insertCatalog(catalogArray)

    res.send({ ok: true })

    // exit out by returning next 
}


