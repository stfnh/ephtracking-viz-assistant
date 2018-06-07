import React, { Component } from "react";
import PropTypes from "prop-types";

class Title extends Component {
  state = {
    value: ''
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return (
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Chart title"
            onChange={this.handleChange}
            value={this.value}
          />
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Title;
