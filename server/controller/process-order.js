import { shipPackage } from './ship-package.js'
import { DBProduct, DBStock } from '../db-models/index.js';
import db from '../config/database.js'
import pgf from 'pg-format'
import e from 'express';
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

    //to check if an order is existing or not 
    db.query('SELECT id,product_id,(requested_quantity-fulfilled_quantity) AS outstanding_qty FROM orders where id = $1', params)
        .then((result) => {
            if (result.rows.length > 0) {
                res.locals.order = result.rows
                return next()
            } else {
                for (let i = 0; i < requested.length; i++) {
                    order.push(requestedArray(order_id, requested[i].product_id, requested[i].quantity, 0))
                }
                const query = format('INSERT INTO orders (id,product_id,requested_quantity, fulfilled_quantity) VALUES %L RETURNING id,product_id,(requested_quantity-fulfilled_quantity) AS outstanding_qty', order)
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

async function shipApi(shipment, order_id) {
    return new Promise((resolve) => {
        
        resolve()
    })
}


export async function processOrder(req, res, next) {

    const { order_id, requested } = req.body

    let stockObj = res.locals.stock

    console.log('stockObj', stockObj)
    console.log('orderData', res.locals.order)

    let packageWeight = 0;    
    let shipment = {};

    for (let i = 0; i < res.locals.order.length; i++) {

        let fulfilled = 0;

        if (res.locals.order[i].outstanding_qty !== 0) {

            for (let j = 0; j < res.locals.order[i].outstanding_qty; j++) {

                let stockProduct = stockObj.find(x => x.id == res.locals.order[i].product_id);

                while (fulfilled < res.locals.order[i].outstanding_qty && stockProduct.qty > 0) {

                    if (Number(stockProduct.mass_g) + packageWeight > 1800) {                
                        await shipApi(shipment,order_id)
                        shipment = {};
                        packageWeight = 0
                    } else {
                        stockProduct.qty = stockProduct.qty - 1
                        fulfilled = fulfilled + 1
                        packageWeight += Number(stockProduct.mass_g)
                        let string = res.locals.order[i].product_id.toString()
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
    await shipApi(shipment, order_id)
}


//shipment #1
    //{0:2} - 5 would be outstandin fulfilled quantity for that order
    // declare fulfilled variable set to zero

    // while loop (fulfilled <= product order quantity && inventory >= 0)
    // if adding another unit makes package weight > 1800
    // increment curShipment
    // set packageWeight to zero

    // else if 

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

