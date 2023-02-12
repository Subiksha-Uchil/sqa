const mongoose = require("mongoose");
//creating a database


const connectDatabase = () => {
    
    mongoose.connect('mongodb://localhost:27017/sqa', {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
    }).then((data) => {
    console.log("connection sucess!! " + data.connection.host);
    }).catch((error) => {
        console.log(error);
    })
    mongoose.set('strictQuery', true);
}


module.exports = connectDatabase
