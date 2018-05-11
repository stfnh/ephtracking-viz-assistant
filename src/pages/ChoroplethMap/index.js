import React, { Component } from 'react';
import CIM from '../../components/CIM';
import VizPreview from '../../components/VizPreview';
import Code from '../../components/Code';
import SelectYears from '../../containers/SelectYears';
import SelectGeographicType from '../../containers/SelectGeographicType';

// only supports one year and no advanced stratifications at this version
class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureId: null,
      title: null,
      geographicTypeId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      year: null,
      view: 'preview',
      queryParams: ''
    };
    this.setMeasure = this.setMeasure.bind(this);
    this.setGeographicTypeId = this.setGeographicTypeId.bind(this);
    this.setView = this.setView.bind(this);
    this.setYear = this.setYear.bind(this);
  }

  setMeasure(measureId, title) {
    this.setState({
      measureId,
      title,
      geographicTypeId: null,
      geographicTypeIdFilter: null,
      geographicItemsFilter: null,
      isSmoothed: null,
      year: null
    });
  }

  setYear(year) {
    this.setState({ year });
  }

  setGeographicTypeId(geographicType) {
    this.setState({
      geographicTypeId: geographicType.geographicTypeId.toString(),
      isSmoothed: geographicType.smoothingLevelId === 1 ? '0' : '1', // 1 = no smoothing available (api)
      geographicTypeIdFilter: null,
      geographicItemsFilter: null
    });
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { measureId,
      title,
      geographicTypeId,
      geographicTypeIdFilter,
      geographicItemsFilter,
      isSmoothed,
      year,
      queryParams,
      view } = this.state;
    const isValid = measureId && geographicTypeId && isSmoothed && year;
    const options = `var options = {
  type: 'choropleth',
  title: '${title}',
  data: {
    measureId: '${measureId}',
    temporal: '${year}',
    stratificationLevelId: '${geographicTypeId}',
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
          handleCheck={this.setYear}
        />
        <SelectGeographicType
          measureId={measureId}
          handleSelect={this.setGeographicTypeId}
        />
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
        <VizPreview
          type="choropleth"
          measureId={measureId}
          temporal={year}
          stratificationLevelId={geographicTypeId}
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

export default Choropleth;

