import '../App.css';
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
        <div className="inputData">
          <input
            type="date"
            className="form-control"
            required=""
            value={Date}
            onChange={this.handleDateChange}
          />
        </div>
    );
  }
};