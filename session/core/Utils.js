const convertToResponse=(status,value)=>{
   return  {
      'statusCode': status,
      'body': JSON.stringify({
        OK: value
       })
               
  }
}
const convertToError = (errCode,err)=>{
    return  {
          'statusCode': errCode,
          'body': JSON.stringify({
            messageDeError: err.toString()
           })
               
    }
}


module.exports = {convertToResponse, convertToError}
