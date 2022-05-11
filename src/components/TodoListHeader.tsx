import React, {useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Dispatch} from "redux";
import {changeTodolistTitleAC, removeTodolistAC, TodolistDomainType} from "../store/todolist-reducer";

type TodoListHeaderPropsType = {
    todolistId: string
}

export const TodoListHeader = React.memo((props: TodoListHeaderPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistDomainType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const dispatch = useDispatch<Dispatch>();

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }, [dispatch])

    return (
        <h3>
            <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
    );
});

