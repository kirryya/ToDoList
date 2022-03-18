import React from 'react';
import {FilterValuesType} from "./App";
import {Button} from "@material-ui/core";

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
            <Button variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("all")}>{props.buttonName[0]}
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("active")}>{props.buttonName[1]}
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("completed")}>{props.buttonName[2]}
            </Button>
        </div>
    );
};