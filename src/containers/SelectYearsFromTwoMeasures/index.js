import React, { Component, Fragment } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import PropTypes from 'prop-types';
import axios from 'axios';

export class SelectYearsFromTwoMeasures extends Component {
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
    this.loadData(this.props.firstMeasureId, this.props.secondMeasureId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.firstMeasureId !== this.props.firstMeasureId) {
      this.loadData(nextProps.firstMeasureId, nextProps.secondMeasureId);
    }
    if (nextProps.secondMeasureId !== this.props.secondMeasureId) {
      this.loadData(nextProps.secondMeasureId, nextProps.secondMeasureId);
    }
  }

  async loadData(firstMeasureId, secondMeasureId) {
    if (firstMeasureId && secondMeasureId) {
      try {
        const responseOne = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/getYears/${firstMeasureId}`
        );
        const responseTwo = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/getYears/${firstMeasureId}`
        );
        // find common years
        const years = responseOne.data.filter(year => responseTwo.data.includes(year));
        this.setState({
          years,
          expanded: [],
          checked: years // default: all
        });
        this.props.onChange(years);
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
    this.props.onChange(checked);
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
            disabled={this.props.firstMeasureId === null || this.props.secondMeasureId === null}
          />
        </div>
      </Fragment>
    );
  }
}

SelectYearsFromTwoMeasures.propTypes = {
  onChange: PropTypes.func.isRequired,
  firstMeasureId: PropTypes.string,
  secondMeasureId: PropTypes.string
};

export default SelectYearsFromTwoMeasures;
