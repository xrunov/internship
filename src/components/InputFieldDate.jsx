import '../App.css';
import React from 'react';

let InputFieldDate = (props) => {

    return (
        <div className="Container">
            <div className="inputP">{props.text}</div>
            <input className="inputData" type={props.inputType}/>
        </div>
    );
}

export default InputFieldDate;