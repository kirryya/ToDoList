import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./Todolist"
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        /* const newTask: TaskType = {
             id: v1(), title: title, isDone: false
         }
         const updatedTasks = [newTask, ...tasks]
         setTasks(updatedTasks)  */
        setTasks([{
            id: v1(), title, isDone: false
        }, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }

    return (<div className="App">
            <Todolist
                title={"What to learn"}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
