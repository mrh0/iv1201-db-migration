import mongoose = require("mongoose");
import mysql = require('mysql');
import util = require('util');

let query: (query: string) => Promise<object[]>;

export type DefFunc = (current: any, row: object) => any;

// Make Query function use promises instead of callback.
export function init(sql: mysql.Connection) {
    query = util.promisify<string | mysql.QueryOptions, []>(sql.query).bind(sql);
};

export async function migrate(schema: mongoose.Model<mongoose.Document<any>>, table: string, map?: ({[key:string]:string}), refs?: {[key:string]:{schema: mongoose.Model<mongoose.Document<any>>, key: string}}, defs?: {[key:string]:DefFunc}) {
    map = map || {};
    refs = refs || {};
    defs = defs || {};
    let result = await query('SELECT * FROM ' + table);
    let entries = [];
    for(let row of result) {
        let entry = {};
        for(let col in row) {
            let key = map[col] || col;
            let value = row[col];

            let r = refs[key];
            if(r) {
                let find = {};
                find[r.key] = value;
                value = await r.schema.findOne({...find}, '_id').exec();
            }
            entry[key] = value;
        }
        for(let key in defs) 
            entry[key] = defs[key](entry[key], entry);
        entries.push(entry);
    }
    for(let entry of entries) {
        try {
            await new schema({...entry}).save();
        }
        catch(e) {
            console.error("Error in row: ", entry, e);
        }
    }

    console.log("Finished migration of '" + table + "'.");
}