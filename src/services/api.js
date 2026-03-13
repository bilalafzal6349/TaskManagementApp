import axios from "axios";

const API_BASE_URL = "https://69b2ecb6e224ec066bdb06d1.mockapi.io/tasks";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks. Please try again.");
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post("/", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task. Please try again.");
    }
  },

  // Update a task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task. Please try again.");
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await api.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task. Please try again.");
    }
  },
};

export default api;
