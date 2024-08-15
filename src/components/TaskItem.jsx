import React from "react";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = (e) => {
    updateTask({ ...task, status: e.target.value });
  };

  return (
    <div className="bg-white p-2 rounded shadow">
      <div className="font-semibold mb-2 text-gray-900">{task.title}</div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded p-1 w-full sm:w-auto mb-2 sm:mb-0 caret-blue-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
