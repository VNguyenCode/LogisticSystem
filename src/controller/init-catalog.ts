import { DBCatalog } from '../db-models/index';
import { catalogType } from '../types/jsonData'

/**
 * Initialize the catalog table with JSON data of product_info 
 */
export async function initCatalog(req:catalogType, res, next) {


    //Assign req.body to a variable called req.body
    const catalogItems = req.body

    //catalogArray = to store formatted JSON data to push into DB
    const catalogArray = [];

    await Promise.all(catalogItems.map(async (item) => {
       //Iterate through the JSON request and format it to be written into DB
       catalogArray.push(DBCatalog.catalogArray(item.product_id, item.product_name, item.mass_g,0));    
    }));

    //Function that makes a  POST request to DB to save the catalog 
    DBCatalog.insertCatalog(catalogArray);
    res.send({ ok: true })
}


