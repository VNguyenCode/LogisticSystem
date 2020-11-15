import pg from 'pg'
const { Pool } = pg

const PG_URI =
"postgres://ekwmfpwq:cnGh7BO3pHq6XaPX_Zh1b5yyUlglaNV3@raja.db.elephantsql.com:5432/ekwmfpwq";

const pool = new Pool({
  connectionString: PG_URI,
});

export default {
  query: (text, params, callback) => pool.query(text, params, callback),
};