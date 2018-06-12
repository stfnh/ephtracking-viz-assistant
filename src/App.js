import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import LineChart from './pages/LineChart';
import ChoroplethMap from './pages/ChoroplethMap';
import BubbleChart from './pages/BubbleChart';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/timeseries" component={LineChart} />
      <Route path="/choropleth" component={ChoroplethMap} />
      <Route path ="/bubblechart" component={BubbleChart} />
    </Fragment>
  </Router>
);

export default App;
