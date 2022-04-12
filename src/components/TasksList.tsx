import React from 'react';
import {Task} from "./Task";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TodolistsType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";

type TasksListPropsType = {
    todolistId: string
}

export const TasksList = (props: TasksListPropsType) => {

    const todolist = useSelector<AppRootStateType, TodolistsType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todolistId]
    )
    const dispatch = useDispatch<Dispatch>();

    let tasksForTodolist = tasks
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    let tasksComponentsList = tasksForTodolist.map(task => {

        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(todolist.id, task.id, title))
        }
        const changeTaskStatus = (taskID: string, isDone: boolean) => {
            dispatch(changeTaskStatusAC(todolist.id, taskID, isDone))
        }
        const removeTask = (taskID: string) => {
            dispatch(removeTaskAC(todolist.id, taskID))
        }

        return (
            <Task
                key={task.id}
                {...task}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />

        )
    })

    return (tasksComponentsList.length ?
            <div>
                {tasksComponentsList}
            </div>
            : <span>Tasks list is empty. Please, add task!</span>
    );
};
