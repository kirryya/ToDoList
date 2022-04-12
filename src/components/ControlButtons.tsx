import React from 'react';
import {FilterValuesType} from "../AppWithRedux";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TodolistsType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {changeTodolistFilterAC} from "../store/todolist-reducer";

export type ControlButtonsPropsType = {
    todolistId: string
}

export const ControlButtons = (props: ControlButtonsPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistsType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const dispatch = useDispatch<Dispatch>();

    const onClickSetFilter = (filter: FilterValuesType) => {
        return () => dispatch(changeTodolistFilterAC(todolist.id, filter))
    }

    return (
        <div>
            <Button variant={todolist.filter === "all" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("all")}>All
            </Button>
            <Button variant={todolist.filter === "active" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("active")}>Active
            </Button>
            <Button variant={todolist.filter === "completed" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("completed")}>Completed
            </Button>
        </div>
    );
};