import React, {useEffect} from 'react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {deleteTaskTC, getTasksTC, updateTaskTC} from "../store/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/task-api";
import {TodolistDomainType} from "../store/todolist-reducer";

type TasksListPropsType = {
    todolistId: string
}

export const TasksList = React.memo((props: TasksListPropsType) => {

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [])

    const todolist = useSelector<AppRootStateType, TodolistDomainType>(
        state => state.todolists.filter(t => t.id === props.todolistId)[0]
    )
    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todolistId]
    )

    const dispatch = useAppDispatch();

    let tasksForTodolist = tasks

    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
    }

    let tasksComponentsList = tasksForTodolist.map(task => {

        const changeTaskTitle = (title: string) => {
            dispatch(updateTaskTC(todolist.id, task.id, {title}))
        }
        const changeTaskStatus = (taskID: string, status: TaskStatuses) => {
            dispatch(updateTaskTC(todolist.id, taskID, {status}))
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
