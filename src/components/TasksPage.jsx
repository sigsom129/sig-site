import React, { useState, useEffect } from 'react';
import TaskGroup from '../components/TaskGroup';
import { Box, Button } from '@mui/material';

const TasksPage = () => {
  const [taskGroups, setTaskGroups] = useState(() => {
    const savedData = localStorage.getItem('taskGroups');
    return savedData ? JSON.parse(savedData) : [{ groupName: 'Default Group', tasks: [] }];
  });

  useEffect(() => {
    localStorage.setItem('taskGroups', JSON.stringify(taskGroups));
  }, [taskGroups]);

  const handleAddGroup = () => {
    const newGroup = { groupName: `New Group ${taskGroups.length + 1}`, tasks: [] };
    setTaskGroups([...taskGroups, newGroup]);
  };

  const handleRemoveGroup = (index) => {
    setTaskGroups(taskGroups.filter((_, i) => i !== index));
  };

  const handleUpdateGroupName = (index, newName) => {
    const updatedGroups = taskGroups.map((group, i) =>
      i === index ? { ...group, groupName: newName } : group
    );
    setTaskGroups(updatedGroups);
  };

  const handleUpdateTasks = (index, tasks) => {
    const updatedGroups = taskGroups.map((group, i) => (i === index ? { ...group, tasks } : group));
    setTaskGroups(updatedGroups);
  };

  return (
      <Box sx={{ padding: '2rem' }}>
        {taskGroups.map((group, index) => (
          <TaskGroup
            key={index}
            groupName={group.groupName}
            initialTasks={group.tasks}
            onTasksUpdate={(tasks) => handleUpdateTasks(index, tasks)}
            onDeleteGroup={() => handleRemoveGroup(index)}
            onUpdateGroupName={(newName) => handleUpdateGroupName(index, newName)}
          />
        ))}
        <Button variant="contained" onClick={handleAddGroup} sx={{ marginTop: 2 }}>
          Add Task Group
        </Button>
      </Box>
  );
};

export default TasksPage;
