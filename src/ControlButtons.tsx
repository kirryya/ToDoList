import React from 'react';
import {FilterValuesType} from "./App";
import {Button} from "@material-ui/core";

export type ControlButtonsPropsType = {
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
                    onClick={onClickSetFilter("all")}>{"All"}
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("active")}>{"Active"}
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onClickSetFilter("completed")}>{"Completed"}
            </Button>
        </div>
    );
};