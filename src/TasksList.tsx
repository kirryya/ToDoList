import React from 'react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const TasksList = (props: TasksListPropsType) => {
    const tasksComponentsList = props.tasks.map(task => {

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title)
        }

        return (
            <Task
                key={task.id}
                {...task}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })
    return (tasksComponentsList.length ?
            <ul>
                {tasksComponentsList}
            </ul>
            : <span>Tasks list is empty. Please, change or add task!</span>
    );
};
