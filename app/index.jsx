import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Modernizr from './modernizr.js';
import Calculator from './components/Calculator.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
injectTapEventPlugin();

const AppTitle = () => (
  <AppBar
    title="Payroll calculator"
    showMenuIconButton={false}
    className="bg-gradient app-title"
  />
);

const App = () => (
  <MuiThemeProvider>
    <div>
    <AppTitle/>
    <div className="wrapper">
      <div className="flex-container-row-resp">
        <Calculator />
      </div>
    </div>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('content')
);
