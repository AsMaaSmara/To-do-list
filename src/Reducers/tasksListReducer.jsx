import { v4 as uuidv4 } from "uuid";

export function tasksListReducer(tasksList, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        ...action.payload.task,
        id: uuidv4(),
      };

      const updatedTasks = [...tasksList, newTask];
      action.payload.saveTasksToLocalStorage(updatedTasks);

      return updatedTasks;
    }

    case "REMOVE_TASK": {
      const updatedTasks = tasksList.filter(
        (task) => task.id !== action.payload.id
      );

      action.payload.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    }

    case "EDIT_TASK": {
      const updatedTasks = tasksList.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.newText }
          : task
      );

      action.payload.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    }

    case "TOGGLE_TASK_COMPLETION": {
      const updatedTasks = tasksList.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );

      action.payload.saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    }

    default:
      return tasksList;
  }
}
