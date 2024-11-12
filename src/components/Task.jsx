import React, { useState, useEffect } from 'react';
import styles from './Task.module.css';

const Task = ({ storageKey, initialTitle = 'Task List' }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`${storageKey}-tasks`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskName, setTaskName] = useState('');
  const [title, setTitle] = useState(() => {
    const savedTitle = localStorage.getItem(`${storageKey}-title`);
    return savedTitle || initialTitle;
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');

  useEffect(() => {
    localStorage.setItem(`${storageKey}-tasks`, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-title`, title);
  }, [title, storageKey]);

  const addTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { name: taskName, completed: false, status: 'Not Started' }]);
      setTaskName('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const updateTaskStatus = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditTaskName(tasks[index].name);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: editTaskName } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTaskName('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditTaskName('');
  };

  const getProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  const startEditTitle = () => {
    setIsEditingTitle(true);
  };

  const saveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className={styles.task}>
      {isEditingTitle ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={saveTitle}>Save</button>
        </div>
      ) : (
        <h2 onClick={startEditTitle}>{title}</h2>
      )}
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${getProgress()}%` }}
        ></div>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? styles.completed : ''}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
                <button onClick={() => saveTask(index)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTask(index)}>{task.name}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(index, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Completed">Completed</option>
                </select>
                <button className={styles.editButton} onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className={styles.removeButton} onClick={() => removeTask(index)}>
                  &#x2212;
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
