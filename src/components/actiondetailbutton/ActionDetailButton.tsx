import React from 'react';

interface ActionDetailButtonProps {
    text: string,
    color: string,
    textcolor: string,
    onClick: () => Promise<void>; 
}

const ActionDetailButton: React.FC<ActionDetailButtonProps> = ({ text, color, textcolor, onClick }) => {
    return (
        <button type='button'
            className={`bg-${color}-400 hover:bg-${color}-500 mt-5 w-full p-3 font-bold text-${textcolor} text-lg`}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default ActionDetailButton;