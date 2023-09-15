const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test_regis")
.then(()=>{
    console.log("connection success");
}).catch( (e)=>{
    console.log("No connection");
})