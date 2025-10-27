import { useReducer } from "react";
import { TasksListContext } from "./TasksContext";
import { tasksListReducer } from "../../Reducers/tasksListReducer";

export const TasksListProvider = ({ children }) => {
  const [tasksList, dispatch] = useReducer(tasksListReducer, []);

  return (
    <TasksListContext.Provider value={{ tasksList, dispatch }}>
      {children}
    </TasksListContext.Provider>
  );
};
