import React from "react";

function TaskList({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleCompletedTask,
}) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Task List</h2>
      <ul className="mt-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleCompletedTask(index)}
              className="form-checkbox"
            />
            <span
              className={`${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              className="text-blue-500"
              onClick={() => handleEditTask(index)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
