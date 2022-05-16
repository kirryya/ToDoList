import React, {useCallback} from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {AddItemForm} from "../components/AddItemForm";
import {TasksList} from "./TasksList";
import {ControlButtons} from "./ControlButtons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {TodolistDomainType} from "../store/todolist-reducer";

type TodoListPropsType = {
    addItem: (todolistId: string, title: string) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
    disabled?: boolean
}

export const Todolist = React.memo((props: TodoListPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistDomainType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const disabled = todolist.entityStatus === "loading"

    const addItemHandler = useCallback((title: string) => props.addItem(props.todolistId, title),
        [props.addItem, props.todolistId])

    return (
        <div>
            <TodoListHeader todolistId={props.todolistId}/>
            <AddItemForm addItem={addItemHandler} disabled={disabled}/>
            <TasksList todolistId={props.todolistId}/>
            <ControlButtons todolistId={props.todolistId}/>
        </div>
    );
});

