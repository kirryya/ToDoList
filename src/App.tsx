import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./Todolist"
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolist] = useState<Array<todolistsType>>([
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
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el => el.id !== taskID)})
    }


    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        /*setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t))*/
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) =>
        setTodolist(todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el))


    return (

        <div className="App">
            {todolists.map((el) => {
                let filteredTasks = tasks[el.id]
                if (el.filter === "completed") {
                    filteredTasks = tasks[el.id].filter(task => task.isDone)
                }
                if (el.filter === "active") {
                    filteredTasks = tasks[el.id].filter(task => !task.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
        </div>
    );
}

export default App;
