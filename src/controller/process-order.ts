import { requestedArray } from '../db-models/orders'
import db from '../config/database'
import pgf from 'pg-format'
const format = pgf

/**
 * checkOrder writes to the orders table of the details of the order, or extract the pending order if it already exists
 */
export function checkOrder(req, res, next) {

    const { order_id, requested } = req.body
    const params = [order_id]
    let order = [];

    //If incoming order already exists in DB, just save it in order property of res.locals and pass it to the next middleware 
    db.query('SELECT id,product_id,(requested_quantity-fulfilled_quantity) AS outstanding_qty FROM orders where id = $1', params,)
        .then((result) => {
            if (result.rows.length > 0) {
                res.locals.order = result.rows
                return next()
            } else {
                for (let i = 0; i < requested.length; i++) {
                    order.push(requestedArray(order_id, requested[i].product_id, requested[i].quantity, 0))
                }
                //If incoming order doesn't exist then save it into the DB, but also return it and save to res.locals and pass it to the next middleware
                const query = format('INSERT INTO orders (id,product_id,requested_quantity, fulfilled_quantity) VALUES %L RETURNING id,product_id,(requested_quantity-fulfilled_quantity) AS outstanding_qty', order)
                // @ts-ignore
                db.query(query)
                    .then((result) => {
                        res.locals.order = result.rows
                        return next()
                    })
            }
        })
}

/**
 * Main Logic where we do the processing of the order with the 1.8 kg per shipment constraint 
 */
export async function processOrder(req, res, next) {

    //Declaring the attributes we need to process order and assigning them in respective variables
    const { order_id } = req.body
    const stockObj = res.locals.stock
    const orderObj = res.locals.order

    let shipmentWeight = 0;
    let shipment = {};

    /**
    * Loop through the order
    * Handle 1 quantity of each product at a time
    * Check to see if the product has any outstanding quantity that we need to fulfill 
    * Check to see if we stock 
    *   If we have oustanding orders to fill and we have stock of the product
    *        If adding the item + shipmentWeight < 1800g 
    *          then we add our item to the shipment
    *          add its weight to the package
    *          and move to the next outstanding quantity of the product
    *        If adding the item > 1800g 
    *          then we ship the current package that we created 
    *          we reset the packageWeight
    *          we create a new shipment
    * 
    * Once we finished iterating through the quantity of each product order 
    *    we ship out anything remaining the current shipment 
    *   
    */
    for (let i = 0; i < orderObj.length; i++) {
        let fulfilled = 0;
        if (orderObj[i].outstanding_qty !== 0) {
            for (let j = 0; j < orderObj[i].outstanding_qty; j++) {
                let stockProduct = stockObj.find(x => x.id == orderObj[i].product_id);
                while (fulfilled < orderObj[i].outstanding_qty && stockProduct.qty > 0) {
                    if (Number(stockProduct.mass_g) + shipmentWeight > 1800) {
                        await shipApi(shipment, order_id)
                        shipment = {};
                        shipmentWeight = 0
                    } else {
                        stockProduct.qty = stockProduct.qty - 1
                        fulfilled = fulfilled + 1
                        shipmentWeight += Number(stockProduct.mass_g)
                        let string = orderObj[i].product_id.toString()
                        if (!shipment[string]) {
                            shipment[string] = 1
                        } else {
                            shipment[string]++
                        }
                    }
                }
            }
        }
    }
    shipApi(shipment, order_id)
    return next();
}


/**
 * Helper: Pulls the inventory that we have of each product in the incoming order 
 */
export async function checkStock(req, res, next) {

    const { requested } = req.body
    let arrayId = [];
    for (let i = 0; i < requested.length; i++) {
        arrayId.push(requested[i].product_id)
    }
    let sql = format('SELECT * FROM catalog where id in (%L)', arrayId)
    // @ts-ignore
    db.query(sql)
        .then((result) => {
            res.locals.stock = result.rows
            return next()
        })
}

/**
 * Helper: shipAPI will post into the shipments table, also updates the quantity that we ship in orders table 
 */
async function shipApi(shipment, order_id) {
    return new Promise((resolve) => {
        for (const product_id in shipment) {
            let params = [product_id, order_id, shipment[product_id]]
            db.query('INSERT INTO shipments(product_id, order_id, qty_fulfilled) VALUES ($1, $2, $3)', params)
                .then((result) => {
                    let innerparams = [shipment[product_id], order_id, product_id]
                    db.query('UPDATE orders SET fulfilled_quantity = fulfilled_quantity + $1 WHERE id = $2 AND product_id = $3', innerparams)
                        .then((result) => {
                            let catalogparams = [shipment[product_id], product_id]
                            db.query('UPDATE catalog SET qty = qty - $1 where id = $2', catalogparams)
                        })
                })
        }
        //Before resolving this function, this is where we would invoke the stub API with our shipment 
        resolve()
    })
}