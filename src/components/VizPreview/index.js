import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ephtrackingViz from 'ephtracking-viz';
import * as d3 from 'd3';

class VizPreview extends Component {
  componentDidMount() {
    const { measureId, states } = this.props;
    const options = {
      type: 'line-chart',
      data: {
        measureId,
        states
      }
    };
    ephtrackingViz.createVisualization(this.svg, options);
  }

  shouldComponentUpdate() {
    // this prevents future re-renders of this component
    return false;
  }

  componentWillReceiveProps(newProps) {
    d3.select(this.svg).selectAll('*').remove();
    const { measureId, states } = newProps;
    const options = {
      type: 'line-chart',
      data: {
        measureId,
        states
      }
    };
    ephtrackingViz.createVisualization(this.svg, options);

  }

  render() {
    return (
      <svg width="800" height="400" ref={elem => { this.svg = elem; }} />
    );
  }
};

VizPreview.propTypes = {
  measureId: PropTypes.string.isRequired,
  states: PropTypes.array.isRequired
};

export default VizPreview;
