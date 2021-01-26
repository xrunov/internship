import './App.css';
import React, {useState} from "react";
import moment from "moment";
import PenyConfig from "./configurations/PenyConfig";
import InputFieldDate from "./components/InputFieldDate";
import InputFieldMoney from "./components/InputFieldMoney";
import ResultTable from "./components/ResultTable";
import ErrorMessage from "./components/ErrorMessage";
import 'react-bootstrap';

let PenyCalculator = () => {

  const [Data, setData] = useState({
    arrears: 0,
    dateSince: "",
    dateUntil: "",
    rate: 0,
    dayCount: 0,
    penalty: 0,
    errorCode: 0,
    errorMassage: "",
    loading: false,
    buttonText: "Рассчитать",
    tExists: false,
  });
  Object.preventExtensions(Data);
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
  let countPeny = async (e) => {
    e.preventDefault()
    Data.loading = true;
    Data.buttonText = "Рассчитывается..."
    setData({...Data});
    Data.dayCount = penaltyDuration();
    //запрос на страницу

    try {
      const res = await fetch(PenyConfig.reqLink + Data.dateUntil)
      if (res.ok) {
        const data = await res.json();
        console.log(data.statusCode)
        Data.rate = data.value;
        //расчет пени
        Data.penalty = Data.arrears * Data.dayCount * Data.rate * PenyConfig.refinanceRate
        //обработчик ошибок
        if (data.statusCode !== 200) {
          Data.errorCode = data.statusCode;
          if (data.message) {
            Data.errorMassage = data.message;
          }
        }
        Data.loading = false;
        Data.buttonText = "Рассчитать"
        Data.tExists = true;
        setData({...Data});
      }
    } catch (err) {
      alert(err);
      Data.loading = false;
      Data.buttonText = "Рассчитать"
      setData({...Data});
    }
  }
// разметка компонента калькулятора
  return (
    <div className="background">
      <div className="CalcContainer">
        <form onSubmit={countPeny}>
          <div className="r">
            <label className="labelHeader">
              Калькулятор пени по 44 фз – онлайн расчет неустойки
            </label>
          </div>
          <InputFieldMoney
            onArrearsReset={handleArrearsChange}
            text="Цена неисполненных обязательств"
          />
          <div className="r">
            <div className="inputP">Срок окончания оказания услуг и окончание периода просрочки</div>
          </div>
          <div className="r DataFields">
            <InputFieldDate
              onDateReset={handleDateSinceChange}
            />
            <div className="divider"> </div>
            <InputFieldDate
              onDateReset={handleDateUntilChange}
            />
          </div>
          <div className="r">
            <button className="btn btn-primary"
                    type="submit"
                    disabled={Data.loading}>
              {Data.buttonText}
            </button>
          </div>
        </form>
        <div className="r">
          <ErrorMessage
            eCode={Data.errorCode}
            eMessage={Data.errorMassage}
          />
        </div>
        <div className="r">
          <ResultTable
            cost={Data.arrears}
            days={Data.dayCount}
            rate={Data.rate}
            peny={Data.penalty}
            tExists={Data.tExists}
          />
        </div>
      </div>
    </div>
  );
}

export default PenyCalculator;