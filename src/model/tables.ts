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
        }
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
            min: 2,
            max: 50,
        },
        lastName: { // surname
            type: String,
            required: true,
            min: 2,
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
        reset_password: { // -
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
));

export const Availability = mongoose.model("Availability", new mongoose.Schema( // availability
    {
        legacy_id: { // availability_id
            type: Number,
            required: false,
        },
        person_id: { // person_id
            type: mongoose.ObjectId,
            required: true,
        },
        from_date: { // from_date
            type: Date,
            default: Date.now,
        },
        to_date: { // to_date
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
));

export const Competence = mongoose.model("Competence", new mongoose.Schema( // competence
    {
        legacy_id: { // competence_id
            type: Number,
            required: false,
        },
        name: { // name
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
));

export const Profile = mongoose.model("Profile", new mongoose.Schema( // competence_profile
    {
        legacy_id: { // competence_profile_id
            type: Number,
            required: false,
        },
        person_id: { // person_id
            type: mongoose.ObjectId,
            required: true,
        },
        competence_id: { // competence_id
            type: mongoose.ObjectId,
            required: true,
        },
        years_of_experience: { // years_of_experience
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
));