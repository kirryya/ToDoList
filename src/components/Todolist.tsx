import React from 'react';
import {TodoListHeader} from "./TodoListHeader";
import {ControlButtons} from "./ControlButtons";
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";
import {FilterValuesType} from "../App";


type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskID: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addItem: (todolistId: string, title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    todolistId: string
    addTodolist: (newTodolistTitle: string) => void
    changeTaskTitle: (todolistId: string, taskID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodoListPropsType) => {

    const addItemHandler = (title: string) => props.addItem(props.todolistId, title)
    const removeTaskHandler = (taskID: string) => props.removeTask(props.todolistId, taskID)
    const changeTaskStatusHandler = (taskID: string, isDone: boolean) => props.changeTaskStatus(props.todolistId, taskID, isDone)
    const changeFilterHandler = (filter: FilterValuesType) => props.changeFilter(props.todolistId, filter)
    const changeTaskTitleHandler = (taskID: string, title: string) => props.changeTaskTitle(props.todolistId, taskID, title)

    return (
        <div>
            <TodoListHeader todolistId={props.todolistId}/>
            <AddItemForm addItem={addItemHandler}/>
            <TasksList tasks={props.tasks} removeTask={removeTaskHandler} changeTaskStatus={changeTaskStatusHandler}
                       changeTaskTitle={changeTaskTitleHandler}/>
            <ControlButtons changeFilter={changeFilterHandler} filter={props.filter}/>
        </div>
    );
};

