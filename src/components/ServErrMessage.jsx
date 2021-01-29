import '../PenyStyle.sass';
import React, {Component} from "react";

export default class ServErrMessage extends Component {

  render() {
    if (this.props.eCode !== 200) {
      return (
        <p className="eBox">
          Ошибка! {this.props.eMessage} код ошибки: {this.props.eCode}
        </p>
      );
    } else {
      return (
        <div> </div>
      )
    }
  }
};