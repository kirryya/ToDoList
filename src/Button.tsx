import React from 'react';

type ButtonPropsType = {
    valueName: string

}

export const Button = (props: ButtonPropsType) => {
    return (
        <button>{props.valueName}</button>
    );
};

