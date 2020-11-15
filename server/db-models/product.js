import db from '../config/database.js'
import pgf from 'pg-format'
const format = pgf

export function catalogArray(id, name, mass) {
    return [id, name, mass]
}

export function initStockArray(product_id, qty) {
    return [product_id,0]
}

export function insertCatalog(arr) {
    const query = format('INSERT INTO catalog (id,name,mass_g) VALUES %L', arr)
    db.query(query)
}

export function insertStock(arr) {
    const query = format('INSERT INTO stock (product_id,quantity) VALUES %L', arr)
    db.query(query)
}

