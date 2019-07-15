require("../db/mongoose.js");
// const USER_COLLECTION = 'users'
const bcrypt = require("bcrypt")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {User} = require("./UserSchema")


// const token = mongoose.Scha
const saveUser = (user)=>{
	return user.save()
}

const authenticateCredentials = async(user, password) =>{
		return findByCredentials(user, password)
		.then(async(authUser) => {
			console.log('VA A GENERAR TOKEN');
			let token = generateAuthToken({_id:authUser._id.toString(), rol:authUser.rol})
			authUser.tokens = authUser.tokens.concat({ token })
			await authUser.save()
			console.log('LLEGO AQUI');
			return {
				user: authUser.user,
				userId:authUser._id.toString(),
				rol: authUser.rol,
				token: token
			}
		})
	}
const generateAuthToken = (payload) => {
	console.log('MY KEY IS: ',process.env.PRIVATE_KEY );
    const token = jwt.sign(payload, process.env.PRIVATE_KEY)
    console.log(token);
    return token
}

const findByCredentials = async (user, password) => {
    return User.findOne({ user })
    .then(async(authUser) =>{
    	let success = await bcrypt.compare(password, authUser.password)
    	if (!success) {
    		throw new Error('Invalid user credentials');
    	}
    	return authUser
    })
  
}

module.exports = {saveUser,authenticateCredentials}