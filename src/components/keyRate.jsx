import '../App.css';
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class KeyRate extends Component {

  constructor(props) {
    super(props);
    this.state = {Rate: ""};
  }

  handleRateChange = (e) => {
    this.setState({
      Rate: e.target.value
    });
    this.props.onRateReset(e.target.value);
  }

  render() {
    const {Rate} = this.state
    if (!this.props.show) {
      return (
        <div className="inputRate">
          <div className="r">
            <div className="inputP">{this.props.text}</div>
          </div>
          <input
            className="form-control"
            placeholder={"1.00"}
            type="number"
            step="0.01"
            min="0.00"
            required="required"
            value={Rate}
            onChange={this.handleRateChange}
          />
        </div>
      );
    } else {
      return (
        <div> </div>
      )
    }
  }
};