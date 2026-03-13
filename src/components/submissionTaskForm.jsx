import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EMPTY_TASK = { task: "", id: null };

function SubmissionTaskForm({ editingTask, onSubmit }) {
  const [input, setInput] = useState(EMPTY_TASK);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(editingTask);

  useEffect(() => {
    if (editingTask) {
      setInput(editingTask);
    } else {
      setInput(EMPTY_TASK);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.task.trim()) {
      toast.error("Please enter a task!");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(input);
      setInput(EMPTY_TASK);
    } catch {
      // Error is handled in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, task: e.target.value }));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-gradient p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-white mb-4 font-bold">
        {isEditing ? "Edit Task" : "Create New Task"}
      </h2>

      <Form.Group className="mb-4">
        <Form.Label className="text-white font-semibold mb-2">
          Task Description
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your task here..."
          value={input.task}
          onChange={handleChange}
          className="py-2 px-3 rounded-md border-0 focus:ring-2 focus:ring-blue-300"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#333",
          }}
        />
        <Form.Text className="text-white! mt-2 d-block text-sm">
          {input.task.length} characters entered. Make it concise and clear!
        </Form.Text>
      </Form.Group>

      <Button
        variant="light"
        type="submit"
        className="w-100 font-bold py-2 rounded-md transition-all text-2xl!  hover:scale-99 hover:bg-purple-500! hover:text-white! "
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span>Processing...</span>
        ) : (
          <span>{isEditing ? "Update Task" : "Add Task"}</span>
        )}
      </Button>
    </Form>
  );
}

export default SubmissionTaskForm;
