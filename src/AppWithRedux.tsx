import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodoTC, getTodosTC, TodolistDomainType} from "./store/todolist-reducer";
import {addTaskTC} from "./store/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {TaskType} from "./api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    const dispatch = useAppDispatch();

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodoTC(newTodolistTitle))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
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
            </Container>
        </div>
    )
        ;
}

export default AppWithRedux;
