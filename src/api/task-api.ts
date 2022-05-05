import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1abd1a35-16de-4573-8ef8-3e38ce7a3356'
    }
})

export const taskAPI = {
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get(`todo-lists/${todolistId}/tasks`)
        return promise
    }
}

/*type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}*/



