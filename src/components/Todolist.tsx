import React, {useCallback} from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


type TodoListPropsType = {
    addItem: (todolistId: string, title: string) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
}

export type TaskType = {
    todolistId:string
    id: string
    title: string
    isDone: boolean
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDates: string
    deadlines: string
    order: number
}

export const Todolist = React.memo((props: TodoListPropsType) => {

    const addItemHandler = useCallback((title: string) => props.addItem(props.todolistId, title),
        [props.addItem, props.todolistId])

    return (
        <div>
            <TodoListHeader todolistId={props.todolistId}/>
            <AddItemForm addItem={addItemHandler}/>
            <TasksList todolistId={props.todolistId}/>
            <ControlButtons todolistId={props.todolistId}/>
        </div>
    );
});

