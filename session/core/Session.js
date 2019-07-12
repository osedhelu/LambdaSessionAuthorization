
const {validateNewUser} = require('./Validator')
const {saveUser, authenticateCredentials} = require('../data/SessionData')
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

const customLogin = async (user, password)=>{
    return authenticateCredentials(user, password);

}
module.exports = {
    createUser, customLogin
}

