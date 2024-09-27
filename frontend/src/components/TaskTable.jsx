import React from 'react';
import {Edit, Delete, Download, CheckCircle } from "@mui/icons-material"
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Chip,
    Paper,
    IconButton
} from "@mui/material";


const TaskTable = ({tasks, onMarkAsDone, onDelete, onEdit, onDownloadFile}) => {

    const formatDate = (date) => {
        const options = {
           // weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          };
          return new Date(date).toLocaleDateString(undefined, options);
    }

    const getStatus = (deadlinedate, status) => {
        const now = new Date();
        if(status === "DONE")
            return now < deadlinedate ? "Achieved" : "In Progress";
        else
            return now > deadlinedate ? "Failed" : "In Progress";
    }
  return (
   <TableContainer component='Paper' sx={{marginTop: "22px"}}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Title</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Deadline</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                tasks.map((task) => (
                    <TableRow key={task._id}>
                        <TableCell >
                            <Tooltip title={task.title}>
                                <span
                                style={{
                                    display: 'block',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                >
                                    {task.title}
                                </span>
                            </Tooltip>
                        </TableCell>
                        <TableCell sx={{maxWidth: 250, overflow:'hidden'}}>
                                <Tooltip  style={{
                                    display: 'block',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {task.description}
                                </Tooltip>
                        </TableCell>
                        <TableCell>
                            {formatDate(task.deadline)}
                            <br />
                            {getStatus(task.deadline, task.status)}
                        </TableCell>
                        <TableCell>
                            {/* {task.status} */}
                            <Chip label={task.status}
                            color={task.status === "DONE" ? "success" : "warning"}
                            >
                            </Chip>
                        </TableCell>
                        <TableCell>
                            {
                             task.status === "TODO" &&  (
                             <IconButton onClick={() =>onMarkAsDone(task._id)}>
                                <CheckCircle color='success' />
                             </IconButton>
                            )}
                            {task.linkedFile && (
                                <IconButton 
                                onClick={() =>
                                    onDownloadFile(
                                      new Uint8Array(task.linkedFile.data.data),
                                      task.linkedFile.contentType
                                    )
                                  }
                                >
                                    <Download  color='primary'/>
                                </IconButton>
                            )}
                            <IconButton onClick={() => onEdit(task)}>
                                <Edit color='secondary' />
                            </IconButton>
                            <IconButton onClick={() => onDelete(task._id)}>
                                <Delete color='error' />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
   </TableContainer>
  )
}

export default TaskTable