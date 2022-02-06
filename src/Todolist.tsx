import React from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";


type TodoListPropsType = {
    valueNamePlus: string
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodoListPropsType) => {
    const buttonName = [
        "All",
        "Active",
        "Completed"
    ]
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <AddItemForm valueNamePlus={props.valueNamePlus}/>
            <TasksList tasks={props.tasks}/>
            <ControlButtons buttonName={buttonName}/>
        </div>
    );
};

