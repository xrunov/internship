import '../App.css';
import React, {Component} from 'react';

export default class ResultTable extends Component{

  render() {
    return (
      <table className="tableResult" border="1px" cellSpacing="0">
        <tbody>
        <tr align="center">
          <td>Цена неисполненных обязательств</td>
          <td>Период просрочки</td>
          <td>Ставка</td>
          <td>Неустойка</td>
        </tr>
        <tr align="center">
          <td>{this.props.cost}</td>
          <td>{this.props.days}</td>
          <td>{this.props.rate}</td>
          <td>{this.props.peny}</td>
        </tr>
        </tbody>
      </table>
    );
  }
};