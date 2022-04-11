import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ActionType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT

const initialState: Array<TodolistsType> = []

export const todolistsReduser = (state: TodolistsType[] = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            return ([{id: action.todolistId, title: action.title, filter: "all"}, ...state])
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const addTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", todolistId: v1(), title})
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})