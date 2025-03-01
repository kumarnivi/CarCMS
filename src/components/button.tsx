import React from "react";

interface buttonProps {
    onClick: () =>  void;
}

const Button: React.FC<buttonProps> = ({ onClick }) => {
    return (
       <button className="bg-green-200" onClick={onClick}>
        Create + 
       </button>
    )
}

export default Button;