const mongoose = require("mongoose");

export const Role = mongoose.model("Role", new mongoose.Schema( // role
    {
        name: { // name
            type: String,
            required: true,
        },
        legacy_id: { // role_id
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
));

export const User = mongoose.model("User", new mongoose.Schema( // person
    {
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
            type: Number,
            required: true,
        },
        legacy_id: { // person_id
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
));