const zod = require("zod");

//task schema
const taskSchema = zod.object(
    {
        title:zod.string().min(3,"title should contain atleast 3 letters!"),
        description:zod.string().min(3,"description should contain atleast 3 letters!"),
        priority:zod.enum(["Low","Medium","High"]),
        userId:zod.string()
    }
)

//task validator
const taskValidator = ({title,description,priority,userId}) => taskSchema.safeParse({title,description,priority,userId});

//task update schema
const TaskUpdateSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    priority: zod.enum(["Low", "Medium", "High"]),
    subtasks: zod
      .array(
        zod.object({
          title: zod.string(),
          status: zod.enum(["Pending", "Completed"]),
        })
      ),
    deadLine: zod
      .string()
      .datetime({ offset: true }), // Zod validates ISO 8601 strings for dates
    userId: zod.string(), // Can add validation for ObjectId format if needed
  });

//update task validator
const updateTaskValidator = ({title,description,priority,subtasks,deadLine,userId}) => TaskUpdateSchema.safeParse({title,description,priority,subtasks,deadLine,userId});

//user schema
const userSchema = zod.object(
    {
        firstName:zod.string().min(2,"firstName should contain atleast 3 letters"),
        lastName:zod.string().min(2,"lastName should contain atleast 3 letters"),
        email:zod.string().email(),
        password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include an uppercase,a lowercase, a number, and a special character.")
    }
)

//sign in schema
const signInSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.")
})

//user validator
const userValidator = ({firstName,lastName,email,password}) => userSchema.safeParse({firstName,lastName,email,password})
//sign in validator
const signInValidator = ({email,password}) => signInSchema.safeParse({email,password});


module.exports = {
    taskValidator,
    userValidator,
    updateTaskValidator,
    signInValidator
}
