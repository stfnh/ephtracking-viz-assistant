import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import Home from './pages/Home';
import LineChart from './pages/LineChart';
import ChoroplethMap from './pages/ChoroplethMap';
import BubbleChart from './pages/BubbleChart';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
} 

/**
 * @return {null}
 * https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
 */
function Analytics(props){
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: props.location.pathname + props.location.search });
    ReactGA.pageview(props.location.pathname + props.location.search);
  }
  return null;
}

const App = () => (
  <Router>
    <Fragment>
      <Route path="/" component={Analytics} />
      <Route exact path="/" component={Home} />
      <Route path="/timeseries" component={LineChart} />
      <Route path="/choropleth" component={ChoroplethMap} />
      <Route path ="/bubblechart" component={BubbleChart} />
    </Fragment>
  </Router>
);

export default App;
