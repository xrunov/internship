import '../App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class InputFieldMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {arrearsCount: ""};
  }

  handleArrearsChange = (e) => {
    this.setState({
      arrearsCount: e.target.value
    });
    this.props.onArrearsReset(e.target.value);
  }

  render() {
    const {arrearsCount} = this.state
    return <div className="r">
      <div className="inputP">{this.props.text}</div>
      <input
        className="form-control"
        placeholder="0.00 руб"
        type="number"
        step="0.01"
        min="0.00"
        required="required"
        value={arrearsCount}
        onChange={this.handleArrearsChange}
      />
    </div>;

  }
}