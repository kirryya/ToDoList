import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
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

export type SetTodosAT = {
    type: "SET-TODOS"
    todos: TodolistType[]
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type ActionType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT
    | SetTodosAT

const initialState: Array<TodolistDomainType> = []

export const todolistsReduser = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map((tl) => {
                return {...tl, filter: "all"}
            })
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const addTodolistAC = (todolist: TodolistType): AddTodolistAT => ({type: "ADD-TODOLIST", todolist})
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
export const setTodosAC = (todos: TodolistType[]): SetTodosAT => {
    return {
        type: 'SET-TODOS',
        todos
    }
}

//Thunk
export const getTodosTC = () => (dispatch: Dispatch): void => {
    // 1. ajax request
    // 2. dispatch action (thunk)
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}
export const deleteTodoTC = (todolistId: string) => (dispatch: Dispatch): void => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
}

export const addTodoTC = (title: string) => (dispatch: Dispatch): void => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
