import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpaPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpaPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (editMode
            ?
            <input
                value={title}
                onChange={onChangeSetTitle}
                onBlur={offEditMode}
                onKeyPress={onKeyPressSetTitle}
                autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

