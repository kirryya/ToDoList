import React, {useCallback} from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {AddItemForm} from "../components/AddItemForm";
import {TasksList} from "./TasksList";
import {ControlButtons} from "./ControlButtons";
import {RequestStatusType} from "../app/app-reducer";

type TodoListPropsType = {
    addItem: (todolistId: string, title: string) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = React.memo((props: TodoListPropsType) => {

    const addItemHandler = useCallback((title: string) => props.addItem(props.todolistId, title),
        [props.addItem, props.todolistId])

    return (
        <div>
            <TodoListHeader todolistId={props.todolistId} entityStatus={props.entityStatus}/>
            <AddItemForm addItem={addItemHandler}/>
            <TasksList todolistId={props.todolistId}/>
            <ControlButtons todolistId={props.todolistId}/>
        </div>
    );
});

