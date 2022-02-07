import React from 'react';
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type ControlButtonsPropsType = {
    buttonName: Array<string>
    changeFilter: (filter: FilterValuesType) => void

}

export const ControlButtons = (props: ControlButtonsPropsType) => {

    return (
        <div>
            <button onClick={() => {props.changeFilter("all")}}>All</button>
            <button onClick={() => {props.changeFilter("active")}}>Active</button>
            <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
        </div>
    )
        ;
};