import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createVisualization }from 'ephtracking-viz';

const VizPreview = ({ measureId, state }) => {
  const options = {
    type: 'line-chart',
    data: {
      measureId,
      state
    }
  };
  console.log(options);
  createVisualization('svg', options);
  return(
    <Fragment>
      <svg></svg>
    </Fragment>
  );
}

VizPreview.propTyes = {
  measureId: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

export default VizPreview;
