const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

//     user.tokens = user.tokens.concat({ token })
//     await user.save()

//     return token
// }

// userSchema.statics.findByCredentials = async (user, password) => {
//     console.log(user);
//     const users = await User.findOne({ user })

//     if (!user) {
//         throw new Error('users Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, users.password)

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return users
// }

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
 const User = mongoose.model("users", userSchema     );
module.exports = {User}