const {verifyToken} = require("../controller/userController")

//auth middleware
const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization; //Get token 

    if(!token){ //If no token is provided
        return res.status(401).json({error:"no token provided!"}) //Return error
    }

    const isValidToken = verifyToken(token); //Verify token
    req.user = isValidToken; //Store user in request
    
    if(!isValidToken){ //If token is not valid
        return res.status(401).json({error:"invalid token"}) //Return error
    }
    next(); //Pass the request to the next middleware
}
module.exports = authMiddleware;
