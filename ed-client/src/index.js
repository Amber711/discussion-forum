import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { hashHistory , Router } from 'react-router';
import routes from './routes'

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
);
