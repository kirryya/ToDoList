import React from 'react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    todolistId: string
}

export const TasksList = (props: TasksListPropsType) => {
    const tasksComponentsList = props.tasks.map(task => {
        return (
            <Task
                key={task.id}
                {...task}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                todolistId={props.todolistId}
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
