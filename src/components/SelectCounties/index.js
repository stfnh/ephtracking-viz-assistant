import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import COUNTIES from './counties';

/**
 *
 * @class SelectCounties
 * @extends {Component}
 *
 * Renders a react-select of counties
 * of a certain state (prop: StateFIPS)
 *
 */
class SelectCounties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counties: [],
      selectedOptions: []
    };
    this.filterCountiesByState = this.filterCountiesByState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.filterCountiesByState(this.props.stateFips);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stateFips !== this.props.stateFips) {
      this.filterCountiesByState(nextProps.stateFips);
    }
  }

  filterCountiesByState(stateFips) {
    const counties = COUNTIES.filter(c => stateFips === c.stateFips).map(c => ({
      value:
        c.stateFips.toString().padStart(2, '0') +
        c.countyFips.toString().padStart(3, '0'),
      label: c.countyName
    }));
    this.setState({ counties });
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    this.props.handleSelect(selectedOptions);
  }

  render() {
    const { selectedOptions, counties } = this.state;
    return (
      <Fragment>
        <div className="field">
          <label className="label">Select counties</label>
          <div className="control">
            <div style={{maxWidth: 450}}>
              <Select
                name="select-states"
                value={selectedOptions}
                onChange={this.handleChange}
                options={counties}
                disabled={this.props.stateFips === null}
                isMulti
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

SelectCounties.propTypes = {
  stateFips: PropTypes.number,
  handleSelect: PropTypes.func.isRequired
};

export default SelectCounties;
