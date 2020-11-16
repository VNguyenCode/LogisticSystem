import { shipPackage } from './ship-package.js'
import { DBProduct, DBStock } from '../db-models/index.js';
import db from '../config/database.js'
import pgf from 'pg-format'
const format = pgf

// export function restock(req, res) {

//     // updated inventory
//     // declare pendingOrders variable and set equal to quered result of pending orders
//     // iterate pendingOrders
//     // processOrder(pending)
//     // res.locals = pending orders
//     // next()
// }

export function requestedArray(order_id, product_id, req_quantity) {
    return [order_id, product_id, req_quantity, 0]
}

export function checkOrder(req, res, next) {

    const { order_id, requested } = req.body

    const params = [order_id]
    let order = [];

    db.query('SELECT * FROM orders where id = $1', params)
        .then((result) => {
            if (result.rows.length > 0) {
                res.locals.order = result.rows
                return next()
            } else {
                for (let i = 0; i < requested.length; i++) {
                    order.push(requestedArray(order_id, requested[i].product_id, requested[i].quantity, 0))
                }
                const query = format('INSERT INTO orders (id,product_id,requested_quantity, fulfilled_quantity) VALUES %L RETURNING *', order)
                db.query(query)
                    .then((result) => {
                        res.locals.order = result.rows
                        return next()
                    })
            }
        })
}

export async function checkStock(req, res, next) {

    const { order_id, requested } = req.body

    let arrayId = [];
    for (let i = 0; i < requested.length; i++) {
        arrayId.push(requested[i].product_id)
    }

    let sql = format('SELECT * FROM catalog where id in (%L)', arrayId)

    db.query(sql)
        .then((result) => {
            res.locals.stock = result.rows
            return next()
        })

}

export function processOrder(req, res, next) {

    const { order_id, requested } = req.body

    // let packageWeight = 0;
    let packageWeight = 0;

    // let curShipment = 1 || Max( query for shipment idNumbers)
    let currentShipmentId = 1;

    // declare inventoryObj set equal to query of current inventoryDB (of products from new or pending order) [{productid=1, quantity}, ]
    //How much inventory of stock do I have of product_id 0 and product_id 10
    let inventoryObj = res.locals.stock

    //if i process order
    //snapshot of current inventory
    // everytime we restock - we need to figure out what is remaining in the order fulfill a pending order
    //we know we shipped, snapshot of outstanding of any order
    // we just iterate through the order, quantities
    // we keep track exactly - we are taking away from the inventory, adding to the fulfilled 
    // update DB, update inventory, update shipment, we update status of our order 


    // getting an object = with current inventory but of the produts in the pending or new order) 

    // if order status is pending
    // query for shipments
    // subtract product quantities that we shipped out from inventoryObj

    // ------------
    // iterate orderObj
    //{0:2} - 5 would be outstandin fulfilled quantity for that order 
    // declare fulfilled variable set to zero

    // while loop (fulfilled <= product order quantity && inventory >= 0)
    // if adding another unit makes package weight > 1800
    // increment curShipment
    // set packageWeight to zero

    // else if 
    // decrement inventoryObj quantity
    // increment fulfilled
    // adjust packageWeight
    // update product quantity in inventoryDB with inventoryObj
    // add shipment record with fulfilled

    // shipment table
    // id=2 product=tylenol qtn = 3 orderId = 2
    // id=2 product=ibuforen qtn = 3 orderId = 2
    // id=2 product=honey qtn = 3 orderId = 2
    // id=3 product=water qtn = 2 orderId = 2
    // id=3 product=juice qtn = 3 orderId = 2

    // -----------


    // iterate order
    // if quantity !== zero 
    // update order status to pending in Order Database
    // return
    // update order status to complete in Order Database

}