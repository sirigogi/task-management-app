// src/TaskForm.js
import React from 'react';

const TaskForm = ({ newTask, setNewTask, addTask }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <div>
      <h3>Add Task:</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newTask.description}
        onChange={handleInputChange}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default TaskForm;
