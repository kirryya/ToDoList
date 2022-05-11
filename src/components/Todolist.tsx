import React, {useCallback} from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";

type TodoListPropsType = {
    addItem: (todolistId: string, title: string) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
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

