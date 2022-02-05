import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./Todolist"


function App() {
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: false},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: true},
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "book", isDone: true},
        {id: 2, title: "journal", isDone: true},
        {id: 3, title: "instruction", isDone: false},
    ]
    const tasks_3: Array<TaskType> = [
        {id: 1, title: "Run", isDone: true},
        {id: 2, title: "Eat", isDone: false},
        {id: 3, title: "Sleep", isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks_1} valueName={'+'}/>
            <Todolist title={"What to read"} tasks={tasks_2} valueName={'+'}/>
            <Todolist title={"What to do"} tasks={tasks_3} valueName={'+'}/>
        </div>
    );
}

export default App;
