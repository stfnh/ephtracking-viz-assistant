import 'core-js/fn/array/find'; // polyfill for IE support
import 'core-js/fn/array/from';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'react-select/dist/react-select.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

