import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText, CardActions} from 'material-ui/Card';
import Payslip from './Payslip.jsx';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      surname:'',
      salary: '',
      superPercent: 9.5,
      starteDate: '',
      showPayslip: false,
      class: 'NORMAL'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleFormSubmit() {
    this.setState({showPayslip: true});
  }
  sum(a, b) {
    return a + b;
  }
  renderPayslip() {
    return (
      <Card className="mt">
        <CardText>
          <Payslip firstName={this.state.firstName} surname={this.state.surame} salary={this.state.salary} superPercent={this.state.superPercent} startDate={this.state.startDate} />
        </CardText>
      </Card>
    )
  }


  render() {
    return (
      <div>
        <Card className="mt">

          <form >
            <fieldset>
              <CardText>
                <legend>Enter employee details</legend>
                <TextField  floatingLabelText="First name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                <TextField  floatingLabelText="Surname" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                <TextField  floatingLabelText="Annual salary" name="salary" type="number" value={this.state.salary} onChange={this.handleInputChange} />
                <TextField  floatingLabelText="Super percentage"  name="superPercent" type="number" value={this.state.superPercent} onChange={this.handleInputChange}/>
                <TextField  floatingLabelText="Start date"  name="startDate" type="date" floatingLabelFixed = {true}  value={this.state.startDate} onChange={this.handleInputChange} />
              </CardText>
              <CardActions>
                <FlatButton onClick={this.handleFormSubmit} label="Generate payslip" />
              </CardActions>
            </fieldset>
          </form>

        </Card>
        {this.state.showPayslip === true ? this.renderPayslip() : ''}
      </div>
    );
  }
}
export default Calculator;
