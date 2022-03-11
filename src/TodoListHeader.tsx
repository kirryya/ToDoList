import React from 'react';
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
    changeTodolistTitle: (title: string) => void
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist()
    }

    return (
        <h3>
            <EditableSpan title={props.title} changeTitle={props.changeTodolistTitle}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
    );
};

