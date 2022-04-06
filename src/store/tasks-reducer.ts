import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todolistId: string
    taskID: string

}
export type AddTaskAT = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}

export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskID: string
    isDone: boolean
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskID: string
    title: string
}


export type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT


export const tasksReduser = (tasks: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {
                ...tasks,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...tasks[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...tasks, [action.todolistId]:[]}

        case 'REMOVE-TODOLIST': {
            let newState = {...tasks}
            delete newState[action.id]
            return newState
        }

        default:
            return tasks
    }
}

export const removeTaskAC = (todolistId: string, taskID: string): RemoveTaskAT => ({
    type: "REMOVE-TASK",
    todolistId,
    taskID
})
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => ({type: "ADD-TASK", todolistId, title})
export const changeTaskStatusAC = (todolistId: string, taskID: string, isDone: boolean): ChangeTaskStatusAT => ({
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskID,
    isDone
})
export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string): ChangeTaskTitleAT => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    taskID,
    title
})