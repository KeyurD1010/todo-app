import React, { useState } from "react";
import TaskList from "./TaskList";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleTaskText = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { text: taskText, isCompleted: false }]);
    setTaskText("");
  };

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") return;
    const updatedTasks = tasks.map((task, ind) =>
      ind === editIndex ? { ...task, text: editText } : task
    );

    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleCompletedTask = (index) => {
    const updatedTasks = tasks.map((task, ind) =>
      ind === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
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
