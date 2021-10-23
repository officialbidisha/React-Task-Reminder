import React from "react";

export const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <i
          className="pi pi-times"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            onDelete(task.id);
          }}
        ></i>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

// export default Task;
