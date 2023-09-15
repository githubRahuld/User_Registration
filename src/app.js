const express = require("express");
const hbs = require("hbs");
const path = require("path")
const bcrypt = require("bcryptjs")
const app = express();


require("./db/conn")
const Register = require("./models/registerT");

const port = process.env.PORT || 3000;
 
const staticPath = path.join(__dirname,"../public") //step2
const templatesPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")



app.use(express.json()); //to get json data
app.use(express.urlencoded({extended:false})); //to get form data

app.set("view engine", "hbs"); //step 1
app.use(express.static(staticPath));  //step 3

//after making template folder set path
app.set("views", templatesPath);
hbs.registerPartials(partialsPath)

app.get("/" , (req,res) =>{
    res.render("index");
})
app.get("/register" , (req,res) =>{
    res.render("register");
})
app.get("/login" , (req,res) =>{
    res.render("login");
})

//create new user in our database
app.post("/register" , async(req,res) =>{
    try {
       
        const password = req.body.password;
        const cpassword = req.body.cpassword;



        if(password === cpassword){
    
            const registerEmployee = new Register({

                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password :password,
                cpassword : cpassword

            })

            console.log("sucess part is " + registerEmployee);

            //save the data on database
            const registered = await registerEmployee.save();
            console.log("the page part " + registered );
    
            res.status(201).render("index");

        }else{
            res.send("Password are not matching !");
        }


    } catch (error) {
        res.status(400).send(error);
        console.log("The error part page ");
    }
})

//login
app.post("/login", async (req,res) =>{
    
    try {
        const email = req.body.email;
        const password = req.body.password;
    
    
        const userDetails  =   await Register.findOne({email:email});
       
        //compare the hash and pass at he time of login
        const isMatch = await bcrypt.compare(password,userDetails.password);
        console.log(isMatch);
        console.log(userDetails.password);
        console.log(password);

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.status(400).send("Invalid Details");
        }


       
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
})


app.listen(port, ()=>{
    console.log(`connection setup at port ${port}`);
})