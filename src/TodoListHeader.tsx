import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: (todolistId: string) => void
    todolistId: string
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <h3>
            {props.title}
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
    );
};

