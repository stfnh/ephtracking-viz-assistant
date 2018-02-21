import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import STATES from './states';

class SelectState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    this.getOptions(this.props.measureId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.measureId !== this.props.measureId) {
      this.setState({ value: '' });
      this.getOptions(nextProps.measureId);
    }
  }

  async getOptions(measureId) {
    if (measureId) {
      try {
        const response = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/getStates/${measureId}`
        );
        const filteredStates = STATES.filter(item =>
          response.data.find(fips => item.value === fips)
        );
        this.setState({
          options: filteredStates
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleChange(event) {
    this.props.handleSelect(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value, options } = this.state;
    const disabled = this.props.measureId === null;

    const optionsToRender = options.map(item => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ));
    optionsToRender.unshift([
      <option key="-1" value="" disabled>
        Select state
      </option>
    ]);

    return (
      <div className="field">
        <label className="label">State</label>
        <div className="control">
          <div className="select">
            <select
              value={value}
              onChange={this.handleChange}
              disabled={disabled}
            >
              {optionsToRender}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

SelectState.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  measureId: PropTypes.string
};

export default SelectState;
