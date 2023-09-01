const mysql = require("mysql2")

const dotenv = require("dotenv").config()


console.log(process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE);
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: "3306",
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}).promise()


pool.getConnection((err,connection) =>{
    if(err){throw new Error(err)}
    console.log("DB connected successful: "+ connection.threadId);
})
module.exports = pool 