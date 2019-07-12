// const USER_COLLECTION = 'users'
const mongoose = require("mongoose")
require("../db/mongoose.js");

// const token = mongoose.Scha
const saveUser = (user)=>{
	return user.save()
}

module.exports = {saveUser}