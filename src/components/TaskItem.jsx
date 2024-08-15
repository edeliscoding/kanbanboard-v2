import React from "react";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = (e) => {
    updateTask({ ...task, status: e.target.value });
  };

  return (
    <div className="bg-white p-2 rounded shadow">
      <div className="font-semibold">{task.title}</div>
      <div className="flex justify-between items-center mt-2">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border rounded p-1"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
