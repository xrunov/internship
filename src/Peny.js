import './App.css';
import React, {useState} from "react";
import InputFieldDate from "./components/InputFieldDate";
import InputFieldMoney from "./components/InputFieldMoney";

let arrears, since, until, rate = 1/3, dayCount, penalty;

let PenyCalculator = () => {
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
            <div className="CalcContainer">
                <div className="row"><label className="labelHeader">Калькулятор пени по 44 фз – онлайн расчет неустойки</label></div>
                <div className="row"><InputFieldMoney text="Цена неисполненных обязательств" required="required"/></div>
                <div className="row"><InputFieldDate inputType={"date"} text="Срок окончания поставки товара, выполнения работ оказания услуг" required="required"/></div>
                <div className="row"><InputFieldDate inputType={"date"} text="Окончание периода просрочки " required="required"/></div>
                <div className="Container"><button className="Calculate" onClick={doRequest}>Рассчитать</button></div>

                <table className="tableResult" border="1px" cellSpacing="0">
                    <tr align="center" rowSpan="1"><td rowSpan="2">Задолжность</td><td colSpan="3">Период просрочки</td><td rowSpan="2" >Ставка</td><td rowSpan="2">Неустойка</td></tr>
                    <tr align="center"><td>с</td><td>до</td><td>после</td></tr>
                    <tr align="center">
                        <td>{arrears}</td>
                        <td>{since}</td>
                        <td>{until}</td>
                        <td>{dayCount}</td>
                        <td>{rate}</td>
                        <td>{penalty}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default PenyCalculator;