import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../components/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/task-api";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses) => void
    changeTaskTitle: (title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New), [props.changeTaskStatus, props.task.id])
    const removeTask = useCallback(() =>
        props.removeTask(props.task.id), [props.removeTask, props.task.id])
    const changeTaskTitle = useCallback((title: string) =>
        props.changeTaskTitle(title), [props.changeTaskTitle])

    const disabled = props.task.entityTaskStatus === 'loading'

    return (
        <div className={props.task.status === TaskStatuses.Completed ? "completed-task" : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   disabled={disabled}
                   checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton
                aria-label="delete"
                onClick={removeTask}
                disabled={disabled}>
                <Delete/>
            </IconButton>
        </div>
    );
});

