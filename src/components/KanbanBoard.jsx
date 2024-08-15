import React from "react";
// import { useTasksHook } from "../hooks/useTasksHook";
import TaskList from "./TaskList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
// import { useTasksHook } from "../hooks/useTasksHook";

const API_URL = "https://kanbanboardjson-server.onrender.com/tasks";

const useTasksHook = () => {
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery("tasks", fetchTasks);

  const addTaskMutation = useMutation(
    (newTask) => axios.post(API_URL, newTask),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );

  const updateTaskMutation = useMutation(
    (updatedTask) => axios.put(`${API_URL}/${updatedTask.id}`, updatedTask),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );

  const deleteTaskMutation = useMutation(
    (taskId) => axios.delete(`${API_URL}/${taskId}`),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );

  return {
    tasks,
    isLoading,
    isError,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};

const KanbanBoard = () => {
  const { tasks, isLoading, isError, addTask, updateTask, deleteTask } =
    useTasksHook();
  console.log(tasks);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  const columns = ["todo", "in-progress", "done"];

  return (
    <div className="flex space-x-4">
      {columns.map((column) => (
        <TaskList
          key={column}
          title={column}
          tasks={tasks.filter((task) => task.status === column)}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
