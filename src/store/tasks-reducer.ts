
import {AddTodolistAT, RemoveTodolistAT, SetTodolistAT} from "./todolist-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootStateType} from "../app/store";
import {TasksStateType} from "../features/TodolistsList";

const initialState: TasksStateType = {}

export const tasksReduser = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskID ? {...el, ...action.model} : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOS": {
            const copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (todolistId: string, taskID: string) =>
    ({type: "REMOVE-TASK", todolistId, taskID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (todolistId: string, taskID: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE-TASK", todolistId, taskID, model} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskID)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        taskAPI.updateTask(todolistId, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskID, domainModel))
                }
            })
    }

// types
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistAT
    | ReturnType<typeof setTasksAC>





