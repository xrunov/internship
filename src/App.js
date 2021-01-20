import './App.css';
import React, {useState} from "react";

let Request = () => {
    let [data, setData] = useState(-1);
    let reqLink = React.createRef();

    let GetData = (link) => {
        return fetch(link).then(response => {
            return response;
        })
    };

    let doRequest = () => {
        GetData(reqLink.current.value).then(responseData => {
            setData(responseData.status);
        })
    };

    return (
        <div className="background">
            <div className="RequestContainer">
                <div className="row"><label className="RequestLabel">Status: {data}</label></div>
                <div className="row"><input type="text" ref={reqLink} placeholder="Address"/></div>
                <div className="row"><button className="RequestButton" onClick={doRequest}>GO</button></div>
            </div>
        </div>
    );
};

export default Request;