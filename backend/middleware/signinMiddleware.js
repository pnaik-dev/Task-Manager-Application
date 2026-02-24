const User = require("../model/User");
const { signInValidator } = require("../utils/validation");

//signin middleware
const signinMiddleware = async (req, res, next) => {
  //Get email and password
  const { email, password } = req.body;
  //Validate input
  const isValidInput = signInValidator({ email, password });
  
  if (!isValidInput.success) { //If input is not valid
    const error = new Error("Invalid input"); //Create error
    error.statusCode = 411; //Set status code
    error.message = isValidInput.error.issues.map((issue) => issue.message);//Set message
    return next(error); //Return error
  }

  try {
    const userExists = await User.findOne({ email }); //Find user
    if (!userExists) { //If user not found
      const error = new Error("User not found"); //Create error
      error.statusCode = 404; //Set status code
      error.message = "user with this email is not found!"; //Set message
      return next(error); //Return error
    }
    req.user = userExists; //Store user in request
    next(); //Pass the request to the next middleware
  } catch (error) {
    next(error); //Return error
  }
};

module.exports = signinMiddleware;
