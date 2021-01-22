import './App.css';
import React, {useState} from "react";
import InputFieldDate from "./components/InputFieldDate";
import InputFieldMoney from "./components/InputFieldMoney";
import moment from "moment";
import ResultTable from "./components/ResultTable";


let PenyCalculator = () => {

  const [inputData, setData] = useState({
    arrears: 0,
    dateSince: "",
    dateUntil: "",
    rate: 0.042,
    dayCount: 0,
    penalty: 0,
  });
//запрос на получение коофициэнта еще предстоит реализовать
  //https://shielded-oasis-30862.herokuapp.com/api/cbr/

  let handleArrearsChange = (arrears) => {
    inputData.arrears = arrears;
  };
  let handleDateSinceChange = (Date) => {
    inputData.dateSince = Date;
  };
  let handleDateUntilChange = (Date) => {
    inputData.dateUntil = Date;
  };
//рассчет длительности периода просрочки
  let penaltyDuration = () => {
    let diff = moment(inputData.dateUntil, "YYYY-MM-DD").diff(moment(inputData.dateSince, "YYYY-MM-DD"));
    let duration = moment.duration(diff);
    return duration.asDays();
  };
//вычисление пени
  let countPeny = () => {
    inputData.dayCount = penaltyDuration();
    inputData.penalty = inputData.arrears * inputData.dayCount * inputData.rate;
//обновление значений в таблице
    setData({
      ...inputData
    });
  };
// разметка компонента калькулятора
  return (
    <div className="background">
      <div className="CalcContainer">
        <form>
          <div className="row">
            <label className="labelHeader">
              Калькулятор пени по 44 фз – онлайн расчет неустойки
            </label>
          </div>
          <div className="row">
            <InputFieldMoney
              onArrearsReset={handleArrearsChange}
              text="Цена неисполненных обязательств"
            />
          </div>
          <div className="row">
            <InputFieldDate
              onDateReset={handleDateSinceChange}
              text="Срок окончания поставки товара, выполнения работ оказания услуг"
            />
          </div>
          <div className="row">
            <InputFieldDate
              onDateReset={handleDateUntilChange}
              text="Окончание периода просрочки "
            />
          </div>
          <div className="Container">
            <button className="Calculate"
              type="button"
              onClick={countPeny}>
              Рассчитать
            </button>
          </div>
        </form>
        <ResultTable
          cost={inputData.arrears}
          days={inputData.dayCount}
          rate={inputData.rate}
          peny={inputData.penalty}
        />
      </div>
    </div>
  );
};

export default PenyCalculator;