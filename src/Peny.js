import './PenyStyle.sass';
import 'react-bootstrap';

import React, {useState} from "react";
import moment from "moment";
import PenyConfig from "./configurations/PenyConfig";

import InputFieldDate from "./components/InputFieldDate";
import InputFieldMoney from "./components/InputFieldMoney";
import ResultTable from "./components/ResultTable";
import ServErrMessage from "./components/ServErrMessage";
import KeyRate from "./components/keyRate";
import DateErrMassage from "./components/DateErrMassage";
import FormulaMessage from "./components/FormulaMessage";

let PenyCalculator = () => {
  const [Data, setData] = useState({
    buttonText: "Рассчитать",
    dateSince: "",
    dateUntil: "",
    errorMassage: "",
    errorDate: "",
    rate: 1,
    arrears: 0,
    dayCount: 0,
    penalty: 0,
    errorCode: 200,
    loading: false,
    tExists: false,
    checked: true,
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
  let handleRateChange = (Rate) => {
    Data.rate = Rate;
  };
  //рассчет длительности периода просрочки
  let penaltyDuration = () => {
    let diff = moment(Data.dateUntil, "YYYY-MM-DD").diff(moment(Data.dateSince, "YYYY-MM-DD"));
    let duration = moment.duration(diff);
    return duration.asDays();
  };
  //toggle функция
  let toggleState = () => {
    Data.checked = !Data.checked;
    setData({...Data});
  }
  //обработчик ошибок
  let catchError = (sCode, sMassage) => {
    setData({...Data});
    if (sCode !== 200) {
      Data.errorCode = sCode;
      if (sMassage) {
        Data.errorMassage = sMassage;
      }
    }
    if (Data.dayCount < 0) {
      Data.errorDate = 1;
    }
    else  if( Data.dayCount === 0) {
      Data.errorDate = 2;
    }
    else {
      Data.errorDate = false;
    }
  }
  //функции блокировки и разблокировки кнопок
  let countStart = () => {
    Data.errorCode = 200;
    Data.loading = true;
    Data.buttonText = "Рассчитывается..."
    setData({...Data});
    Data.dayCount = penaltyDuration();
  }
  let count = () => {
    Data.penalty = Data.arrears * Data.dayCount * Data.rate / 100 * PenyConfig.refinanceRate;
  }
  let countEnd = () => {
    Data.loading = false;
    Data.buttonText = "Рассчитать"
    setData({...Data});
  }
  //вычисление пени без запроса
  let countSimple = () => {
    countStart();
    count();
    catchError (200, "");
    Data.tExists = true;
    countEnd();
  }
  //вычисление пени с запросом
  let countFetch = async () => {
    countStart();
    //запрос на страницу
    try {
      const res = await fetch(PenyConfig.reqLink + Data.dateUntil)
      if (res.ok) {
        const data = await res.json();
        Data.rate = data.value;
        count();
        //обработка ошибок
        catchError (data.statusCode, data.message);
        Data.tExists = true;
        countEnd();
      }
    } catch (err) {
      alert(err);
      countEnd();
    }
  }
  //выбор метода расчета
  let countPeny = (e) => {
    e.preventDefault()
    if (Data.checked) {
      countFetch ();
    }
    else {
      countSimple ()
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
          <div className="row">
            <div className="inputP col">Срок окончания поставки товара, выполнения работ, оказания услуг</div>
            <div className="inputP col">Окончание периода просрочки </div>
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
            <DateErrMassage
              eDate={Data.errorDate}
            />
          </div>
          <div className="r">
            <KeyRate
              text = "Укажите ключевую ставку"
              show = {Data.checked}
              onRateReset={handleRateChange}
            />
          </div>
          <div className="r d-flex">
            <button className="btn btn-primary"
                    type="submit"
                    disabled={Data.loading}>
              {Data.buttonText}
            </button>
            <div className="divider"> </div>
            <div className="form-check mt-1">
              <input type="checkbox"
                     className="form-check-input"
                     id="exampleCheck1"
                     checked={Data.checked}
                     onChange = {toggleState}
              />
              <label className="form-check-label align-middle m-1">Получить ключевую ставку на дату</label>
            </div>
          </div>
        </form>
        <div className="r">
          <ServErrMessage
            eCode={Data.errorCode}
            eMessage={Data.errorMassage}
          />
        </div>
        <div className="r">
          <ResultTable
            eCode={Data.errorCode}
            cost={Data.arrears}
            days={Data.dayCount}
            rate={Data.rate}
            peny={Data.penalty}
            tExists={Data.tExists}
          />
        </div>
        <FormulaMessage
          tExists={Data.tExists}
          eCode={Data.errorCode}
          cost={Data.arrears}
          days={Data.dayCount}
          rate={Data.rate}
          peny={Data.penalty}
          refinance={PenyConfig.refinanceRateT}
        />
      </div>
    </div>
  );
}

export default PenyCalculator;