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

const initialState: TasksStateType = {}

export const tasksReduser = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskID)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}

        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }

        default:
            return state
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