import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const removeTodolistHandler = () => {
        props.removeTodolist()
    }

    return (
        <h3>
            {props.title}
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
    );
};

