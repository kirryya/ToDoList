import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "./Button";

type AddItemFormPropsType = {
    addTask: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addTask}) => {

    const [title, setTitle] = useState<string>("")


    const onClickAddTask = () => {
        addTask(title)
        setTitle("")

    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(e.nativeEvent)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            onClickAddTask()
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
            />
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};

