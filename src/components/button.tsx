import React from "react";

interface buttonProps {
    onClick: () =>  void;
}

const Button: React.FC<buttonProps> = ({ onClick }) => {
    return (
       <button onClick={onClick}>
        Open Model
       </button>
    )
}

export default Button;