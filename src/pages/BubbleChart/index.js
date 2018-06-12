import React, { Component } from 'react';
import Title from '../../components/Title';
import CIM from '../../components/CIM';
import SelectYearsFromTwoMeasures from '../../containers/SelectYearsFromTwoMeasures';
import ErrorBoundary from '../../components/ErrorBoundary';
import BubbleVizPreview from '../../components/BubbleVizPreview';
import Code from '../../components/Code';

class BubbleChart extends Component {
  state = {
    title: null,
    xMeasureId: null,
    xLabel: null,
    yMeasureId: null,
    yLabel: null,
    years: null,
    view: 'preview'
  };

  handleTitleChange = title => {
    this.setState({ title });
  }

  handleXMeasureIdChange = (xMeasureId, xLabel) => {
    this.setState({ xMeasureId, xLabel, years: null });
  }

  handleYMeasureIdChange = (yMeasureId, yLabel) => {
    this.setState({ yMeasureId, yLabel, years: null });
  }

  handleYearsChange = years => {
    this.setState({ years });
  }

  setView = view => this.setState({ view });

  render() {
    const {
      title,
      xMeasureId,
      xLabel,
      yMeasureId,
      yLabel,
      years,
      view
    } = this.state;
    const isValid = xMeasureId && yMeasureId && years && years.length > 0;
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
      type: 'bubble',
      ${title ? `title: '${title}'` : ''}
      data: {
        x: {
          measureId: '${xMeasureId}',
          label: '${xLabel}'
        },
        y: {
          measureId: '${yMeasureId}',
          label: '${yLabel}'
        },
        temporal: '${temporal}'
      }
    };`

    return (
      <div className="container">
        <h1 className="title">Bubble chart</h1>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <Title onChange={this.handleTitleChange} />
        <hr />
        <h5 className="title is-5">x-axis:</h5>
        <CIM handleSelect={this.handleXMeasureIdChange} />
        <h5 className="title is-5">y-axis:</h5>
        <CIM handleSelect={this.handleYMeasureIdChange} />
        <hr />
        <SelectYearsFromTwoMeasures
          firstMeasureId={this.state.xMeasureId}
          secondMeasureId={this.state.yMeasureId}
          onChange={this.handleYearsChange}
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
        <ErrorBoundary>
          <BubbleVizPreview
            type="bubble"
            title={title}
            xMeasureId={xMeasureId}
            xLabel={xLabel}
            yMeasureId={yMeasureId}
            yLabel={yLabel}
            temporal={temporal}
          />
        </ErrorBoundary>
      }

      { view === 'code' && <Code options={options} width={800} height={700} />}

      </div>
    );
  }
}

export default BubbleChart;
