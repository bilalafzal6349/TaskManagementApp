import "./App.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

import SubmissionTaskForm from "./components/submissionTaskForm";
import TaskTable from "./components/taskTable";

const InitialTasks = [{"id":1, "task":"Task 1"}, {"id":2, "task":"Task 2"}, {"id":3, "task":"Task 3"}];

function App() {
  const [tasks, setTasks] = useState(InitialTasks);
  const [editingId, setEditingId] = useState(null);
  
  const handleUpdateTask = (id, newTask) => {
    setTasks((prev) =>
      prev.map((task) => 
        task.id === id ? { ...task, task: newTask } : task
      )
    );
    setEditingId(null);
  };
  
  const handleFormSubmit = (task) => {
    editingId ? handleUpdateTask(editingId, task.task) : addTask(task);
  };
  
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      }}
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
            border: "1px solid #667eea"
          }
        }}
      />
      
      <Container className="max-w-2xl">
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
