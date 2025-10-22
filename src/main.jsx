import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ToDoListApp from "./Components/ToDoListApp/ToDoListApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToDoListApp />
  </StrictMode>
);
