const { Router } = require("express")
const router = Router();
const taskMiddeware = require("../middleware/taskMiddleware")
const authMiddleware = require("../middleware/authMiddleware");
const { getTask, getTasks, createTask, deleteTask, updateTask } = require("../controller/taskController");

router.get("/", authMiddleware, async (req, res) => { //Get all tasks
    const userId = req.user.userId; //Get user id
    const tasks = await getTasks(userId); //Get tasks
    if (!tasks.success) { //If tasks not found
        return res.status(400).json({ "error": tasks.error }) //Return error
    }
    res.status(200).json(tasks.tasks); //Return tasks
})

router.get("/:taskId", authMiddleware, async (req, res) => { //Get single task
    const userId = req.user.userId; //Get user id
    const taskId = req.params.taskId; //Get task id
    const task = await getTask(userId, taskId); //Get task
    if (!task.success) { //If task not found
        return res.status(400).json({ "error": task.error }) //Return error
    }
    res.status(200).json(task.task) //Return task
})

router.post("/", authMiddleware, taskMiddeware, async (req, res) => { //Create task
    const title = req.body.title; //Get title
    const description = req.body.description; //Get description
    const priority = req.body.priority; //Get priority
    const deadLine = req.body.deadLine; //Get deadline
    const subtasks = req.body.subtasks; //Get subtasks
    const userId = req.user.userId; //Get user id

    const newTask = await createTask({ title, description, priority, subtasks, deadLine, userId }); //Create task
    if (!newTask.success) { //If task not created
        return res.status(400).json({ error: "task creation failed!" }) //Return error
    }
    res.status(201).json(newTask.task) //Return task
})

router.put("/:taskId", authMiddleware, taskMiddeware, async (req, res) => { //Update task
    const taskId = req.params.taskId; //Get task id
    const title = req.body.title; //Get title
    const description = req.body.description; //Get description
    const priority = req.body.priority; //Get priority
    const deadLine = req.body.deadLine; //Get deadline
    const subtasks = req.body.subtasks; //Get subtasks
    const userId = req.user.userId; //Get user id

    const newTask = await updateTask(taskId,{ title, description, priority, subtasks, deadLine, userId }); //Update task
    if (!newTask.success) { //If task not updated
        return res.status(400).json({ error: "task creation failed!" }) //Return error
    }
    res.status(201).json(newTask.task) //Return task
})

router.delete("/:taskId", authMiddleware, async (req, res) => { //Delete task
    const taskId = req.params.taskId; //Get task id
    const deletedTask = await deleteTask(taskId); //Delete task
    if (!deletedTask.success) { //If task not deleted
        return res.status(400).json({ error: deletedTask.error }) //Return error
    }
    res.status(200).json(deletedTask.deletedTask) //Return task
})

module.exports = router
