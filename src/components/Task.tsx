import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskPropsType = TaskType &
    { removeTask: (taskID: string) => void } &
    { changeTaskStatus: (taskID: string, isDone: boolean) => void } &
    { changeTaskTitle: (title: string) => void }

export const Task = (props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.id, e.currentTarget.checked)
    const removeTask = () => {
        props.removeTask(props.id)
    }

    return (
        <div className={props.isDone ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.isDone}/>
            <EditableSpan title={props.title} changeTitle={props.changeTaskTitle}/>
            <IconButton
                aria-label="delete"
                onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
};

