import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import LineChart from './pages/LineChart';

const App = () => (
  <Router>
    <Layout>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/timeseries" component={LineChart} />
      </Fragment>
    </Layout>
  </Router>
);

export default App;
