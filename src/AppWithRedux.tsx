import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodolistAC, fetchTodosThunk} from "./store/todolist-reducer";
import {addTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store/store";
import {TodolistType} from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = TodolistType & {
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodosThunk)
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const dispatch = useDispatch<Dispatch>();

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
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
