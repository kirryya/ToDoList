import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList";

export function App() {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
        ;
}
