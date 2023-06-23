import React from "react";
import './InputDark.css';

const Input = ({ attribute, handleChange, param }) => {
    return (
        <div className="input-container">
            <input style={{backgroundColor:"#666666"}}
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className={param ? 'input-error' : 'regular-style-dark'}
                readOnly='readOnly'
            />
        </div>
    )
};

export default Input;