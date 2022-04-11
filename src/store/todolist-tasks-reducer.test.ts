import {TasksStateType, TodolistsType} from "../App";
import {tasksReduser} from "./tasks-reducer";
import {addTodolistAC, todolistsReduser} from "./todolist-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReduser(startTasksState, action)
    const endTodolistsState = todolistsReduser(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
