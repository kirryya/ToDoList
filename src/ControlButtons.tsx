import React from 'react';
import {Button} from "./Button";

export type ControlButtonsPropsType = {
    buttonName: Array<string>

}

export const ControlButtons = (props: ControlButtonsPropsType) => {

    return (
        <div>
            <Button valueName={props.buttonName[0]}/>
            <Button valueName={props.buttonName[1]}/>
            <Button valueName={props.buttonName[2]}/>
        </div>
    )
        ;
};