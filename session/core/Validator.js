const {User} = require('../data/UserSchema')

const validateNewUser =  async(user)=>{

	console.log(user);
let users = new User({
	user: user.user,
	password: user.password,
	rol: user.rol
})
return users


}



module.exports = {validateNewUser};



	// return new Promise((resolve, reject) => {



	// 	// try {

	// 	// 	console.log('EXECUTING PROMISE ', user);
	// 	// if(!validator.isAlpha(user.user)){
	// 	// 	console.log('REJECT FIRST NAME');
	// 	// 	reject(new Error('invalid firstname'));
	// 	// 	return;
	// 	// }
	// 	// if (!validator.isAlpha(user.password)){
	// 	// 	console.log('REJECTED PASSWORD');
	// 	// 	reject(new Error('invalid password'));
	// 	// 	return;
	// 	// }
	// 	// console.log('USER VALIDATED');
	// 	// resolve(user);
		 
	// 	// } catch (err) {
	// 	// 	console.log('ERROR: ', err);
	// 	// 	reject(err);
		
	// 	// }
		
	// })