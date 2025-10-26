import React, { useState } from "react";
import { AlertContext } from "./AlertContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const AlertContextProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({ value: false, message: "" });

  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
      {showAlert.value && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>{showAlert.message}</AlertDescription>
        </Alert>
      )}
    </AlertContext.Provider>
  );
};
