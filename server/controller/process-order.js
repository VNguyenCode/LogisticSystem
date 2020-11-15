import { shipPackage } from './ship-package.js'
import { DBProduct, DBStock } from '../db-models/index.js';


export function processOrder(req, res) {

    const { order_id, requested } = req.body;

    //[{"product_id": 0, "quantity": 30}, {"product_id": 1, "quantity": 25}]

    /*{"order_id": 123, 
    "requested": [
    {"product_id": 0, "quantity": 2}, 
    {"product_id": 10, "quantity": 4}]} */

    //let packageWeight = 0; 
    //map through req.body.requested 
        //for loop quantity length 
        //get product quantity from DB
        //if(product_quantity > 0 && product_weight + packageWeight <1.8)
            // packageWeight += product weight


    //sendPackage(); 
    

    // await Promise.all(requested.map(async (item) => {



        /** 
         * function shipPackage
         * 
         * 1. Iterate each item
         * - Get current stock.
         * - Calculate full packages 
         * - Calculate remaining packages
         * 
         * - Get current stock.
         * 
         * */

        // Get current stock.

        // 
    // }));
    
    
    //declare weight of the current package in a variable set to 0 


    //iterate through the product list for the order
    // for each product
        // 
        


        // - Check stock.

        // - Max quantity in package (weight limit)
        // - # of packages 
        // -
    console.log("processOrder ->", {req, res});
    res.send({bitch: true});


}