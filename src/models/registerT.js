const express =  require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema( {
    firstname :{
        type :String,
        required: true
    },
    lastname :{
        type :String,
        required: true
    },
    email :{
        type :String,
        required: true,
        unique :true
    },

    password :{
        type :String,
        required: true
    },
    cpassword :{
        type :String,
        required: true
    }
});

//convert password into hash using bcrypt 
userSchema.pre("save", async function(next){

     if(this.isModified("password")){   
                            
       this.password = await bcrypt.hash(this.password,10)
       this.cpassword = await bcrypt.hash(this.password,10);
       
     }
     next(); 
})




const Register = new mongoose.model("Register",userSchema);

module.exports = Register;