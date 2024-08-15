import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = "https://kanbanboardjson-server.onrender.com/tasks";

export const useTasksHook = () => {
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
