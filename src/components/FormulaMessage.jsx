import '../PenyStyle.sass';
import React, {Component} from 'react';

export default class FormulaMessage extends Component {
//    Data.penalty = Data.arrears * Data.dayCount * Data.rate / 100 * PenyConfig.refinanceRate;
  render() {
    if (this.props.tExists && this.props.eCode === 200) {
      return (
        <div>
          <div className="r">
            <div className="inputFormula">
              Формула: Цена неисполненных обязательств * Период просрочки * Ставка * {this.props.refinance} = Неустойка
            </div>
          </div>
          <div className="r">
            <div className="inputFormula">
              Расчет: {this.props.cost}руб. * {this.props.days}дн. * {this.props.rate}% * {this.props.refinance} = {this.props.peny.toFixed(2)}руб
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div> </div>
      );
    }
  }
};