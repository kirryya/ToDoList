import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetErrorAT, SetStatusAT} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReduser = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map((t) => ({...t, filter: "all", entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-ENTITY-STATUS":
            return state.map(t => t.id === action.id ? {...t, entityStatus: action.entityStatus} : t)
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
export const setTodosAC = (todos: TodolistType[]) =>
    ({type: 'SET-TODOS', todos} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-ENTITY-STATUS', id, entityStatus} as const)

// thunks
export const getTodosTC = () => (dispatch: ThunkActionsType): void => {
    dispatch(setAppStatusAC("loading"))
    // 1. ajax request
    // 2. dispatch action (thunk)
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTodoTC = (todolistId: string) => (dispatch: ThunkActionsType): void => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodoTC = (title: string) => (dispatch: ThunkActionsType): void => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: ThunkActionsType): void => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
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
    | ReturnType<typeof changeTodolistEntityStatusAC>

type ThunkActionsType = Dispatch<ActionType | SetStatusAT | SetErrorAT>