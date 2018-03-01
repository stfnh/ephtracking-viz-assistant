import React, { Component } from 'react';
import CIM from '../../components/CIM';
import VizPreview from '../../components/VizPreview';
import Code from '../../components/Code';

import SelectState from '../../containers/SelectState';
import './LineChart.css';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureId: null,
      state: null,
      view: 'preview'
    };
    this.setMeasureId = this.setMeasureId.bind(this);
    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setView = this.setView.bind(this);
  }

  setMeasureId(measureId) {
    this.setState({
      measureId,
      states: [],
      year: null
    });
  }

  handleStateSelect(state) {
    this.setState({ state });
  }

  handleInputChange(event) {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { measureId, state, view } = this.state;
    const isValid = measureId && state;
    const options = `var options = {
  type: 'line-chart',
  data: {
    measureId: '${measureId}',
    state: '${state}'
  }
};`
    return (
      <div className="container">
        <h1 className="title">Time-series chart of one measure for one state</h1>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <CIM handleSelect={this.setMeasureId} />
        <SelectState
          measureId={this.state.measureId}
          handleSelect={this.handleStateSelect}
        />
      <div className="tabs">
        <ul>
          <li onClick={() => this.setView('preview')} className={view === 'preview' ? 'is-active' : ''}>
            <a>
              <span className="icon is-small"><i className="fas fa-chart-bar"></i></span>
              <span>Preview</span>
            </a>
          </li>
          <li onClick={() => this.setView('code')} className={view === 'code' ? 'is-active': ''}>
            <a>
              <span className="icon is-small"><i className="fas fa-code"></i></span>
              <span>Code</span>
            </a>
          </li>
        </ul>
      </div>
      { view === 'preview' && isValid && <VizPreview measureId={measureId} state={state} /> }
      { view === 'code' && <Code options={options} />}
      </div>
    );
  }
}

export default LineChart;
