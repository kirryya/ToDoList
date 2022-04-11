import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store/store";

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

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<Dispatch>();

    const removeTask = (todolistId: string, taskID: string) => {
        dispatch(removeTaskAC(todolistId, taskID))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskID, isDone))
    }

    const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskID, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodolist = (newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }


    const todolistComponent = todolists.map((el) => {
        let filteredTasks = tasks[el.id]
        if (el.filter === "completed") {
            filteredTasks = tasks[el.id].filter(task => task.isDone)
        }
        if (el.filter === "active") {
            filteredTasks = tasks[el.id].filter(task => !task.isDone)
        }
        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={10}>
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addItem={addTask}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        addTodolist={addTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '22px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistComponent}
                </Grid>
            </Container>
        </div>
    )
        ;
}

export default AppWithRedux;
