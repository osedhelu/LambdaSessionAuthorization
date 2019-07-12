//arn:aws:execute-api:us-east-2:114287217847:5cqm52yqai/ESTestInvoke-stage/GET/

const arnList = {'arn:aws:execute-api:us-east-2:114287217847:5cqm52yqai/Prod/POST/session/signup':['admin','super'], 'arn:aws:execute-api:us-east-2:114287217847:5cqm52yqai/Prod/GET/session/signup':['admin']}

function generateAuthResponse (principalId, effect, methodArn, userId) {
  // If you need to provide additional information to your integration
  // endpoint (e.g. your Lambda Function), you can add it to `context`
  const context = {
    'userId': userId
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
    const arnValue = arnList[methodArn];

    var i, len, text;
    for(i = 0, len = arnValue.length, text = ""; i < len; i++){
        text = arnValue[i]
        console.log(text);
        if(text === rol){
          return true
      }
  }



  return false;

}
  module.exports = {
    generateAuthResponse,
    userHasPermission
    
  }