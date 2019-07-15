const mongoose = require("mongoose");
// const tableDB = "test"
var conection 
const env = process.env;
if(env.STAGE_ENV == 'staging'){
	conection = env.STAGING_DATABASE_URL
}if(env.STAGE_ENV == 'prod'){
	conection ==  env.PROD_DATABASE_URL
}
console.log(conection);

mongoose.connect(conection, {
        useNewUrlParser:true,
        useCreateIndex:true
    }, (err,resp) => {
       if(err) throw err;
       if(mongoose.connection.readyState === 2){
       console.log("DB se esta conectando");
       }
       console.log("connection - Online");
    });

