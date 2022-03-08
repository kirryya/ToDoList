import React from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskID: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export type TaskType = {
    id: string
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
            <TodoListHeader title={props.title} removeTodolist={props.removeTodolist} todolistId={props.todolistId}/>
            <AddItemForm addTask={props.addTask} todolistId={props.todolistId}/>
            <TasksList tasks={props.tasks} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} todolistId={props.todolistId}/>
            <ControlButtons buttonName={buttonName} changeFilter={props.changeFilter} filter={props.filter} todolistId={props.todolistId}/>
        </div>
    );
};

