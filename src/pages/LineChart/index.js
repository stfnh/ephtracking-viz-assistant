import React, { Component } from 'react';
import CIM from '../../components/CIM';
import VizPreview from '../../components/VizPreview';
import Code from '../../components/Code';
import GeographicFilter from '../../components/GeographicFilter';
import SelectYears from '../../containers/SelectYears';
import SelectStratificationLevel from '../../containers/SelectStratificationLevel';

import SelectGeographicType from '../../containers/SelectGeographicType';
import './LineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureId: null,
      title: null,
      geographicTypeId: null,
      stratificationLevelId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      years: null,
      view: 'preview',
      queryParams: ''
    };
    this.setMeasure = this.setMeasure.bind(this);
    this.setGeographicTypeId = this.setGeographicTypeId.bind(this);
    this.setGeographicFilter = this.setGeographicFilter.bind(this);
    this.setView = this.setView.bind(this);
    this.setYears = this.setYears.bind(this);
    this.setStratificationLevel = this.setStratificationLevel.bind(this);
  }

  setMeasure(measureId, title) {
    console.log(measureId);
    console.log(title);
    this.setState({
      measureId,
      title,
      geographicTypeId: null,
      stratificationLevelId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      years: null
    });
  }

  setYears(years) {
    this.setState({ years });
  }

  setGeographicTypeId(geographicType) {
    this.setState({
      geographicTypeId: geographicType.geographicTypeId.toString(),
      isSmoothed: geographicType.smoothingLevelId === 1 ? '0' : '1', // 1 = no smoothing available (api)
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
  
  setStratificationLevel(stratificationLevelId, queryParams) {
    console.log(stratificationLevelId);
    console.log(queryParams);
    this.setState({
      stratificationLevelId,
      queryParams
    })
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { measureId,
      title,
      geographicTypeId,
      stratificationLevelId,
      geographicTypeIdFilter,
      geographicItemsFilter,
      isSmoothed,
      years,
      queryParams,
      view } = this.state;
    const isValid = measureId && geographicTypeId && stratificationLevelId &&
      geographicTypeIdFilter && geographicItemsFilter && isSmoothed && years;
    let temporal;
    if (years && years.length > 0) {
      const min = years[0];
      const max = years[years.length - 1];
      if (min === max) {
        temporal = min;
      } else {
        temporal = `${min}-${max}`;
      }
    }
    const options = `var options = {
  type: 'line-chart',
  title: '${title}',
  data: {
    measureId: '${measureId}',
    temporal: '${temporal}',
    stratificationLevelId: '${stratificationLevelId}',
    geographicTypeIdFilter: '${geographicTypeIdFilter}',
    geographicItemsFilter: ['${geographicItemsFilter && geographicItemsFilter.join("', '")}'],
    isSmoothed: '${isSmoothed}',
    queryParams: '${queryParams}'
    }
  };`
    return (
      <div className="container">
        <h1 className="title">Time-series chart</h1>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <CIM handleSelect={this.setMeasure} />
        <SelectYears
          measureId={measureId}
          handleCheck={this.setYears}
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
        <SelectStratificationLevel
          measureId={measureId}
          geographicTypeId={geographicTypeId}
          handleSelect={this.setStratificationLevel}
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
          queryParams={queryParams}
          title={title}
        />
      }
      { view === 'code' && <Code options={options} />}
    </div>
    );
  }
}

export default LineChart;

