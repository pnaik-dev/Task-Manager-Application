const mongoose = require("mongoose");
//task schema
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },
    subtasks:{
        type:[
                {
                    title:{
                        type:String,
                        required:true
                    },
                    status:{
                        type:String,
                        enum:["Pending","Completed"],
                        default:"Pending"
                    }
                }
        ],
        required:true
    }
    ,
    deadLine:{
        type:Date,
        default: ()=>{
            const now = new Date();
            now.setDate(now.getDate()+7);
            return now;
        }
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

//task model
const Task = new mongoose.model("Task",TaskSchema);

module.exports = Task;
