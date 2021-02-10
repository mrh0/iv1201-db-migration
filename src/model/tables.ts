const mongoose = require("mongoose");

export const Role = mongoose.model("Role", new mongoose.Schema( // role
    {
        legacy_id: { // role_id
            type: Number,
            required: false,
        },
        name: { // name
            type: String,
            required: true,
            unique: true
        },
    },
    { timestamps: true }
));

export const User = mongoose.model("User", new mongoose.Schema( // person
    {
        legacy_id: { // person_id
            type: Number,
            required: false,
        },
        firstName: { // name
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        lastName: { // surname
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email: { // email
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 255,
        },
        ssn: { // ssn
            type: String,
        },
        dateOfBirth: { // -
            type: Date,
            default: Date.now,
        },
        username: { // username
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        password: { // password
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        role: { // role_id
            type: mongoose.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
));