import React from "react";

const ToastMessage = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className="toast toast-top toast-center">
      <div className={`alert alert-${type || "success"}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastMessage;