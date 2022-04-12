import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReduser
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReduser} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolist] = useReducer(todolistsReduser, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReduser, {
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML2", isDone: false},
            {id: v1(), title: "CSS2", isDone: true},
            {id: v1(), title: "JS/TS2", isDone: true},
            {id: v1(), title: "Rest API2", isDone: true},
        ],
    })

    const removeTask = (todolistId: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskID))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskID, isDone))
    }

    const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, taskID, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolist(removeTodolistAC(todolistId))
        dispatchTasks(removeTodolistAC(todolistId))
    }

    const addTodolist = (newTodolistTitle: string) => {
        dispatchTodolist(addTodolistAC(newTodolistTitle))
        dispatchTasks(addTodolistAC(newTodolistTitle))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodolist(changeTodolistFilterAC(todolistId, filter))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolist(changeTodolistTitleAC(todolistId, title))
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
                        addItem={addTask}
                        addTodolist={addTodolist}
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

export default AppWithReducers;
