const Task = require("../model/Task")

//get task
const getTask = async(userId,taskId) =>{
    try{
        //find task
        const task = await Task.findOne({
            userId:userId,
            _id:taskId
        });
        //if task not found
        if(!task){
            //return error
            return {
                "success":fasle,
                 "error":"no task found"
            }
        }
        //return task
        return {
            "success":true,
            task:task
        };
    }
    catch(error){
        //return error
        return {
            "success":fasle,
            "error":"Something went wrong while fetching tasks! "+ error
        }
    }
}

//get tasks
const getTasks = async(userId) =>{
    try{
        //find task
        const tasks = await Task.find({userId:userId});
        //if tasks not found
        if(!tasks){
            //return error
            return {
                "success":fasle,
                 "error":"no tasks found"
            }
        }
        //return task
        return {
            "success":true,
            tasks:tasks
        };
    }
    catch(error){
        //return error
        return {
            "success":fasle,
            "error":"Something went wrong while fetching tasks! "+ error
        }
    }
}

//create task
const createTask = async({title,description,priority,subtasks,deadLine,userId}) =>{
    try{
        //create task
        const newTask = await Task.create({title,description,priority,subtasks,deadLine,userId});
        //return task
        return{
            "success":true,
            task:newTask
        }
    }
    catch(error){
        //return error
        return {
            "success":false,
            "error":"task creation failed!"+ error
        };
    }
}

//update task
const updateTask = async(taskId,updates) =>{
    try{
        //update task
        const updatedTask = await Task.findByIdAndUpdate(taskId,updates,{new:true})
        //return task
        return {
            "success":true,
            updateTask:updatedTask
        };
    }catch(error){
        //return error
        return {
            "success":false,
            "error":"failed to update the task! "+error
        };
    }
}

//delete task
const deleteTask = async(taskId) => {
    try{
        //delete task
        const deletedTask = await Task.findByIdAndDelete(taskId);
        //return task
        return {
            "success": true,
            deletedTask: deletedTask
        }
    }catch(error){
        //return error
        return {
            "success": fasle,
            "error": "failed to delete the task! "+err
        }
    }
}

//export
module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
