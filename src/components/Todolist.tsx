import React from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";


type TodoListPropsType = {
    addItem: (todolistId: string, title: string) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean}

export const Todolist = (props: TodoListPropsType) => {

    const addItemHandler = (title: string) => props.addItem(props.todolistId, title)

    return (
        <div>
            <TodoListHeader todolistId={props.todolistId}/>
            <AddItemForm addItem={addItemHandler}/>
            <TasksList todolistId={props.todolistId}/>
            <ControlButtons todolistId={props.todolistId}/>
        </div>
    );
};

