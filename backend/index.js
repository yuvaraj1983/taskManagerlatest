const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task.route");
require("dotenv").config();

//const taskModel = require("./models/task.model");
//console.log(taskModel);

//const TaskService = require("./services/task.service")

// const TaskServiceInstance = new TaskService();
// console.log(
//     TaskServiceInstance.find,
//     TaskServiceInstance.create,
//     TaskServiceInstance.update,
//     TaskServiceInstance.delete
// )

// const {
//     getTasks,
//     createTask,
//     updateTask,
//     deleteTask,
//   } = require("./controllers/task.controller");
  
//   console.log(getTasks, createTask, updateTask, deleteTask);

const app = express();
const PORT = 8082;
//const DB_URI = "mongodb://127.0.0.1:27017/task-manager"
//const DB_URI = "mongodb+srv://yuvathegreat1211:vlmwIwjJh6zmNkhA@yuva-cluster.waaqy.mongodb.net/"
//const DB_URI = process.env.MONGODB_URL;
console.log("process",process.env.MONGODB_URL);
const DB_URI = process.env.MONGODB_URL;
mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch((error) => console.log("Error in connecting DB", error));

app.use(cors());
app.use(express.json());
 app.use("/tasks",taskRoutes);
// app.use("/", (req, res) => {
//     res.send("Hello world")
// })
app.listen(PORT,() => {
    console.log(`Backend listening on Port ${PORT}`);
})

