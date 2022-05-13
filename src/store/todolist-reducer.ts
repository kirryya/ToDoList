import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReduser = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map((t) => ({...t, filter: "all"}))
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const setTodosAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos}) as const

// thunks
export const getTodosTC = () => (dispatch: Dispatch<ActionType>): void => {
    // 1. ajax request
    // 2. dispatch action (thunk)
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}
export const deleteTodoTC = (todolistId: string) => (dispatch: Dispatch<ActionType>): void => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionType>): void => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>): void => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistAT = ReturnType<typeof setTodosAC>
type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistAT