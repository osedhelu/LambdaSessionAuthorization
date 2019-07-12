
const {validateNewUser} = require('./Validator')
const {saveUser,loginUser} = require('../data/SessionData')
const {passwordHasher} = require('./Hasher')


// const createUser = async (user)=>{
//    const validatedUser =  await  validateNewUser(user);
//   console.log('creating user...createfunction', validatedUser);

// const respSave = await saveUser(validatedUser) ;
//   return respSave
  
// }

const createUser = (user)=>{
   return validateNewUser(user)
   .then((validatedUser) => saveUser(validatedUser));
}
module.exports = {
    createUser
}

