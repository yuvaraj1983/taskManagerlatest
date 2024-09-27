import React from 'react'
import { Modal, Box, Typography, TextField, Button, IconButton} from "@mui/material"
import { Upload, Delete } from "@mui/icons-material"
import  FileUpload  from "./FileUpload";

const TaskModal = ({open, handleClose, handleSave, taskData, handleChange, handleFileChange, file, isEditing}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const formatDateforInput = (dateString) => {
        if(!dateString) return "";

        const date = new Date(dateString);
        const year = date.getFullYear(date);
        const month = String(date.getMonth() + 1 ).padStart(2,"0");
        const day = String(date.getDate()).padStart(2,"0");
        return `${year}-${month}-${day}`;
      }

   
  return (
    <Modal
    open={open}
    onClose={handleClose}

  >
    <Box component='form' sx={style}>
      <TextField label="Title" fullWidth required margin='normal' 
      value = {taskData?.title || ""}
      onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField label="Description" fullWidth required margin='normal' 
       value = {taskData?.description || ""}
       onChange={(e) => handleChange("description", e.target.value)}
        />
      <TextField label="Deadline" type='date' fullWidth required  margin='normal' 
       InputLabelProps={{ shrink: true }}
       value = {formatDateforInput(taskData?.deadline || "")}
       onChange={(e) => handleChange("deadline", e.target.value)}
      />
      {/* {
        !isEditing && (
            <>
            <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="upload-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-file">
                    <Button
                      variant="contained"
                      component="span"
                      style={{ marginTop: 16, marginRight: 16 }}
                    >
                      {file ? file.name : "Upload PDF"}
                    </Button>
                    {file && (
                      <IconButton
                        sx={{ paddingTop: 4 }}
                        onClick={() => handleFileChange({ target: { files: [] } })}
                      >
                      
                        <Delete color='error' /> 
                      </IconButton>
                    )}
                  </label>
            </>  
        )} */}
    
    {!isEditing && (
        <FileUpload file={file} handleFileChange={handleFileChange} />
      )}
    
      <Box display='flex' justifyContent='space-between' marginTop={2}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          {isEditing ? "Update" : "Save"}
        </Button>
      </Box>
    </Box>
  </Modal>
  )
}

export default TaskModal