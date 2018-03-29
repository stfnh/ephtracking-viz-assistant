import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckboxTree from 'react-checkbox-tree';
import axios from 'axios';

/**
 *
 * Select Stratification Level AND its query parameters
 * callback handleSelect will be called with stratificationLevelId and queryParameters
 * TODO: determine stratificaitonLevelId by selected query parameters
 * 
 */
class SelectStratificationLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // stratification level
      options: [],
      stratifications: [],
      value: '',
      // query params
      parameterOptions: [],
      checked: [],
      expanded: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.setParameterOptions = this.setParameterOptions.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    this.getOptions(this.props.contentAreaId, this.props.geographicTypeId);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.measureId !== this.props.measureId ||
      nextProps.geographicTypeId !== this.props.geographicTypeId
    ) {
      // reset state
      this.setState({
        options: [],
        stratifications: [],
        value: '',
        parameterOptions: [],
        checked: [],
        expanded: []
      });
      this.getOptions(nextProps.measureId, nextProps.geographicTypeId);
    }
  }

  async getOptions(measureId, geographicTypeId) {
    if (measureId && geographicTypeId) {
      try {
        const response = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/stratificationlevel/${measureId}/${geographicTypeId}/0`
        );
        this.setState({
          options: response.data
        });
        const stratifications = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/measurestratification/${measureId}/${geographicTypeId}/0`
        );
        this.setState({
          stratifications: stratifications.data
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // select stratifiation level
  handleChange(event) {
    // reset stratification parameters and fetch new parameters based on selected stratification level
    this.setState(
      {
        value: event.target.value,
        checked: [],
        expanded: []
      },
      () => this.setParameterOptions()
    );
    this.props.handleSelect(event.target.value, '');
  }

  // sets stratifications for selected stratificationLevel (state.parameterOptions)
  // in shape for checkbox tree
  setParameterOptions() {
    const { options, stratifications, value } = this.state;
    // finds the selected stratification level (e.g. State x Gender x Race/Ethnicity)
    const selectedStratificationLevel = options.find(
      o => o.id === parseInt(value, 10)
    );
    // adds the stratification options / params to the stratificationTypes of the selected stratifciation level
    const stratificationParams = selectedStratificationLevel.stratificationType.map(
      st => {
        const stratification = stratifications.find(
          s => s.stratificationTypeId === st.id
        );
        return {
          value: stratification.columnName,
          label: stratification.displayName,
          children: stratification.stratificationItem.map(item => ({
            value: `${stratification.columnName}=${item.localId}`,
            label: item.name
          }))
        };
      }
    );
    this.setState({ parameterOptions: stratificationParams });
  }

  // query params
  handleCheck(checked) {
    this.setState({ checked });

    // preapre params
    const paramsJson = {};
    checked
      .map(d => d.split('='))
      .forEach(
        d =>
          (paramsJson[d[0]] = paramsJson[d[0]]
            ? `${paramsJson[d[0]]},${d[1]}`
            : d[1])
      );
    const preparedParams = [];
    for (let p in paramsJson) {
      preparedParams.push(`${p}=${paramsJson[p]}`);
    }

    // return them
    this.props.handleSelect(this.state.value, preparedParams.join('&'));
  }

  handleExpand(expanded) {
    this.setState({ expanded });
  }

  render() {
    const { value, options, checked, expanded, parameterOptions } = this.state;
    const disabled =
      this.props.measureId === null || this.props.geographicTypeId === null;

    const optionsToRender = options.map((item, index) => (
      <option key={index} value={item.id}>
        {item.name}
      </option>
    ));
    optionsToRender.unshift([
      <option key="-1" value="" disabled>
        Select stratification level
      </option>
    ]);

    return (
      <div className="field">
        <label className="label">Stratification level</label>
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
        {parameterOptions.length > 0 && (
          <div className="m-t-sm">
            <CheckboxTree
              nodes={parameterOptions}
              checked={checked}
              expanded={expanded}
              onCheck={this.handleCheck}
              onExpand={this.handleExpand}
            />
            <p className="help">
              Note: Select at least one item per category. Some items can't be
              grouped.
            </p>
          </div>
        )}
      </div>
    );
  }
}

SelectStratificationLevel.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  measureId: PropTypes.string,
  geographicTypeId: PropTypes.string
};

export default SelectStratificationLevel;
