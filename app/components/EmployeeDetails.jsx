import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class EmployeeDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <section>
        <form>
          <fieldset>
            <legend>Enter employee details</legend>
            <TextField  floatingLabelText="First name" />
            <TextField  floatingLabelText="Annual salary" type="number" />
            <TextField  floatingLabelText="Super percentage" type="number" />
            <TextField  floatingLabelText="Start date" type="date" floatingLabelFixed = {true} />
            <FlatButton label="Generate payslip" />
          </fieldset>
        </form>  
      </section>
    );
  }
}
