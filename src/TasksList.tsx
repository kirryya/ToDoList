import React from 'react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: Array<TaskType>
}

export const TasksList = (props: TasksListPropsType) => {
    return (
        <ul>
            <Task id={props.tasks[0].id} title={props.tasks[0].title} isDone={props.tasks[0].isDone}/>
            <Task id={props.tasks[1].id} title={props.tasks[1].title} isDone={props.tasks[1].isDone}/>
            <Task id={props.tasks[2].id} title={props.tasks[2].title} isDone={props.tasks[2].isDone}/>
        </ul>
    );
};
