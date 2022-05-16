import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled=false}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }

    const errorMessage = error
        ? <div style={{color: "red"}}> Title is require! </div>
        : null

    return (
        <div>
            <TextField value={title}
                       disabled={disabled}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressSetTitle}
                       id="outlined-basic"
                       label={errorMessage}
                       variant="outlined"
                       size={"small"}
                       error={!!errorMessage}
            />
            <Button variant="contained"
                    disabled={disabled}
                    onClick={onClickAddTask}
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
            >+</Button>
        </div>
    );
});

