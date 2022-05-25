import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1abd1a35-16de-4573-8ef8-3e38ce7a3356'
    }
})

//api
export const authAPI = {
    login (data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    me () {
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    },
    logout () {
        return instance.delete<ResponseType>('auth/login')
    }
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type MeResponseType = {
    id: number
    email: string
    login: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}



