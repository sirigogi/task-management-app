// src/TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
