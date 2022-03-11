import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = TaskType &
    { removeTask: (taskID: string) => void } &
    { changeTaskStatus: (taskID: string, isDone: boolean) => void } &
    { changeTaskTitle: (title: string) => void }

export const Task = (props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.id, e.currentTarget.checked)

    return (
        <li className={props.isDone ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.isDone}/>
            <EditableSpan title={props.title} changeTitle={props.changeTaskTitle}/>
            <button onClick={() => {
                props.removeTask(props.id)
            }}>X
            </button>
        </li>
    );
};

