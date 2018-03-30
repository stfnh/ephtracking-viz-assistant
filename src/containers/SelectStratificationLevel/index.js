import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckboxTree from 'react-checkbox-tree';
import axios from 'axios';

/**
 *
 * Select Stratification Level AND its query parameters
 * callback handleSelect will be called with stratificationLevelId and queryParameters
 * 
 */
class SelectStratificationLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // stratification level
      stratificationlevels: [],
      // query params
      parameterOptions: [],
      checked: [],
      expanded: []
    };
    this.getOptions = this.getOptions.bind(this);
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
        stratificationlevels: [],
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
          stratificationlevels: response.data
        });
        const stratifications = await axios(
          `https://ephtracking.cdc.gov/apigateway/api/v1/measurestratification/${measureId}/${geographicTypeId}/0`
        );
        const stratificationParams = stratifications.data.map(stratification => ({
          value: stratification.columnName,
          label: stratification.displayName,
          children: stratification.stratificationItem.map(item => ({
            value: `${stratification.columnName}=${item.localId}`,
            label: item.name
          }))
        }));
        this.setState({ parameterOptions: stratificationParams });

        // call with empty params
        this.props.handleSelect(this.getStratificationLevelId([]), '');
      } catch (error) {
        console.error(error);
      }
    }
  }

  getStratificationLevelId(checked) {
    const { stratificationlevels } = this.state;
    // create new set (unique) with stratification level column names
    const columnNames = new Set(checked.map(c => c.slice(0, c.indexOf('='))));
    // find stratifciationLevel with those column names
    const stratificationLevel = stratificationlevels.find(sl => {
      const slColumnNames = new Set(sl.stratificationType.map(st => st.columnName));
      // check if equal
      if (slColumnNames.length !== columnNames.length) {
        return false;
      }
      for (let c of columnNames) {
        if (!slColumnNames.has(c)) {
          return false;
        }
      }
      return true;
    });
    return stratificationLevel && stratificationLevel.id && stratificationLevel.id.toString();
  }
  // query params
  handleCheck(checked) {
    this.setState({ checked });
    const stratificationLevelId = this.getStratificationLevelId(checked);

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
    this.props.handleSelect(stratificationLevelId, preparedParams.join('&'));
  }

  handleExpand(expanded) {
    this.setState({ expanded });
  }

  render() {
    const { checked, expanded, parameterOptions } = this.state;
    const disabled =
      this.props.measureId === null || this.props.geographicTypeId === null;

    return (
      <Fragment>
        {
          parameterOptions.length > 0 &&
          <div className="field">
            <label className="label">Stratifications</label>
            <div className="m-t-sm">
              <CheckboxTree
                nodes={parameterOptions}
                checked={checked}
                expanded={expanded}
                onCheck={this.handleCheck}
                onExpand={this.handleExpand}
                disabled={disabled}
                />
            </div>
            <p className="help">optional; some stratifications can't be combined</p>
          </div>
        }
      </Fragment>
    );
  }
}

SelectStratificationLevel.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  measureId: PropTypes.string,
  geographicTypeId: PropTypes.string
};

export default SelectStratificationLevel;
