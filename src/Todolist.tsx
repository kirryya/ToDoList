import React from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";


type TodoListPropsType = {
    valueName: string
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodoListPropsType) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <AddItemForm valueNamePlus={props.valueName}/>
            <TasksList tasks={props.tasks}/>
            <ControlButtons buttonName={"All"} buttonName1={"Active"} buttonName2={"Completed"}/>
        </div>
    );
};

