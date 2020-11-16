import db from '../config/database.js'
import pgf from 'pg-format'
const format = pgf

export function catalogArray(id, name, mass) {
    return [id, name, mass,0]
}

export function insertCatalog(arr) {
    const query = format('INSERT INTO catalog (id,name,mass_g, qty) VALUES %L', arr)
    db.query(query)
}


