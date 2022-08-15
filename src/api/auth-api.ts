import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c351c090-ba85-40b0-b03b-a2b4e75fffe5'
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



