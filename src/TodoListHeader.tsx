import React from 'react';

type TodoListHeaderPropsType = {
    title: string
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {
    return (
        <h3>{props.title}</h3>
    );
};

