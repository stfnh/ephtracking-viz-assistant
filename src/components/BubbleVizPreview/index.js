import React, { Component } from "react";
import PropTypes from "prop-types";
import ephtrackingViz from "ephtracking-viz";
import * as d3 from "d3";

class BubbleVizPreview extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: null
    };
  }

  componentDidMount() {
    this.clearAllIntervals();
    const {
      xMeasureId,
      xLabel,
      yMeasureId,
      yLabel,
      title,
      temporal
    } = this.props;
    const options = {
      type: "bubble",
      title,
      data: {
        x: {
          measureId: xMeasureId,
          label: xLabel
        },
        y: {
          measureId: yMeasureId,
          label: yLabel
        },
        temporal
      }
    };
    ephtrackingViz.createVisualization(this.svg, options);
  }

  shouldComponentUpdate() {
    // this prevents future re-renders of this component
    return false;
  }

  componentWillReceiveProps(newProps) {
    clearTimeout(this.state.intervalId);
    // clear intervals
    this.clearAllIntervals();
    d3.select(this.svg)
      .selectAll("*")
      .remove();
    const {
      xMeasureId,
      xLabel,
      yMeasureId,
      yLabel,
      title,
      temporal
    } = this.props;
    const options = {
      type: "bubble",
      title,
      data: {
        x: {
          measureId: xMeasureId,
          label: xLabel
        },
        y: {
          measureId: yMeasureId,
          label: yLabel
        },
        temporal
      }
    };

    // to avoid overdrawing
    const intervalId = setTimeout(
      () => ephtrackingViz.createVisualization(this.svg, options),
      200
    );
    this.setState({ intervalId });
  }

  clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  }

  render() {
    let width = this.props.width;
    let height = this.props.height;
    return (
      <svg
        width={width}
        height={height}
        ref={elem => {
          this.svg = elem;
        }}
      />
    );
  }
}

BubbleVizPreview.propTypes = {
  title: PropTypes.string,
  temporal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  xMeasureId: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yMeasureId: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

BubbleVizPreview.defaultProps = {
  width: 700,
  height: 700
};

export default BubbleVizPreview;
