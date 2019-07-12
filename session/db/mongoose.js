const mongoose = require("mongoose");
// const tableDB = "test"

mongoose.connect(`mongodb+srv://danielapps:danielapps@cluster0-mpguq.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser:true,
        useCreateIndex:true
    }, (err,resp) => {
       if(err) throw err;
       if(mongoose.connection.readyState === 2){
       console.log("DB se esta conectando");
       }
       console.log("connection - Online");
    });