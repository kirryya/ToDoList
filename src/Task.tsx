import React from 'react';
import {TaskType} from "./Todolist";

type TaskPropsType = TaskType & { removeTask: (taskID: string) => void }

export const Task = (props: TaskPropsType) => {
    return (
        <li className={props.isDone ? "completed-task" : ""}>
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}</span>
            <button onClick={() => {props.removeTask(props.id)}}>X</button>
        </li>
    );
};

