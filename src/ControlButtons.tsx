import React from 'react';
import {Button} from "./Button";

type ControlButtonsPropsType = {
    buttonName : string
    buttonName1 : string
    buttonName2 : string
}

export const ControlButtons = (props: ControlButtonsPropsType ) => {
    return (
        <div>
            <Button valueName={props.buttonName}/>
            <Button valueName={props.buttonName1}/>
            <Button valueName={props.buttonName2}/>
        </div>
    )
        ;
};