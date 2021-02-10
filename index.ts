import { MongoDB, SQLDB } from "./src/db";
import { migrate, init } from "./src/migrator";
import { Role, User } from "./src/model/tables";

function stringRange(str: any, min: number, max: number): string | null {
    if(!(str instanceof String))
        return null;
    if(str.length < min)
        return null;
    if(str.length > max)
        return null;
    return str as string;
}

function generateUnique(length: number): string {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function generatePassword(email: string, length: number) {
    let result = generateUnique(length);
    console.log(email, "=>", result);
    return result;
}

async function main() {
    await MongoDB();
    const sql = await SQLDB();

    init(sql);
    await migrate(Role, "role", {
        "role_id": "legacy_id"
    });

    await migrate(User, "person", {
        "person_id": "legacy_id",
        "name": "firstName",
        "surname": "lastName",
        "role_id": "role"
    }, {
        "role": {schema: Role, key: "legacy_id"}
    }, {
        "email": (value, row) => stringRange(value, 6, 255) || ("no-email@" + generateUnique(20)),
        "password": (value, row) => value || generatePassword(row['email'], 20),
        "username": (value, row) => value || (row['firstName'] + row['lastName']),
        "ssn": (value, row) => value || ""
    });
}

main();