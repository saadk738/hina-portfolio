import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './Context';
import AppRouter from './config/AppRouter';

ReactDOM.render(
  <ThemeProvider>
    <AppRouter/>
  </ThemeProvider>,
  document.getElementById('root')
);
