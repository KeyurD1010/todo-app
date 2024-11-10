import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Services/service";

function TaskApp({ user }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      fetchTasks()
        .then((resp) => {
          setTasks(resp.data);
        })
        .catch((err) => {
          console.error("Failed to fetch tasks:", err);
        });
    }
  }, []);

  const handleTaskText = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = async () => {
    if (taskText.trim() === "") return;

    createTask({ text: taskText }, user)
      .then((resp) => {
        setTasks([...tasks, resp.data]);
        setTaskText("");
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
      });
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id, token)
      .then((resp) => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
      })
      .catch((err) => {
        console.error("Failed to delete task:", err);
      });
  };

  const handleSaveEdit = async () => {
    if (editText.trim() === "") return;

    await updateTask(tasks[editIndex]._id, { text: editText }, token)
      .then((resp) => {
        const updatedTasks = tasks.map((task, ind) =>
          ind === editIndex ? resp.data : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditText("");
      })
      .catch((err) => {
        console.error("Failed to update task:", error);
      });
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleCompletedTask = async (index) => {
    const taskToUpdate = tasks[index];
    const updatedTask = {
      ...taskToUpdate,
      isCompleted: !taskToUpdate.isCompleted,
    };

    await updateTask(taskToUpdate._id, updatedTask, token)
      .then((resp) => {
        const updatedTasks = tasks.map((task, ind) =>
          ind === index ? resp.data : task
        );
      })
      .catch((err) => {
        console.error("Failed to toggle task completion:", error);
      });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4 mb-4">
        <h1 className="text-xl font-bold">Todo-App</h1>
      </div>
      <hr />
      <div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editIndex !== null ? editText : taskText}
            placeholder="Enter your new task"
            onChange={(e) =>
              editIndex !== null
                ? setEditText(e.target.value)
                : handleTaskText(e)
            }
            className="border p-2"
          />
          {editIndex !== null ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          )}
        </div>
        {tasks.length === 0 ? (
          <div>
            <h2>No Task Added right now</h2>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleCompletedTask={handleCompletedTask}
          />
        )}
      </div>
    </div>
  );
}

export default TaskApp;
