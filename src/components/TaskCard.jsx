import React from 'react';
import { Card, CardContent, Typography, TextField, Box, Chip, Select, MenuItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { title, description, deadline, tags, status } = task;

  const handleFieldChange = (field, value) => {
    onUpdate({ ...task, [field]: value });
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 1, backgroundColor: '#f9f9f9', position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <Select
            value={status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            size="small"
            sx={{ marginLeft: 2, minWidth: 120 }}
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <IconButton color="error" onClick={onDelete} sx={{ marginLeft: 1 }}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <TextField
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          fullWidth
          multiline
          sx={{ marginBottom: 1 }}
        />
        <TextField
          variant="outlined"
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => handleFieldChange('deadline', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 1 }}
        />
        <Box mt={1}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ marginRight: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
