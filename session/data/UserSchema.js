const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const TABLE_USERS = "users"
const userShema = new mongoose.Schema({
    user: {
         type: String,
         unique: [true,"El usuario no puede Ser igual"],
         required: true,
         trim: true,
         lowercase: true
     },
     password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    rol:{
        type: String,
        required: true,

    },
    tokens:[{
        token: {
            type: String,
            required: true,

        },

    }]
}, { versionKey: false })  

userShema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


 const User = mongoose.model(TABLE_USERS, userShema );
module.exports = {User}