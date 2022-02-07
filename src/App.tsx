import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./Todolist"

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: false},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")


    /*let tasks_2: Array<TaskType> = [
        {id: 1, title: "book", isDone: true},
        {id: 2, title: "journal", isDone: true},
        {id: 3, title: "instruction", isDone: false},
    ]
    let tasks_3: Array<TaskType> = [
        {id: 1, title: "Run", isDone: true},
        {id: 2, title: "Eat", isDone: false},
        {id: 3, title: "Sleep", isDone: true},
    ]*/

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
      setFilter(filter)
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone === true)
            case "active":
                return tasks.filter(task => task.isDone === false)
            default:
                return tasks
        }

    }

    const filteredTasks = getFilteredTasks();

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={filteredTasks} valueNamePlus={'+'} removeTask={removeTask} changeFilter={changeFilter}/>
            {/* <Todolist title={"What to read"} tasks={tasks_2} valueNamePlus={'Add'} removeTask={removeTask} />
            <Todolist title={"What to do"} tasks={tasks_3} valueNamePlus={'Plus'} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
