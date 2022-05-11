import React, {useEffect} from 'react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {TodolistsType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC, getTasksTC} from "../store/tasks-reducer";
import {TaskType} from "../api/task-api";

type TasksListPropsType = {
    todolistId: string
}

export const TasksList = React.memo((props: TasksListPropsType) => {
    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [])

    const todolist = useSelector<AppRootStateType, TodolistsType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todolistId]
    )

    const dispatch = useAppDispatch();

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
            dispatch(deleteTaskTC(todolist.id, taskID))
        }

        return (
            <Task
                key={task.id}
                task={task}
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
});
