const User = require("../model/User")
const {userValidator} = require("../utils/validation")

//signup middleware
const signupMiddleware = async(req,res,next)=>{
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const isValidInput = userValidator({firstName,lastName,email,password}); //validating
    if(!isValidInput.success){ //If input is not valid
        const error = new Error("Invalid input"); //Create error 
        error.statusCode = 411; //Set status code
        error.message = isValidInput.error.issues.map(issue => issue.message); //Set message
        return next(error); //Return error
    }

    const userExists = await User.findOne({email:email}); //Checking if user already exists
    if(userExists){ //If user already exists
        const error = new Error("User already exists"); //Create error
        error.statusCode = 400; //Set status code
        error.message = "user with email already exists! Please try to log in."; //Set message
        return next(error); //Return error
    }

    next(); //Pass the request to the next middleware
}

module.exports = signupMiddleware;
