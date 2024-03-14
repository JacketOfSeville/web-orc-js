require("dotenv").config();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,

    connectionlimit: 5
});


async function query(select,from,where,order) {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connection estabilished');
        const result = await conn.query(`
            SELECT 
                ${select} 
            FROM 
                ${from} 
            WHERE 
                ${where}
            ORDER BY
                ${order}`);
        console.log(result); 
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            return conn.end();
        }
    }
}

query('*','engenharia_orcamento','id is not null','numero desc');

