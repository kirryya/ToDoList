import React, {useCallback} from 'react';
import {EditableSpan} from "../components/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {changeTodoTitleTC, deleteTodoTC, TodolistDomainType} from "../store/todolist-reducer";

type TodoListHeaderPropsType = {
    todolistId: string
}

export const TodoListHeader = React.memo((props: TodoListHeaderPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistDomainType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const dispatch = useAppDispatch();

    const removeTodolistHandler = useCallback(() => {
        dispatch(deleteTodoTC(todolist.id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodoTitleTC(todolist.id, title))
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

