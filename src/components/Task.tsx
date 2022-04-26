import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskPropsType = TaskType &
    { removeTask: (taskID: string) => void } &
    { changeTaskStatus: (taskID: string, isDone: boolean) => void } &
    { changeTaskTitle: (title: string) => void }

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.id, e.currentTarget.checked), [props.changeTaskStatus, props.id])
    const removeTask = useCallback(() =>
        props.removeTask(props.id), [props.removeTask, props.id])
    const changeTaskTitle = useCallback((title: string) =>
        props.changeTaskTitle(title), [props.changeTaskTitle])

    return (
        <div className={props.isDone ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.isDone}/>
            <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
            <IconButton
                aria-label="delete"
                onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

