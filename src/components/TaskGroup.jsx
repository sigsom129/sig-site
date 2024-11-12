import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Collapse, TextField } from '@mui/material';
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
    <Box sx={{ marginBottom: 4, border: '1px solid #ddd', borderRadius: 1, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          value={groupName}
          onChange={(e) => onUpdateGroupName(e.target.value)}
          fullWidth
          sx={{ fontWeight: 'bold', cursor: 'pointer', marginBottom: 2 }}
        />
        <Box>
          <IconButton size="small" onClick={onDeleteGroup} sx={{ marginRight: 1 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={toggleCollapse}>
            {collapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={!collapsed}>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            onUpdate={(updatedTask) => handleUpdateTask(index, updatedTask)}
            onDelete={() => handleDeleteTask(index)}
          />
        ))}
        <Button variant="contained" onClick={handleAddTask} sx={{ marginTop: 2 }}>
          Add Task
        </Button>
      </Collapse>
    </Box>
  );
};

export default TaskGroup;
