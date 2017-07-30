import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText, CardActions} from 'material-ui/Card';
import Payslip from './Payslip.jsx';

//set accessible colours for form elements
const styles = {
    floatingLabelFocusStyle: {
        color: "#0A8299"
    },
    floatingLabelStyle: {
        color: "#747474"
    }

}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      surname:'',
      salary: '',
      superPercent: 9.5,
      startDate: '',
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
      <Payslip firstName={this.state.firstName} surname={this.state.surname} salary={this.state.salary} superPercent={this.state.superPercent} startDate={this.state.startDate} />
    )
  }


  render() {
    return (
      <div>
        <Card className="mtb">

          <form >
            <fieldset>
              <CardText>
                <legend>Enter employee details</legend>
                <div className="flex-container-row-resp flex-wrap">
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="First name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="Surname" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="Annual salary" name="salary" type="number" value={this.state.salary} onChange={this.handleInputChange} />
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="Super percentage"  name="superPercent" type="number" value={this.state.superPercent} onChange={this.handleInputChange}/>
                  <TextField  floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="Start date"  name="startDate" type="date" floatingLabelFixed = {true}  value={this.state.startDate} onChange={this.handleInputChange} />
                </div>
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
