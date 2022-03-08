import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";

type TaskPropsType = TaskType &
    { removeTask: (todolistId: string, taskID: string) => void } &
    { changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void } & {todolistId: string}

export const Task = (props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.todolistId, props.id, e.currentTarget.checked)

    return (
        <li className={props.isDone ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.isDone}/>
            <span>{props.title}</span>
            <button onClick={() => {props.removeTask(props.todolistId, props.id)}}>X</button>
        </li>
    );
};

