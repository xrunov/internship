import './App.css';
import React, {useState} from "react";
import InputFieldDate from "./components/InputFieldDate";
import InputFieldMoney from "./components/InputFieldMoney";
import moment from "moment";
import ResultTable from "./components/ResultTable";

let PenyCalculator = () => {

  const [Data, setData] = useState({
    arrears: 0,
    dateSince: "",
    dateUntil: "",
    rate: 0,
    dayCount: 0,
    penalty: 0,
    refinanceRate: 1 / 300,
    reqLink: "https://shielded-oasis-30862.herokuapp.com/api/cbr/",
  });

//функции отвечающие за обновление полей данных
  let handleArrearsChange = (arrears) => {
    Data.arrears = arrears;
  };
  let handleDateSinceChange = (Date) => {
    Data.dateSince = Date;
  };
  let handleDateUntilChange = (Date) => {
    Data.dateUntil = Date;
  };
//рассчет длительности периода просрочки
  let penaltyDuration = () => {
    let diff = moment(Data.dateUntil, "YYYY-MM-DD").diff(moment(Data.dateSince, "YYYY-MM-DD"));
    let duration = moment.duration(diff);
    return duration.asDays();
  };
//вычисление пени
  let countPeny = () => {
    Data.dayCount = penaltyDuration();
    //запрос на страницу
    fetch(Data.reqLink + Data.dateUntil)
      .then(r => r.json())
      .then(
        (res) => {
        console.log(res.value);
        Data.rate = res.value;
        //расчет пени
        Data.penalty = Data.arrears * Data.dayCount * Data.rate * Data.refinanceRate
        setData({...Data});
    });
  }
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
        cost={Data.arrears}
        days={Data.dayCount}
        rate={Data.rate}
        peny={Data.penalty}
      />
    </div>
  </div>
);
}

export default PenyCalculator;