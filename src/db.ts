const mongoose = require("mongoose");
require("dotenv").config();

export const DB = () => {
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