import '../App.css';
import React, {Component} from "react";

export default class ErrorMessage extends Component {

  render() {
    if (this.props.eCode) {
      return (
        <p className="eBox">
          Ошибка! {this.props.eMessage}, код ошибки: {this.props.eCode}
        </p>
      );
    } else {
      return (
        <div> </div>
      )
    }
  }
};