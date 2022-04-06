import {FilterValuesType, todolistsType} from "../App";
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


export const todolistsReduser = (todolists: todolistsType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            return ([{id: action.todolistId, title: action.title, filter: "all"}, ...todolists])
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", todolistId: v1(), title})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, filter})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", id, title})