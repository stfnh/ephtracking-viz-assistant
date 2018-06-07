import React, { Component } from 'react';
import Title from '../../components/Title';
import CIM from '../../components/CIM';
import SelectYearsFromTwoMeasures from '../../containers/SelectYearsFromTwoMeasures';

class BubbleChart extends Component {
  state = {
    title: '',
    xMeasureId: null,
    yMeasureId: null,
    years: []
  };

  handleTitleChange = title => {
    this.setState({ title });
  }

  handleXMeasureIdChange = xMeasureId => {
    this.setState({ xMeasureId });
  }

  handleYMeasureIdChange = yMeasureId => {
    this.setState({ yMeasureId });
  }

  handleYearsChange = years => {
    this.setState({ years });
  }

  render() {
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
          firstMeasureId={this.state.xMeasureid}
          secondMeasureId={this.state.yMeasureId}
          onChange={this.handleYearsChange}
        />
      </div>
    );
  }
}

export default BubbleChart;
