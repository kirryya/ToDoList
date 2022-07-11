import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login";
import {CircularProgress} from "@mui/material";

export function App() {

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    /*if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }*/

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1 style={{textAlign: "center"}}>404: Page Not Found</h1>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}
