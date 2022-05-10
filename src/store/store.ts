import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReduser} from "./tasks-reducer";
import {todolistsReduser} from "./todolist-reducer";
import thunk from "redux-thunk";
import { useDispatch } from 'react-redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReduser,
    todolists: todolistsReduser
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<any>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

