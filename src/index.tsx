import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './Routes/AppRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
