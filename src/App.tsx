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
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }

    }

    const filteredTasks = getFilteredTasks();

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={filteredTasks}
                valueNamePlus={'+'}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
