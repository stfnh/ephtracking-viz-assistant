import React, { Component } from 'react';

import CIM from '../../components/CIM';
import VizPreview from '../../components/VizPreview';
import Code from '../../components/Code';
import ErrorBoundary from '../../components/ErrorBoundary';
import AdvancedOptions from '../../components/AdvancedOptions';

import SelectYears from '../../containers/SelectYears';
import SelectGeographicType from '../../containers/SelectGeographicType';
import SelectOneStratificationLevel from '../../containers/SelectOneStratifcationLevel';

// only supports one year and no advanced stratifications at this version
class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureId: null,
      title: null,
      geographicTypeId: null,
      stratificationLevelId: null,
      isSmoothed: null,
      years: null,
      view: 'preview',
      queryParams: '',
      showLegend: null,
      colorScheme: null,
      breakGroups: null
    };
    this.setMeasure = this.setMeasure.bind(this);
    this.setGeographicTypeId = this.setGeographicTypeId.bind(this);
    this.setView = this.setView.bind(this);
    this.setYears = this.setYears.bind(this);
    this.setStratificationLevel = this.setStratificationLevel.bind(this);
    this.onAdvancedOptionsChange = this.onAdvancedOptionsChange.bind(this);
  }

  setMeasure(measureId, title) {
    this.setState({
      measureId,
      title,
      geographicTypeId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      year: null,
      queryParams: ''
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
      geographicItemsFilter: null,
      queryParams: ''
    });
  }

  setStratificationLevel(stratificationLevelId, queryParams) {
    this.setState({
      stratificationLevelId,
      queryParams
    })
  }

  setView(view) {
    this.setState({ view });
  }

  onAdvancedOptionsChange(options) {
    const { showLegend, colorScheme, breakGroups } = options;
    this.setState({
      showLegend, colorScheme, breakGroups
    });
  }

  render() {
    const { measureId,
      title,
      geographicTypeId,
      geographicTypeIdFilter,
      geographicItemsFilter,
      stratificationLevelId,
      isSmoothed,
      years,
      queryParams,
      colorScheme,
      breakGroups,
      showLegend,
      view } = this.state;
    const isValid = measureId && geographicTypeId && isSmoothed && years && stratificationLevelId && colorScheme && breakGroups;
    let temporal;
    if (years && years.length > 0) {
      const min = Number.parseInt(years[0], 10);
      const max = Number.parseInt(years[years.length - 1], 10);
      if (min === max) {
        temporal = min;
      } else if (max === min + years.length - 1){
        temporal = `${min}-${max}`;
      } else {
        temporal = years;
      }
    }
    const options = `var options = {
  type: 'choropleth',
  title: '${title}',
  showLegend: ${showLegend},
  breakGroups: ${breakGroups},
  colorScheme: '${colorScheme}',
  data: {
    measureId: '${measureId}',
    temporal: '${temporal}',
    stratificationLevelId: '${stratificationLevelId}',
    isSmoothed: '${isSmoothed}',
    queryParams: '${queryParams}'
    }
  };`
    return (
      <div className="container">
        <h1 className="title">Choropleth map</h1>
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
        <SelectOneStratificationLevel
          measureId={measureId}
          geographicTypeId={geographicTypeId}
          handleSelect={this.setStratificationLevel}
        />
        <AdvancedOptions handleChange={this.onAdvancedOptionsChange} />

      <div className="tabs">
        <ul>
          <li onClick={() => this.setView('preview')} className={view === 'preview' ? 'is-active' : ''}>
            <a>
              <span className="icon is-small"><i className="fa fa-globe"></i></span>
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
        <ErrorBoundary>
          <VizPreview
            type="choropleth"
            measureId={measureId}
            temporal={temporal}
            stratificationLevelId={stratificationLevelId}
            geographicTypeIdFilter={geographicTypeIdFilter}
            geographicItemsFilter={geographicItemsFilter}
            isSmoothed={isSmoothed}
            queryParams={queryParams}
            title={title}
            showLegend={showLegend}
            breakGroups={breakGroups}
            colorScheme={colorScheme}
          />
        </ErrorBoundary>
      }
      { view === 'code' && <Code options={options} width={1160} height={640} />}
    </div>
    );
  }
}

export default Choropleth;

