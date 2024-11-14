import React, { useState } from 'react';
import { Box, Button, IconButton, Collapse, TextField, Divider } from '@mui/material';
import { Delete as DeleteIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import TaskCard from './TaskCard';

const TaskGroup = ({ groupName, initialTasks, onTasksUpdate, onDeleteGroup, onUpdateGroupName }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [collapsed, setCollapsed] = useState(false);

  const handleAddTask = () => {
    const newTask = {
      title: 'New Task',
      description: '',
      deadline: '',
      tags: [],
      status: 'Not Started',
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    onTasksUpdate(updatedTasks);
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
    onTasksUpdate(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    onTasksUpdate(updatedTasks);
  };

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ marginBottom: 2, padding: 2, border: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          marginBottom: 1,
        }}
      >
        <TextField
          variant="standard"
          value={groupName}
          onChange={(e) => onUpdateGroupName(e.target.value)}
          fullWidth
          inputProps={{
            style: { textAlign: 'center', fontWeight: 'bold', fontSize: '1.25rem' },
          }}
          sx={{
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:after': {
              borderBottom: 'none',
            },
            '& .MuiInputBase-root': {
              justifyContent: 'center',
            },
          }}
        />
        <Box sx={{ position: 'absolute', right: 0 }}>
          <IconButton size="small" onClick={onDeleteGroup} sx={{ marginRight: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={toggleCollapse}>
            {collapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginBottom: 1, borderBottomWidth: 2 }} />

      <Collapse in={!collapsed}>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            onUpdate={(updatedTask) => handleUpdateTask(index, updatedTask)}
            onDelete={() => handleDeleteTask(index)}
          />
        ))}
        <Button variant="contained" onClick={handleAddTask} sx={{ marginTop: 1 }}>
          Add Task
        </Button>
      </Collapse>
    </Box>
  );
};

export default TaskGroup;
