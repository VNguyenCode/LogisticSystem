import db from '../config/database'
import pgf from 'pg-format'
const format = pgf

export function catalogArray(id, name, mass, qty) {
    return [id, name, mass, qty]
}

export function insertCatalog(arr) {
    const query = format('INSERT INTO catalog (id,name,mass_g, qty) VALUES %L', arr);
    // @ts-ignore
    db.query(query)
}


