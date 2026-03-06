import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "react-icons/md";

const TaskTable = ({ tasks, deleteTask, onUpdate }) => {
  const handleDelete = (id) => {
    deleteTask(id);
    toast.success("Task deleted!");
  };

  const handleEdit = (id) => {
    onUpdate(id);
    toast.loading("Edit mode activated", { duration: 1000 });
  };

  return (
    <div className="w-100 mt-6 ">
      <div className="mb-4">
        <h3 className="text-white text-2xl font-bold mb-1">Your Tasks</h3>
        <p className="text-gray-400">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} total
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 ">
          <p className="text-gray-400 text-lg">
            No tasks yet. Create one to get started! 🚀
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task, index) => {
            return (
              <div
                key={task.id}
                className=" p-4 rounded-lg text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-between flex-wrap gap-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,.10))]!"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-base font-medium ">{task.task}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(task.id)}
                    type="button"
                    size="sm"
                    className="font-semibold"
                  >
                    <div className="flex items-center gap-1">
                      <MdEdit /> Edit
                    </div>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                    type="button"
                    size="sm"
                    className="font-semibold"
                  >
                    <div className="flex items-center gap-1">
                      <MdDelete /> Delete
                    </div>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskTable;
