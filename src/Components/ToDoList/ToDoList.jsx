import React, { useState, useEffect } from "react";
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

function ToDoList({
  tasks,
  completedTaskHandle,
  deleteTaskHandle,
  editTaskHandle,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ تحديث النص تلقائي لما تتغير المهمة المختارة
  useEffect(() => {
    if (editTaskId !== null) {
      const currentTask = tasks.find((t) => t.id === editTaskId);
      if (currentTask) setEditText(currentTask.text);
    }
  }, [editTaskId, tasks]);

  return (
    <>
      <div
        className={` tasks ${
          tasks.length === 0 ? "" : "max-h-90 overflow-y-scroll"
        }`}
      >
        {tasks.length === 0 ? (
          <p className="flex items-center justify-center p-2 my-4 text-lg font-bold rounded-lg bg-gradient-to-r from-rose-400 to-rose-600">
            No tasks available
          </p>
        ) : (
          tasks.map((task) => (
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
