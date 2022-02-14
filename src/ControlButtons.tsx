import React from 'react';
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type ControlButtonsPropsType = {
    buttonName: Array<string>
    changeFilter: (filter: FilterValuesType) => void

}

export const ControlButtons = (props: ControlButtonsPropsType) => {

    const onClickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <button onClick={() => {onClickSetFilter("all")}}>{props.buttonName[0]}</button>
            <button onClick={() => {onClickSetFilter("active")}}>{props.buttonName[1]}</button>
            <button onClick={() => {onClickSetFilter("completed")}}>{props.buttonName[2]}</button>
        </div>
    );
};