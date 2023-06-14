// const mysql = require('mysql2');
const pg = require('pg');
require('dotenv').config();

//Todo Mario
class Conexion {

    constructor() {
        // mysql
        // this.config = {
        //     host: process.env.DB_HOST,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME,
        //     connectionLimit: process.env.DB_MAXCONNECTIONS,
        //     port: process.env.DB_PORT,
        // };

        //postgre
        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            max: process.env.DB_MAXCONNECTIONS,
            port: process.env.DB_PORT,

        }

        this.pool = new pg.Pool(this.config);
    }

    query = (sql, values) => {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        reject(err);
                    }
                    resolve(rows.rows);
                }
            });
        });
    }
}


const conexion = new Conexion();

module.exports = conexion;


pool.query('INSERT INTO your_table (column1, column2) VALUES ($1, $2)', columnValues, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return;
    }
  
    // Process the query result
    console.log('Rows inserted:', result.rowCount);
  
    // Release the client back to the pool
    pool.release();
  
    // Do other tasks or close the pool when you're done
  });