import React from "react";
import { useState } from "react";
import {Task} from './Task';
const Tasks = ({tasks, deleteTask, onToggle}) => {


  return(
      <>
        {tasks.map((task, index)=>(
            <Task key={index} task={task} onDelete={deleteTask} onToggle={onToggle}/>
        ))}
      </>
  )
};

export default Tasks;
