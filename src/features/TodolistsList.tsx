import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../components/AddItemForm";
import {Todolist} from "./Todolist";
import {addTodoTC, getTodosTC, TodolistDomainType} from "../store/todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {addTaskTC} from "../store/tasks-reducer";
import {TaskType} from "../api/task-api";
import {Navigate} from 'react-router-dom';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const TodolistsList = () => {

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getTodosTC())
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch();

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodoTC(newTodolistTitle))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: '22px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolists.map((el) => {
                    return (
                        <Grid item key={el.id}>
                            <Paper style={{padding: '20px'}} elevation={10}>
                                <Todolist
                                    key={el.id}
                                    todolistId={el.id}
                                    addItem={addTask}
                                    addTodolist={addTodolist}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};
