import React, { useState } from 'react';
import Task from './Task'; // Adjust the path if needed
import styles from './TaskManager.module.css';

const TaskManager = () => {
  const [taskLists, setTaskLists] = useState(() => {
    const savedLists = localStorage.getItem('taskLists');
    return savedLists ? JSON.parse(savedLists) : [];
  });
  const [selectedLists, setSelectedLists] = useState([]);

  const addTaskList = () => {
    const newList = {
      id: Date.now().toString(), // Unique ID for each task list
      title: `Task List ${taskLists.length + 1}`,
    };
    const updatedLists = [...taskLists, newList];
    setTaskLists(updatedLists);
    localStorage.setItem('taskLists', JSON.stringify(updatedLists));
  };

  const toggleSelectList = (id) => {
    setSelectedLists((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((listId) => listId !== id)
        : [...prevSelected, id]
    );
  };

  const removeSelectedTaskLists = () => {
    const updatedLists = taskLists.filter((list) => !selectedLists.includes(list.id));
    setTaskLists(updatedLists);
    setSelectedLists([]);
    localStorage.setItem('taskLists', JSON.stringify(updatedLists));

    // Clean up localStorage for removed lists
    selectedLists.forEach((id) => {
      localStorage.removeItem(`${id}-tasks`);
      localStorage.removeItem(`${id}-title`);
    });
  };

  return (
    <div className={styles.taskManager}>
      <h1>Action & News</h1>
      <button onClick={addTaskList}>Add Task List</button>
      <button
        onClick={removeSelectedTaskLists}
        disabled={selectedLists.length === 0}
        className={styles.removeSelectedButton}
      >
        Remove Selected
      </button>
      <div className={styles.listsContainer}>
        {taskLists.map((list) => (
          <div key={list.id} className={styles.taskWrapper}>
            <input
              type="checkbox"
              onChange={() => toggleSelectList(list.id)}
              checked={selectedLists.includes(list.id)}
            />
            <Task storageKey={list.id} initialTitle={list.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
