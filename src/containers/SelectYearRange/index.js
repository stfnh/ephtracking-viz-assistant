import React, { Component, Fragment } from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import axios from 'axios';

import 'rc-slider/assets/index.css';
import './SelectYearRange.css';

export class SelectYearRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      value: []
    };
    this.loadData = this.loadData.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    this.setState({ value });

    if (value[0] === value[1]) {
      this.props.handleChange(value[0].toString());
    } else {
      this.props.handleChange((`${value[0]}-${value[1]}`));
    }
  }

  componentDidMount() {
    this.loadData(this.props.measureId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.measureId !== this.props.measureId) {
      this.loadData(nextProps.measureId);
    }
  }

  async loadData(measureId) {
    if (measureId) {
      try {
        const response = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/getYears/${measureId}`
        );
        this.setState({
          years: response.data,
          value: [parseInt(response.data[0], 10),
            parseInt(response.data[response.data.length - 1], 10)]
        });
        // ToDo: 1st callback
      } catch (error) {
        console.error(error);
      }
    } else {
      // reset
      this.setState({
        years: []
      });
    }
  }

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const { years, value } = this.state;
    const { measureId } = this.props;
    const disabled = measureId === null;
    let min = 0;
    let max = 0;
    if (years.length > 0) {
      min = parseInt(years[0], 10);
      max = parseInt(years[years.length - 1], 10);
    }

    return (
      <Fragment>
        <div className="field">
          <label className="label label-years">Years</label>
          <Range
            className="yearslider"
            disabled={disabled}
            min={min}
            max={max}
            value={value}
            onChange={this.setValue}
          />
        </div>
      </Fragment>
    );
  }
}

SelectYearRange.propTypes = {
  measureId: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default SelectYearRange;
