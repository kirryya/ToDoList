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
            <button onClick={() => {props.changeFilter("all")}}>{props.buttonName[0]}</button>
            <button onClick={() => {props.changeFilter("active")}}>{props.buttonName[1]}</button>
            <button onClick={() => {props.changeFilter("completed")}}>{props.buttonName[2]}</button>
        </div>
    )
        ;
};