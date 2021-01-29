import '../PenyStyle.sass';
import React, {Component} from "react";

export default class DateErrMassage extends Component {

  render() {
    if (this.props.eDate) {
      return (
        <p className="eBox">
          Ошибка! Срок окончания периода просрочки должен превышать срок окончания поставки товара, выполнения работ оказания услуг
        </p>
      );
    } else {
      return (
        <div> </div>
      )
    }
  }
};