import {TasksStateType} from "../AppWithRedux";
import {AddTodolistAT, RemoveTodolistAT, SetTodosAT} from "./todolist-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskStatuses, TaskType} from "../api/task-api";

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todolistId: string
    taskID: string

}
export type AddTaskAT = {
    type: "ADD-TASK"
    task: TaskType
}

export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskID: string
    status: TaskStatuses
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
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskID);
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const task = action.task
            const tasks = stateCopy[task.todolistId]
            stateCopy[task.todolistId] = [task, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    isDone: action.status
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
export const addTaskAC = (task: TaskType): AddTaskAT => ({type: "ADD-TASK", task})
export const changeTaskStatusAC = (todolistId: string, taskID: string, status: TaskStatuses): ChangeTaskStatusAT => ({
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskID,
    status
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


