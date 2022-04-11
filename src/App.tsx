import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()


    const [todolists, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskID)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})
    }

    const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, title: title} : el)})

    }

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTodolistTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistsType = {id: newTodolistId, title: newTodolistTitle, filter: "all"}
        setTodolist([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolist(todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolist(todolists.map(el => el.id === todolistId ? {...el, title: title} : el))
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

export default App;
