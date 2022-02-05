import React from 'react';
import { ControlButtonsPropsType } from './ControlButtons';


type ButtonPropsType = {
    valueName: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button>{props.valueName}</button>
    );
};

