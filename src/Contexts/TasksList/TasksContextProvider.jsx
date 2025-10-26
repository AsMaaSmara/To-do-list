import { useState } from "react";
import { TasksListContext } from "./TasksContext";

export const TasksListProvider = ({ children }) => {
  const [tasksList, setTasksList] = useState([]);

  return (
    <TasksListContext.Provider value={{ tasksList, setTasksList }}>
      {children}
    </TasksListContext.Provider>
  );
};
