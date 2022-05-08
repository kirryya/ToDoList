import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodosAT} from "./todolist-reducer";
import {TaskType} from "../components/Todolist";
import {Dispatch} from "redux";
import {taskAPI} from "../api/task-api";

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

export type setTasksAT = ReturnType<typeof setTasksAC>


export type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodosAT
    | setTasksAT

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
            return {...state, [action.todolistId]: []}

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
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASKS",
    tasks,
    todolistId
}) as const

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}



