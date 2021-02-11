import { MongoDB, SQLDB } from "./src/db";
import { migrate, init } from "./src/migrator";
import { Role, User, Availability, Competence, Profile } from "./src/model/tables";

function stringRange(str: string, min: number, max: number): string | null {
    if(str == null)
        return null;
    if(str.length < min)
        return null;
    if(str.length > max)
        return null;
    return str;
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
    init(await SQLDB());

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
        "email": (value, row) => stringRange(value, 6, 255) || ((row['firstName'] + row['lastName']) as string).toLowerCase(),//("no-email@" + generateUnique(20)),
        "password": (value, row) => stringRange(value, 6, 1024) || generatePassword(row['email'], 20),
        "username": (value, row) => value || ((row['firstName'] + row['lastName']) as string).toLowerCase(),
        "ssn": (value, row) => value || ""
    });

    await migrate(Availability, "availability", {
        "availability_id": "legacy_id"
    }, {
        "person_id": {schema: User, key: "legacy_id"}
    });

    await migrate(Competence, "competence", {
        "competence_id": "legacy_id"
    });

    await migrate(Profile, "competence_profile", {
        "competence_profile_id": "legacy_id"
    }, {
        "person_id": {schema: User, key: "legacy_id"},
        "competence_id": {schema: Competence, key: "legacy_id"}
    });
}

main();