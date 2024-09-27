import * as React from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import  LoadingIndicator  from "./LoadingIndicator";
import { useTasks, useTaskManager } from "../hooks";
import { deleteTask, markTaskAsDone } from "../service";


const TaskManager = () => {
    const { tasks, loading, refreshTasks } = useTasks();
    const {
        taskData,
        file,
        isEditing,
        open,
        handleAddClick,
        handleEditClick,
        handleClose,
        handleSave,
        handleFileChange,
        setTaskData,
      } = useTaskManager();


    // const [tasks, setTasks] = useState([]);
    // const [Open, setOpen] = useState(false);
    // const [taskData, setTaskData] = useState(null);
    // const [file, setFile] = useState(null);
    // const [isEditing, setIsEditing] = useState(false);
    // const [loading, setLoading] = useState(true);

    //  const handleClose = () =>  {
    //     setFile(null);
    //     setOpen(false);
       
    //  }

    // useEffect(() => {
    //     console.log("loading")
    //     const fetchTasks = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8082/tasks");
    //             setTasks(response.data);
    //         } catch (err) {
    //             console.error("Error fetching tasks:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchTasks();
    // },[])

    const handleMarkAsDone = async (taskId) => {
        console.log('handleMarkAsDone',taskId);
        try {
            // await axios.patch(`http://localhost:8082/tasks/${taskId}`,{
            //     status: "DONE"
            // });
            // const response = await axios.get('http://localhost:8082/tasks');
            // console.log("response after done", response.data);
            // setTasks(response.data);
            await markTaskAsDone(taskId);
            await refreshTasks();
        } catch (err) {
            console.error("Error updating task", err);
        }
      
    }

    const handleDelete = async (taskId) => {
        console.log(taskId);
        if(window.confirm("Are you sure you want to delete the task?")) {
            try {
                // await axios.delete(`http://localhost:8082/tasks/${taskId}`);
                // const response = await axios.get("http://localhost:8082/tasks");
                // setTasks(response.data);
                await deleteTask(taskId);
                await refreshTasks();
            } catch (err) {
                console.error("Error deleting task", err);
            }
        }
    }

    // const handleAddClick = () => {
    //     console.log("Clciked Add button");
    //     setIsEditing(false);
    //     setFile(null);
    //     setOpen(true);
       
    // }

    // const handleSave = async () => {
    //     console.log("taskData", taskData)
    //     const formData = new FormData();
    //     formData.append("title", taskData.title);
    //     formData.append("description", taskData.description);
    //     formData.append("deadline", taskData.deadline);
    //     if(file) {
    //         console.log("file exists");
    //         formData.append("pdf", file);
    //     } 
    //     console.log("formData", formData)
    //     try {
    //         if(isEditing) {
    //             await axios.patch(`http://localhost:8082/tasks/${taskData._id}`,{
    //                 title: taskData.title,
    //                 description: taskData.description,
    //                 deadline: taskData.deadline
    //             });
    //         } else {
    //             await axios.post(`http://localhost:8082/tasks`,formData);
    //         }
    //         const response = await axios.get("http://localhost:8082/tasks");
    //         setTasks(response.data);
    //         handleClose();
    //     } catch (error) {
    //         console.error("Error saving task:", error);
    //     }
    // }

    // const handleFileChange = (event) => {
    //     event.preventDefault();
    //     console.log("handlefileChange");
    //     if(event.target.files.length) {
    //         console.log("enter");
    //         setFile(event.target.files[0])
    //     } else {
    //         setFile(null);
    //     }
    // }

    // const handleEditClick = (task) => {
    //     setIsEditing(true);
    //     setTaskData(task);
    //     setFile(null);
    //     setOpen(true);
    // }

    const handleDownloadFile = (data, contentType) => {
        const blob = new Blob([data], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `task-file-${new Date().toLocaleTimeString()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

  return (
    <div>
        {
        loading? (<LoadingIndicator />)  : (
        tasks.length ? (
            <TaskTable tasks={tasks} onMarkAsDone={handleMarkAsDone}  onDelete={handleDelete}  onEdit={handleEditClick }
            onDownloadFile={handleDownloadFile}
            />
        ) : (
            <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='80vh'
            >
                <Typography variant='h4' component='h1' gutterBottom>No tasks found!</Typography>
            </Box>
        ))
    }
    <TaskModal open={open} handleClose={handleClose}
    taskData={taskData}
    handleSave={handleSave}
    handleChange={(field, value) =>
        setTaskData((prev) => ({ ...prev, [field]: value }))
      }
      handleFileChange={handleFileChange}
      file={file}
      isEditing={isEditing}
    />
    {/* <button onClick={handleAddClick}
    style={{
        position: 'absolute',
        bottom: 16,
        right: 16
    }}
    >Add Task</button> */}
    <Fab
        aria-label="add"
        color="primary"
        onClick={handleAddClick}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
</Fab>
    </div>
  )
}

export default TaskManager