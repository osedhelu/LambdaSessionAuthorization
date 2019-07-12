const jwt = require("jsonwebtoken")
require("./db/mongoose");

const {convertToResponse,convertToError} = require("./core/Utils")
const {generateAuthResponse,userHasPermission } = require("./lambda/auth")
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





  // context.callbackWaitsForEmptyEventLoop = false

  // createUser(userData).then((success)=>{
  //   callback(null, convertToResponse(201))

  // })catch((err) => {
  //   callback(convertToError(400,err),null);
  // })
}


exports.auth = async function (event) {
  const token = event.authorizationToken
  const methodArn = event.methodArn
  const decoded = jwt.verify(token, "lamodaesteneruntokenentusession")

  try {
    const user = await User.findOne({ _id: decoded._id})
    const hasPermission = userHasPermission(methodArn,user.rol);
    const allowed = hasPermission ? 'Allow' : 'Deny'

    return  generateAuthResponse(user.rol, allowed, methodArn, user._id)

  } catch (err) {
    return convertToError(err);
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

