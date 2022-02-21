import React from 'react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
}

export const TasksList = (props: TasksListPropsType) => {
    const tasksComponentsList = props.tasks.map(task => {
        return (
            <Task
                key={task.id}
                {...task}
                removeTask={props.removeTask}
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
