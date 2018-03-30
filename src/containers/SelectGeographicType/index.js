import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class SelectGeographicType extends Component {
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
    this.getOptions(this.props.contentAreaId);
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
          `https://ephtracking.cdc.gov/apigateway/api/v1/geographiclevels/${measureId}`
        );
        this.setState({
          options: response.data,
          value: response.data[0] // default first value
        });
        this.props.handleSelect(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleChange(event) {
    const { options } = this.state;
    this.props.handleSelect(options[event.target.value]);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value, options } = this.state;
    const disabled = this.props.measureId === null;

    const optionsToRender = options.map((item, index) => (
      <option key={index} value={index}>
        {item.geographicType}
      </option>
    ));
    optionsToRender.unshift([
      <option key="-1" value="" disabled>
        Select geographic type
      </option>
    ]);

    return (
      <div className="field">
        <label className="label">Geographic type</label>
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

SelectGeographicType.propTypes = {
  handleSelect: PropTypes.func.isRequired, // callback with geographicType object
  measureId: PropTypes.string
};

export default SelectGeographicType;
