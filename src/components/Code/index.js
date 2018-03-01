import React, { Fragment }from 'react'
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/styles/hljs';

const Code = ({ options }) => {
  const svgContainer = '<svg id="viz" width="600" height="400"></svg>';
  const snippet = `
<script src="https://d3js.org/d3.v4.min.js"></script>  
<script src="https://unpkg.com/ephtracking-viz/dist/index.umd.min.js"></script>
<script>
  ${options}
  ephtrackingViz.createVisualization('svg#viz', options);
</script>`;
  return (
    <Fragment>
      <h5 className="title is-5">Step 1</h5>
      {/* <h5 class="subtitle is-6">Add a container website at the place where you want to show the visualization.</h5> */}
      <p>Add a container to your HTML document at the place where you want to show the visualization.</p>
      <SyntaxHighlighter style={solarizedDark}>{svgContainer}</SyntaxHighlighter>
      <h5 className="title is-5">Step 2</h5>
      <p>Add this javascript snippet to your HTML document, preferable at the end.</p>
      <SyntaxHighlighter language='javascript' style={solarizedDark}>{snippet}</SyntaxHighlighter>
    </Fragment>
  )
}

Code.propTypes  = {
  options: PropTypes.string.isRequired
};

export default Code