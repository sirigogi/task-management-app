// src/Home.js
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { auth, firestore } from './firebase';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection('tasks')
        .where('userId', '==', user.uid)
        .onSnapshot((snapshot) => {
          const tasksData = [];
          snapshot.forEach((doc) => {
            tasksData.push({ id: doc.id, ...doc.data() });
          });
          setTasks(tasksData);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const addTask = async () => {
    if (user) {
      try {
        await firestore.collection('tasks').add({ ...newTask, userId: user.uid });
        setNewTask({ title: '', description: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}!</h2>
      <h3>Task Management</h3>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
