import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "../ui/button";
import ToDoList from "../ToDoList/ToDoList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { v4 as uuidv4 } from "uuid";

function ToDoListApp() {
  const [task, setTask] = useState({
    id: "",
    text: "",
    completed: false,
    time: "",
  });
  const [tasksList, setTasksList] = useState([]);
  const [showAlert, setShowAlert] = useState({
    value: false,
    message: "",
  });
  const [filter, setFilter] = useState("all");

  // 🧩 تحميل المهام من localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasksList(storedTasks);
  }, []);

  // 🧠 حفظ المهام في localStorage (useCallback علشان متتغيرش)
  const saveTasksToLocalStorage = useCallback((tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);

  // ✍️ تحديث النص داخل input
  const handleInputChange = useCallback((e) => {
    setTask((prev) => ({
      ...prev,
      text: e.target.value,
      time: new Date().toLocaleString(),
    }));
  }, []);

  // ➕ إضافة مهمة جديدة
  const handleAddTask = useCallback(() => {
    if (task.text.trim() === "") {
      setShowAlert({
        value: true,
        message: "Please enter a task before adding.",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
      return;
    }

    const newTask = { ...task, id: uuidv4() };
    const updatedTasks = [...tasksList, newTask];

    setTasksList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    setTask({ id: "", text: "", completed: false, time: "" });

    setShowAlert({
      value: true,
      message: "New task added successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
  }, [task, tasksList, saveTasksToLocalStorage]);

  // ✏️ تعديل مهمة
  const editTaskHandle = useCallback(
    (id, newText) => {
      const updatedTasks = tasksList.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      );

      setTasksList(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);

      setShowAlert({
        value: true,
        message: "Task updated successfully!",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
    },
    [tasksList, saveTasksToLocalStorage]
  );

  // ✅ تحديد المهام المكتملة
  const completedTaskHandle = useCallback(
    (id) => {
      const updatedTasks = tasksList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTasks.find((t) => t.id === id);

      setTasksList(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);

      setShowAlert({
        value: true,
        message: updatedTask.completed
          ? "Task marked as completed!"
          : "Task marked as not completed!",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 3000);
    },
    [tasksList, saveTasksToLocalStorage]
  );

  // 🗑️ حذف مهمة
  const deleteTaskHandle = useCallback(
    (id) => {
      const updatedTasks = tasksList.filter((task) => task.id !== id);

      setTasksList(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);

      setShowAlert({
        value: true,
        message: "Task deleted successfully!",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
    },
    [tasksList, saveTasksToLocalStorage]
  );

  // 🧮 فلترة المهام (useMemo لتحسين الأداء)
  const filteredTasks = useMemo(() => {
    return tasksList.filter((task) => {
      if (filter === "done") return task.completed;
      if (filter === "notyet") return !task.completed;
      return true;
    });
  }, [tasksList, filter]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-rose-300 rounded-lg p-5 lg:w-[40%] md:w-[60%] sm:w-[80%] shadow-lg">
        <h1 className="pb-5 mb-4 text-3xl font-bold text-center border-b-2 border-gray-950">
          My To-Do List
        </h1>

        {/* 🔘 الفلاتر */}
        <div className="flex items-center justify-center mb-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={filter}
            onValueChange={(value) => setFilter(value || "all")}
            aria-label="Task filter"
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="done">Done</ToggleGroupItem>
            <ToggleGroupItem value="notyet">Not Yet</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* 📋 قائمة المهام */}
        <ToDoList
          tasks={filteredTasks}
          completedTaskHandle={completedTaskHandle}
          deleteTaskHandle={deleteTaskHandle}
          editTaskHandle={editTaskHandle}
        />

        {/* ✍️ إضافة مهمة جديدة */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter a new task"
            value={task.text}
            className="w-full px-4 py-2 mt-2 border rounded-lg border-gray-950 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
            onChange={handleInputChange}
          />

          <Button
            variant="secondary"
            className="w-full px-4 py-2 mt-4"
            onClick={handleAddTask}
          >
            Add New Task
          </Button>
        </div>

        {/* ⚠️ التنبيه */}
        {showAlert.value && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Look!</AlertTitle>
            <AlertDescription>{showAlert.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default ToDoListApp;
