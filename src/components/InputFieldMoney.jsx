import '../App.css';
import React from 'react';

let InputFieldMoney = (props) => {

    return (
        <div className="Container">
            <div className="inputP">{props.text}</div>
            <input className="inputData" placeholder="0.00" type="number" min="0" step="0.01"/>
        </div>
    );
};

export default InputFieldMoney;