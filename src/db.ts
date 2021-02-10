import mongoose = require("mongoose");
import mysql = require('mysql');

require("dotenv").config();

export const MongoDB = () => {
    let callback;
    let promise = new Promise((resolve, reject) => {
        callback = () => {resolve(null)};
    })
    mongoose.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.connection.once("open", callback);
    return promise;
}

export const SQLDB = () => {
    let callback;
    let promise = new Promise<mysql.Connection>((resolve, reject) => {
        callback = () => {resolve(connection)};
    })

    const connection = mysql.createConnection({
        host: process.env.SQL_HOST || "localhost",
        user: process.env.SQL_USER || "root",
        password: process.env.SQL_PASSWORD || "",
        database: process.env.SQL_DB 
    });
      
    connection.connect(null, callback);
    return promise;
}