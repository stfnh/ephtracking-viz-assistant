import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckboxTree from 'react-checkbox-tree';
import axios from 'axios';
import Select from 'react-select';

/**
 *
 * Select Stratification Level AND its query parameters
 * callback handleSelect will be called with stratificationLevelId and queryParameters
 * 
 */
class SelectOneStratificationLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // stratification level
      stratificationlevels: [],
      // query params
      options: [],
      value: null
    };
    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        options: [],
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
          label: stratification.displayName,
          options: stratification.stratificationItem.map(item => ({
            value: `${stratification.columnName}=${item.localId}`,
            label: item.name
          }))
        }));
        this.setState({ options: stratificationParams });

        // call with empty params
        this.props.handleSelect(this.getStratificationLevelId(''), '');
      } catch (error) {
        console.error(error);
      }
    }
  }

  getStratificationLevelId(value) {
    const { stratificationlevels } = this.state;
    // create new set (unique) with stratification level column names
    const columnName = value.slice(0, value.indexOf('='));
    // find stratifciationLevel with those column names
    const stratificationLevel = stratificationlevels.find(sl => {
      const slColumnNames = new Set(sl.stratificationType.map(st => st.columnName));
      // check if single stratification type
      if (slColumnNames.size === 1 && slColumnNames.has(columnName)) {
        return true;
      } else if (slColumnNames.size === 0 && columnName === '') {
        return true; // no query params
      }
      return false;
    });
    return stratificationLevel && stratificationLevel.id && stratificationLevel.id.toString();
  }

  handleChange(value) {
    this.setState({ value });
    const stratificationLevelId = this.getStratificationLevelId(value ? value.value : '');
    this.props.handleSelect(stratificationLevelId, value ? value.value : '');
  }

  render() {
    const { options, value } = this.state;
    const disabled =
      this.props.measureId === null || this.props.geographicTypeId === null;

    return (
      <Fragment>
        {
          options.length > 0 &&
          <div className="field">
            <label className="label">Stratifications</label>
            <div className="m-t-sm">
              <Select
                value={value}
                onChange={this.handleChange}
                options={options}
                disabled={disabled}
                isClearable
                />
            </div>
            <p className="help">optional; only one stratification for maps</p>
          </div>
        }
      </Fragment>
    );
  }
}

SelectOneStratificationLevel.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  measureId: PropTypes.string,
  geographicTypeId: PropTypes.string
};

export default SelectOneStratificationLevel;
