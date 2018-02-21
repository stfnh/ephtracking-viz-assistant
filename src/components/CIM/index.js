// combines selection of ContentArea, Indicator and Measure in one Component
import React, { Component, Fragment } from 'react';

import SelectContentArea from '../../containers/SelectContentArea';
import SelectIndicator from '../../containers/SelectIndicator';
import SelectMeasure from '../../containers/SelectMeasure';
import PropTypes from 'prop-types';

export class CIM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentAreaId: null,
      indicatorId: null
    };
    this.setContentAreaId = this.setContentAreaId.bind(this);
    this.setIndicatorId = this.setIndicatorId.bind(this);
    this.setMeasureId = this.setMeasureId.bind(this);
  }

  setContentAreaId(contentAreaId) {
    this.setState({ contentAreaId, indicatorId: null });
    this.setMeasureId(null);
  }

  setIndicatorId(indicatorId) {
    this.setState({ indicatorId });
    this.setMeasureId(null);
  }

  setMeasureId(measureId) {
    this.props.handleSelect(measureId);
  }

  render() {
    return (
      <Fragment>
        <SelectContentArea handleSelect={this.setContentAreaId} />
        <SelectIndicator
          contentAreaId={this.state.contentAreaId}
          handleSelect={this.setIndicatorId}
        />
        <SelectMeasure
          indicatorId={this.state.indicatorId}
          handleSelect={this.setMeasureId}
        />
      </Fragment>
    );
  }
}

CIM.propTyes = {
  handleSelect: PropTypes.func.isRequired
};

export default CIM;
