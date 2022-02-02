import React from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    valueNamePlus: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    return (
        <div>
            <input/>
            <Button valueName={props.valueNamePlus}/>
        </div>
    );
};

