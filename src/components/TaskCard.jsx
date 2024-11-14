import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Select, MenuItem, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Delete as DeleteIcon } from '@mui/icons-material';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { title, description, deadline, tags, status } = task;
  const [collapsed, setCollapsed] = useState(false);

  const handleFieldChange = (field, value) => {
    onUpdate({ ...task, [field]: value });
  };

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Card sx={{ marginBottom: 2, padding: 1, backgroundColor: '#f9f9f9', position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <Select
            value={status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            size="small"
            sx={{
              minWidth: 100,
              padding: '4px 8px',  // Reduces padding inside the Select
              height: 32,          // Adjusts height to make it tighter
              fontSize: '0.875rem', // Slightly smaller font size
              '& .MuiSelect-select': {
                padding: '4px 8px', // Ensures tight spacing inside the dropdown
              },
              '& .MuiSelect-icon': {
                display: 'none',   // Hides the dropdown arrow
              },
            }}
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <IconButton onClick={toggleCollapse}>
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Collapse in={!collapsed}>
          <Box mt={2}>
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
            <Box>
              {tags.map((tag, index) => (
                <Typography key={index} variant="body2" sx={{ display: 'inline-block', marginRight: 1 }}>
                  #{tag}
                </Typography>
              ))}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
