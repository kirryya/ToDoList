import {Dispatch} from "redux";
import {setAppStatusAC, setErrorAC, SetErrorAT, SetStatusAT} from "../app/app-reducer";
import { ResponseType } from '../api/todolist-api';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}

type ErrorUtilsDispatchType = Dispatch<SetStatusAT | SetErrorAT>
