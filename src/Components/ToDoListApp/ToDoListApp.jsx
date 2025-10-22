import React, { useState } from "react";
import { Button } from "../ui/button";
import ToDoList from "../ToDoList/ToDoList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

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

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasksList(storedTasks);
  }, []);

  const handleInputChange = (e) => {
    setTask((prev) => ({
      ...prev,
      text: e.target.value,
      time: new Date().toLocaleString(),
    }));
  };

  const editTaskHandle = (id, newText) => {
    setTasksList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );

    setShowAlert({
      value: true,
      message: "Task updated successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);

    saveTasksToLocalStorage(tasksList);
  };

  const handleAddTask = () => {
    if (task.text.trim() === "") {
      setShowAlert({
        value: true,
        message: "Please enter a task before adding.",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);
      return;
    }

    const newTask = {
      ...task,
      id: uuidv4(),
    };

    setTasksList((prev) => [...prev, newTask]);
    setTask({ id: "", text: "", completed: false, time: "" });

    setShowAlert({
      value: true,
      message: "New task added successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);

    saveTasksToLocalStorage([...tasksList, newTask]);
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const filteredTasks = tasksList.filter((task) => {
    if (filter === "done") return task.completed;
    if (filter === "notyet") return !task.completed;
    return true;
  });

  const completedTaskHandle = (id) => {
    setTasksList((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTasks.find((t) => t.id === id);

      setShowAlert({
        value: true,
        message: updatedTask.completed
          ? "Task marked as completed!"
          : "Task marked as not completed!",
      });
      setTimeout(() => setShowAlert({ value: false, message: "" }), 3000);

      saveTasksToLocalStorage(updatedTasks);

      return updatedTasks;
    });
  };

  const deleteTaskHandle = (id) => {
    setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setShowAlert({
      value: true,
      message: "Task deleted successfully!",
    });
    setTimeout(() => setShowAlert({ value: false, message: "" }), 2000);

    saveTasksToLocalStorage(tasksList.filter((task) => task.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-rose-300 rounded-lg p-5 lg:w-[40%] md:w-[60%] sm:w-[80%] shadow-lg">
        <h1 className="pb-5 mb-4 text-3xl font-bold text-center border-b-2 border-gray-950">
          My To-Do List
        </h1>

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

        <ToDoList
          tasks={filteredTasks}
          completedTaskHandle={completedTaskHandle}
          deleteTaskHandle={deleteTaskHandle}
          editTaskHandle={editTaskHandle}
          saveTasksToLocalStorage={saveTasksToLocalStorage}
        />

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
