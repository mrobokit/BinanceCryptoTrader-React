import React from "react";

class RangeSlider extends React.Component {
  constructor() {
    super();
    this.state = { value: 100 };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChangeSetQuantity(event.target.value);
  }
  render() {
    return (
      <div>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            style={{ marginRight: "10px" }}
            id="typeinp"
            type="range"
            min="0"
            max="100"
            value={this.state.value}
            onChange={this.handleChange}
            step="25"
          />
          {this.state.value}
        </label>
      </div>
    );
  }
}

export default RangeSlider;
