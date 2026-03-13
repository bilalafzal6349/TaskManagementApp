import "./App.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import SubmissionTaskForm from "./components/submissionTaskForm";
import TaskTable from "./components/taskTable";
import { taskApi } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, newTask) => {
    try {
      const updatedTask = await taskApi.updateTask(id, { task: newTask });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
      setEditingId(null);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFormSubmit = async (task) => {
    if (editingId) {
      await handleUpdateTask(editingId, task.task);
    } else {
      await addTask(task);
    }
  };

  const addTask = async (task) => {
    try {
      const newTask = await taskApi.createTask(task);
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c29]">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c29]">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Error: {error}</div>
          <button
            onClick={fetchTasks}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen  mx-auto py-8 px-4 bg-[#0f0c29]!"
      style={
        {
          // background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
        }
      }
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #667eea",
          },
        }}
      />

      <Container className="max-w-255!">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Task Manager</h1>
          <p className="text-gray-300 text-lg">Stay organized and productive</p>
        </div>

        <Row className="mb-6">
          <Col>
            <SubmissionTaskForm
              editingTask={tasks.find((t) => t.id === editingId)}
              onSubmit={handleFormSubmit}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <TaskTable
              tasks={tasks}
              onUpdate={setEditingId}
              deleteTask={deleteTask}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
