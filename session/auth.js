const jwt = require("jsonwebtoken");

// const nuevo = process.env.URLEXECUTE
// console.log(nuevo);
const arnList = {'arn:aws:execute-api:us-east-2:114287217847:1glnmvn2g7/staging/POST/session/signup' : 'super'}
console.log(arnList);
exports.auth = async function (event) {
  const token = event.authorizationToken
  const methodArn = event.methodArn

  console.log(methodArn);

return jwt.verify(token, process.env.PRIVATE_KEY, (err, resp)=>{ 
  console.log("esto es jwt", resp);
    if(err){
      return generateAuthResponse('user', 'Deny', methodArn)
    }
    const hasPermission = userHasPermission(methodArn, resp.rol);
    console.log("hasPermiso", hasPermission);
    return generateAuthResponse(resp._id, hasPermission, methodArn)
  });




}

function generateAuthResponse (principalId, effect, methodArn) {
  // If you need to provide additional information to your integration
  // endpoint (e.g. your Lambda Function), you can add it to `context`
  console.log(principalId, effect, methodArn);
  const context = {
    'que hacer': 'podemos mandar unos Permisos lo que sea'
  }
  const policyDocument = generatePolicyDocument(effect, methodArn)

  return {
    principalId,
    context,
    policyDocument
  }
}

function generatePolicyDocument (effect, methodArn) {
  if (!effect || !methodArn) return null

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: methodArn
    }]
  }

  return policyDocument
}

const userHasPermission = (methodArn, rol)=>{
    const arnValue = arnList[methodArn]
  console.log("esto", arnValue === rol);
    if(arnValue === rol){
      return 'Allow'  
    }else{
      return 'Deny'
    }

}
