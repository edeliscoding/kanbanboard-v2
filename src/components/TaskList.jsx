import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ title, tasks, addTask, updateTask, deleteTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({ title: newTaskTitle, status: title });
      setNewTaskTitle("");
    }
  };

  return (
    <div className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border rounded p-2 w-full text-gray-800"
          placeholder="New task title"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 bg-green-400 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
