import React, { useState, useEffect, useContext } from "react";
import { Check, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TasksListContext } from "../../Contexts/TasksList/TasksContext";
import { AlertContext } from "@/Contexts/Alert/AlertContext";

function ToDoList({ tasksList, saveTasksToLocalStorage }) {
  const { dispatch } = useContext(TasksListContext);
  const { setShowAlert } = useContext(AlertContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ تحديث النص تلقائي لما تتغير المهمة المختارة
  useEffect(() => {
    if (editTaskId !== null) {
      const currentTask = tasksList.find((t) => t.id === editTaskId);
      if (currentTask) setEditText(currentTask.text);
    }
  }, [editTaskId, tasksList]);

  const editTaskHandle = (id, newText) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, newText, saveTasksToLocalStorage },
    });

    setShowAlert({
      value: true,
      message: "Task updated successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);

    saveTasksToLocalStorage(tasksList);
  };

  const completedTaskHandle = (id) => {
    dispatch({
      type: "TOGGLE_TASK_COMPLETION",
      payload: { id, saveTasksToLocalStorage },
    });

    setShowAlert({
      value: true,
      message: "Task completion status toggled!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
  };

  const deleteTaskHandle = (id) => {
    dispatch({ type: "REMOVE_TASK", payload: { id, saveTasksToLocalStorage } });

    setShowAlert({
      value: true,
      message: "Task deleted successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
  };

  return (
    <>
      <div
        className={` tasks ${
          tasksList.length === 0 ? "" : "max-h-90 overflow-y-scroll"
        }`}
      >
        {tasksList.length === 0 ? (
          <p className="flex items-center justify-center p-2 my-4 text-lg font-bold rounded-lg bg-gradient-to-r from-rose-400 to-rose-600">
            No tasks available
          </p>
        ) : (
          tasksList.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2 my-4 text-lg font-bold transition-all duration-300 rounded-lg bg-gradient-to-r from-rose-400 to-rose-600 hover:scale-95 hover:shadow-lg"
            >
              <p
                className={`flex flex-col ${
                  task.completed ? "line-through text-gray-200 opacity-70" : ""
                }`}
              >
                {task.text}
                <span className="text-sm font-normal text-rose-200">
                  Added on: {task.time}
                </span>
              </p>

              <div className="flex items-center gap-4">
                {/* ✅ إتمام المهمة */}
                <button
                  onClick={() => completedTaskHandle(task.id)}
                  title={
                    task.completed ? "Task already completed" : "Mark as done"
                  }
                  className={`p-1 transition-all border-2 rounded-full border-secondary hover:shadow-lg 
                    ${
                      task.completed
                        ? "bg-green-500 text-white opacity-60"
                        : "hover:bg-rose-300"
                    }`}
                >
                  <Check size={28} />
                </button>

                {/* ✅ تعديل المهمة */}
                <button
                  onClick={() => {
                    setEditTaskId(task.id);
                    setEditFormOpen(true);
                  }}
                  className="p-1 transition-all border-2 rounded-full border-secondary hover:shadow-lg hover:bg-rose-300"
                >
                  <Pencil size={28} />
                </button>

                {/* ✅ حذف المهمة */}
                <button
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setConfirmDelete(true);
                  }}
                  className="p-1 transition-all border-2 rounded-full border-secondary hover:shadow-lg hover:bg-rose-300"
                >
                  <Trash size={28} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ نافذة تأكيد الحذف */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              task.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                deleteTaskHandle(taskToDelete);
                setConfirmDelete(false);
              }}
            >
              Confirm
            </Button>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ نافذة تعديل المهمة */}
      <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Modify your task below and click save to update it.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <Label htmlFor="edit-task">Task</Label>
            <Input
              id="edit-task"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="text-black bg-white border border-gray-300 select-text focus-visible:ring-2 focus-visible:ring-rose-400"
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditFormOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                editTaskHandle(editTaskId, editText);
                setEditFormOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ToDoList;
