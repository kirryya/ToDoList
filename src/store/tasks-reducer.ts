import {TasksStateType} from "../AppWithRedux";
import {AddTodolistAT, RemoveTodolistAT, SetTodosAT} from "./todolist-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootStateType} from "./store";

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todolistId: string
    taskID: string

}
export type AddTaskAT = {
    type: "ADD-TASK"
    task: TaskType
}

export type UpdateTaskAT = {
    type: "UPDATE-TASK"
    todolistId: string
    taskID: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskID: string
    title: string
}

export type setTasksAT = ReturnType<typeof setTasksAC>


export type ActionType = RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodosAT
    | setTasksAT

const initialState: TasksStateType = {}

export const tasksReduser = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskID)}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    ...action.model
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
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        case "SET-TODOS": {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
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
export const addTaskAC = (task: TaskType): AddTaskAT => ({type: "ADD-TASK", task})
export const updateTaskAC = (todolistId: string, taskID: string, model: UpdateDomainTaskModelType): UpdateTaskAT => ({
    type: "UPDATE-TASK",
    todolistId,
    taskID,
    model
})

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASKS",
    tasks,
    todolistId
}) as const

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
}



