import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../api/task-api";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked), [props.changeTaskStatus, props.task.id])
    const removeTask = useCallback(() =>
        props.removeTask(props.task.id), [props.removeTask, props.task.id])
    const changeTaskTitle = useCallback((title: string) =>
        props.changeTaskTitle(title), [props.changeTaskTitle])

    return (
        <div className={props.task.isDone ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton
                aria-label="delete"
                onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

