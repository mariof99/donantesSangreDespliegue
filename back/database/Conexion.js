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