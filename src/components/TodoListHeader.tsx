import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Dispatch} from "redux";
import {TodolistsType} from "../AppWithRedux";
import {changeTodolistTitleAC, removeTodolistAC} from "../store/todolist-reducer";

type TodoListHeaderPropsType = {
    todolistId: string
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistsType>(state => state.todolists.filter(t => t.id === props.todolistId)[0])
    const dispatch = useDispatch<Dispatch>();

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }

    return (
        <h3>
            <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

