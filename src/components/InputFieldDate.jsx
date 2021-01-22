import '../App.css';
import React, {Component} from 'react';

export default class InputFieldDate extends Component{
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
      <div className="Container">
        <div className="inputP">{this.props.text}</div>
        <input
          className="inputData"
          type="date"
          required="required"
          value={Date}
          onChange={this.handleDateChange}
        />
      </div>
    );
  }
};