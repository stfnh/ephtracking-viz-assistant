import React, { Component, Fragment } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import axios from 'axios';

export class SelectYears extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
      checked: [],
      years: []
    };
    this.loadData = this.loadData.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
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
          expanded: [],
          checked: []
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // reset
      this.setState({
        expanded: [],
        checked: [],
        years: []
      });
    }
  }

  handleCheck(checked) {
    this.setState({ checked });
    this.props.handleCheck(checked);
  }

  handleExpand(expanded) {
    this.setState({ expanded });
  }

  render() {
    const { years } = this.state;

    const nodes = [
      {
        value: 'ALL',
        label: 'All years',
        icon: <i className="fa fa-calendar-check-o" />,
        children: years.map(year => ({
          value: year,
          label: year,
          icon: <i className="fa fa-calendar-plus-o" />
        }))
      }
    ];

    return (
      <Fragment>
        <div className="field">
          <label className="label">Years</label>
          <CheckboxTree
            nodes={nodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={this.handleCheck}
            onExpand={this.handleExpand}
            disabled={this.props.measureId === null}
          />
        </div>
      </Fragment>
    );
  }
}

SelectYears.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  measureId: PropTypes.string
};

export default SelectYears;
