import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import LineChart from './pages/LineChart';
import ChoroplethMap from './pages/ChoroplethMap';

const App = () => (
  <Router>
    <Layout>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/timeseries" component={LineChart} />
        <Route path="/choropleth" component={ChoroplethMap} />
      </Fragment>
    </Layout>
  </Router>
);

export default App;
