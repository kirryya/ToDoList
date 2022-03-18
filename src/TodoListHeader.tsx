import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete />
            </IconButton>
        </h3>
    );
};

