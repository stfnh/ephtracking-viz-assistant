import React, { Component } from 'react';
import CIM from '../../components/CIM';
import VizPreview from '../../components/VizPreview';
import Code from '../../components/Code';
import GeographicFilter from '../../components/GeographicFilter';
import SelectYearRange from '../../containers/SelectYearRange';

import SelectGeographicType from '../../containers/SelectGeographicType';
import './LineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureId: null,
      geographicTypeId: null,
      stratificationLevelId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      years: null,
      view: 'preview'
    };
    this.setMeasureId = this.setMeasureId.bind(this);
    this.setGeographicTypeId = this.setGeographicTypeId.bind(this);
    this.setGeographicFilter = this.setGeographicFilter.bind(this);
    this.setView = this.setView.bind(this);
    this.setYears = this.setYears.bind(this);
  }

  setMeasureId(measureId) {
    this.setState({
      measureId,
      geographicTypeId: null,
      stratificationLevelId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null
    });
  }

  setYears(years) {
    this.setState({ years });
  }

  setGeographicTypeId(geographicType) {
    this.setState({
      geographicTypeId: geographicType.geographicTypeId.toString(),
      isSmoothed: geographicType.smoothingLevelId === 1 ? '0' : '1', // 1 = no smoothing available (api)
      stratificationLevelId: geographicType.geographicTypeId.toString(), // stratification not supported yet
      geographicTypeIdFilter: null,
      geographicItemsFilter: null
    });
  }
  
  setGeographicFilter(filter) {
    this.setState({
      geographicTypeIdFilter: filter.geographicTypeIdFilter,
      geographicItemsFilter: filter.geographicItemsFilter.map(i => i.value)
    });
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { measureId,
      geographicTypeId,
      stratificationLevelId,
      geographicTypeIdFilter,
      geographicItemsFilter,
      isSmoothed,
      years,
      view } = this.state;
    const isValid = measureId && geographicTypeId && stratificationLevelId &&
      geographicTypeIdFilter && geographicItemsFilter && isSmoothed && years;
    const options = `var options = {
  type: 'line-chart',
  data: {
    measureId: '${measureId}',
    years: '${years}',
    stratificationLevelId: '${stratificationLevelId}',
    geographicTypeIdFilter: '${geographicTypeIdFilter}',
    geographicItemsFilter: ['${geographicItemsFilter && geographicItemsFilter.join("', '")}'],
    isSmoothed: '${isSmoothed}'
    }
  };`
    return (
      <div className="container">
        <h1 className="title">Time-series chart</h1>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <CIM handleSelect={this.setMeasureId} />
        <SelectYearRange
          measureId={measureId}
          handleChange={this.setYears}
        />
        <SelectGeographicType
          measureId={measureId}
          handleSelect={this.setGeographicTypeId}
        />
        <GeographicFilter
          measureId={measureId}
          geographicTypeId={geographicTypeId}
          handleSelect={this.setGeographicFilter}
        />
      <div className="tabs">
        <ul>
          <li onClick={() => this.setView('preview')} className={view === 'preview' ? 'is-active' : ''}>
            <a>
              <span className="icon is-small"><i className="fa fa-line-chart"></i></span>
              <span>Preview</span>
            </a>
          </li>
          <li onClick={() => this.setView('code')} className={view === 'code' ? 'is-active': ''}>
            <a>
              <span className="icon is-small"><i className="fa fa-code"></i></span>
              <span>Code</span>
            </a>
          </li>
        </ul>
      </div>
      { view === 'preview' && isValid &&
        <VizPreview
          measureId={measureId}
          temporal={years}
          stratificationLevelId={stratificationLevelId}
          geographicTypeIdFilter={geographicTypeIdFilter}
          geographicItemsFilter={geographicItemsFilter}
          isSmoothed={isSmoothed}
        />
      }
      { view === 'code' && <Code options={options} />}
    </div>
    );
  }
}

export default LineChart;
