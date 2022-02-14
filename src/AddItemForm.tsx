import React from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    addTask: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const onClickAddTask = () => props.addTask("New task")
    return (
        <div>
            <input/>
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};

