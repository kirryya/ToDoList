import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '1abd1a35-16de-4573-8ef8-3e38ce7a3356'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<Array<ResponseType<{}>>>(`todo-lists/${todolistId}`, {title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<Array<ResponseType<{}>>>(`todo-lists/${todolistId}`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<Array<ResponseType<{item: TodolistType}>>>(`todo-lists`, {title})
        return promise
    },
    getTodolist() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    }
}

export type TodolistType= {
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
}



