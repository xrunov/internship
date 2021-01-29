import '../PenyStyle.sass';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class InputFieldDate extends Component {

  constructor(props) {
    super(props);
    this.state = {Date: ""};
  }

  handleDateChange = (e) => {
    this.setState({
      Date: e.target.value
    });
    this.props.onDateReset(e.target.value);
  }

  render() {
    const {Date} = this.state
    return (
        <div className="inputDate">
          <input
            type="date"
            className="form-control"
            required="required"
            value={Date}
            onChange={this.handleDateChange}
          />
        </div>
    );
  }
};