import React from 'react';
import {FilterValuesType} from "./App";

type ButtonPropsType = {
    valueName: string

}

export const Button = (props: ButtonPropsType) => {
    return (
        <button>{props.valueName}</button>
    );
};

