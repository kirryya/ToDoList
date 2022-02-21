import React, {ChangeEvent, useState, KeyboardEvent} from 'react';


type AddItemFormPropsType = {
    addTask: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addTask}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
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
        if(e.key === "Enter") {
            onClickAddTask()
        }
    }

    const errorMessage = error
      ? <div style={{background: "red"}}> Title is require! </div>
        : null

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
    );
};

