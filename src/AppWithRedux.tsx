import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodolistAC} from "./store/todolist-reducer";
import {addTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppRootStateType, store} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const dispatch = useDispatch<Dispatch>();

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const addTodolist = (newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }

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
                            <Grid item>
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
