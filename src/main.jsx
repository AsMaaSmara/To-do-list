import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ToDoListApp from "./Components/ToDoListApp/ToDoListApp.jsx";
import { TasksListProvider } from "./Contexts/TasksList/TasksContextProvider.jsx";
import { AlertContextProvider } from "./Contexts/Alert/AlertContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertContextProvider>
      <TasksListProvider>
        <ToDoListApp />
      </TasksListProvider>
    </AlertContextProvider>
  </StrictMode>
);
