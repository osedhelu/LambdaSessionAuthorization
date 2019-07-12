const bcrypt = require("bcrypt")

const passwordHasher = (password)=>{
	return bcrypt.hash(user.password, 8);
}
module.exports = {passwordHasher};