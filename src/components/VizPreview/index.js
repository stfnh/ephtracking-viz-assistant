import React, { Component } from "react";
import PropTypes from "prop-types";
import ephtrackingViz from "ephtracking-viz";
import * as d3 from "d3";

class VizPreview extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: null
    };
  }
  componentDidMount() {
    const {
      type,
      measureId,
      title,
      temporal,
      geographicItemsFilter,
      stratificationLevelId,
      geographicTypeIdFilter,
      isSmoothed,
      queryParams,
      showLegend,
      breakGroups,
      colorScheme
    } = this.props;
    const options = {
      type,
      title,
      showLegend,
      breakGroups,
      colorScheme,
      data: {
        measureId,
        stratificationLevelId,
        geographicTypeIdFilter,
        geographicItemsFilter,
        isSmoothed,
        temporal,
        queryParams
      }
    };
    console.log(options);
    ephtrackingViz.createVisualization(this.svg, options);
  }

  shouldComponentUpdate() {
    // this prevents future re-renders of this component
    return false;
  }

  componentWillReceiveProps(newProps) {
    clearTimeout(this.state.intervalId);
    // clear intervals for animated maps
    if (newProps.type === 'choropleth') {
      this.clearAllIntervals();
    }
    d3
      .select(this.svg)
      .selectAll("*")
      .remove();
    const {
      type,
      measureId,
      title,
      geographicItemsFilter,
      stratificationLevelId,
      geographicTypeIdFilter,
      temporal,
      isSmoothed,
      queryParams,
      showLegend,
      breakGroups,
      colorScheme,
    } = newProps;
    const options = {
      type,
      title,
      showLegend,
      breakGroups,
      colorScheme,
      data: {
        measureId,
        stratificationLevelId,
        geographicTypeIdFilter,
        geographicItemsFilter,
        isSmoothed,
        temporal,
        queryParams
      }
    };
    console.log(options);
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
    const { type } = this.props;
    let width = 900;
    let height = 400;
    if (type === "choropleth") {
      width = 1160;
      height = 640;
    }
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

VizPreview.propTypes = {
  measureId: PropTypes.string.isRequired,
  title: PropTypes.string,
  stratificationLevelId: PropTypes.string.isRequired,
  geographicTypeIdFilter: PropTypes.string,
  geographicItemsFilter: PropTypes.array,
  isSmoothed: PropTypes.string.isRequired,
  temporal: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  showLegend: PropTypes.bool,
  breakGroups: PropTypes.number,
  colorScheme: PropTypes.string
};

export default VizPreview;
