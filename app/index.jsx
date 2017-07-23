import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Modernizr from './modernizr.js';
import EmployeeDetails from './components/EmployeeDetails.jsx';
import Payslip from './components/Payslip.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const AppTitle = () => (
  <AppBar
    title="Payroll calculator"
  />
);

const App = () => (
  <MuiThemeProvider>
    <div className="wrapper">
      <div className="flex-container-row-resp">
        <EmployeeDetails/>
        <Payslip/>
      </div>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('content')
);
