import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';

import 'react-select/dist/react-select.css';

import states from './states';

class SelectStates extends Component {
  state = {
    statesByMeasure: [],
    selectedOptions: []
  }

  componentDidMount() {
    this.loadData(this.props.measureId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.measureId !== this.props.measureId) {
      this.loadData(nextProps.measureId);
    }
  }

  loadData = async measureId => {
    if (measureId) {
      try {
        const response = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/getStates/${measureId}`
        );
        this.setState({
          statesByMeasure: response.data
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // reset
      this.setState({
        statesByMeasure: [],
        selectedOptions: []
      });
    }
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    this.props.handleSelect(selectedOptions);
  }

  render() {
    const { selectedOptions, statesByMeasure } = this.state;
    const value = selectedOptions;
    const filteredStates = states.filter(item =>
      statesByMeasure.find(fips => item.value === fips)
    );

    return (
      <div className="field">
        <label className="label">Select state(s)</label>
        <div className="control">
          <div className="select" style={{minWidth: 300}}>
            <Select
              name="select-states"
              value={value}
              onChange={this.handleChange}
              options={filteredStates}
              disabled={this.props.measureId === null}
              multi
            />
          </div>
        </div>
      </div>
    );
  }
};

SelectStates.propTypes = {
  measureId: PropTypes.string,
  handleSelect: PropTypes.func.isRequired
};

export default SelectStates;

