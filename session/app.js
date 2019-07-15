const jwt = require("jsonwebtoken")
require("./db/mongoose");
const {User} = require("./data/UserSchema")

const {convertToResponse,convertToError} = require("./core/Utils")
const {createUser, customLogin} = require("./core/Session")



exports.handler = async (event, context) => {
  const userData = JSON.parse(event.body);
 try {
      const saveUsers = await createUser(userData)
console.log(saveUsers);
    return convertToResponse(200, saveUsers)
    
    } catch (err) {
      console.log("FINAL LOG ERROR: ", err);
      return convertToError(501, err)
    }

}
exports.login = async (event, context) => {


  try {
    const loginParams = JSON.parse(event.body);
    const loggedUser = await customLogin(loginParams.user, loginParams.password);
    return convertToResponse(200,loggedUser);

  }catch(err){
    return convertToError(501, err);
  }
}

