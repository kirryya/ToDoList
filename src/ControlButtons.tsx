import React from 'react';
import {FilterValuesType} from "./App";

export type ControlButtonsPropsType = {
    buttonName: Array<string>
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
}

export const ControlButtons = (props: ControlButtonsPropsType) => {

    const onClickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <button
                className={props.filter === "all" ? "button-active" : ""}
                onClick={onClickSetFilter("all")}>{props.buttonName[0]}</button>
            <button
                className={props.filter === "active" ? "button-active" : ""}
                onClick={onClickSetFilter("active")}>{props.buttonName[1]}</button>
            <button
                className={props.filter === "completed" ? "button-active" : ""}
                onClick={onClickSetFilter("completed")}>{props.buttonName[2]}</button>
        </div>
    );
};