const {taskValidator} = require("../utils/validation")

//task middleware
const taskMiddeware = (req,res,next) =>{
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const subtasks = req.body.subtasks;
    const deadLine = req.body.deadLine;
    const userId = req.user.userId;
    const isValidInput = taskValidator({title,description,priority,subtasks,deadLine,userId}); //validating
    if(!isValidInput.success){ //If input is not valid
        const error = new Error("Invalid input"); //Create error
        error.statusCode = 411; //Set status code
        error.message = isValidInput.error.issues.map(issue => issue.message); //Set message
        return next(error); //Return error
    }
    next(); //Pass the request to the next middleware
}

module.exports = taskMiddeware;
