import React from 'react';
import moment from 'moment';
import map  from 'lodash/map';
import join  from 'lodash/join';
import find  from 'lodash/find';
import has from 'lodash/has';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText, CardActions} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
const monthsInPast = 3;
const monthsInFuture = 3;

const payPeriods =  createPayPeriods();
function  createPayPeriods() {
  var payPeriods = [],
      period = moment().subtract(monthsInPast,'months');
  // for the configurable months before and after as well as this month
  for(var i=0;i<(monthsInPast + monthsInFuture + 1);i++) {
    var currentMonth = moment(period).format('M'),
        startDate = moment(period).startOf('month').format('DD MMM YYYY'),
        endDate = moment(period).endOf('month').format('DD MMM YYYY'),
        newPeriod = {
          "text": join([startDate, endDate], '-'),
          "value": currentMonth
        };
    payPeriods.push(newPeriod);
    period = moment(period).add(1, 'months');
  }
  return(payPeriods);
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      superPercent: 9.5,
      showPayslip: false
    }
  }


  renderPayPeriods() {
    return payPeriods.map((period) => (
      <MenuItem
        key={period.value}
        insetChildren={true}
        value={period.value}
        primaryText={period.text}
        checked={this.state.startDateValue === period.value}
      />
    ));
  }
  validateTextField = (name,value) => {
    switch(name) {
      case 'superPercent' : {
        if(value > 50) {
          this.setState({
            superHint: "This can only be 50% or less"
          })
          return false;
        }
      }
      default:
        return true;
    }
  }
  handleInputChange = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    var valid = this.validateTextField(name,value);
    if (valid) {
      this.setState({
        [name]: value
      });
    }
  }
  handleSelectChange = (event, index, value) => {
    this.setState({
      startDateValue: value,
      startDate: find(payPeriods,{'value': value}).text
    });
  }

  handleFormSubmit = () => {
    this.setState({showPayslip: true});
  }

  renderPayslip() {
    return (
      <Payslip firstName={this.state.firstName} surname={this.state.surname} salary={this.state.salary} superPercent={this.state.superPercent} startDate={this.state.startDate} />
    )
  }


  render() {
    return (
      <div>

        <Card className="mtb calc-form">

          <form >
            <fieldset>
              <CardText>
                <legend>Enter employee details</legend>
                <div className="flex-container-row-resp flex-wrap">
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="First name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                  <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="half"
                            floatingLabelText="Surname" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                  <SelectField
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    floatingLabelText="Pay period"
                    value={this.state.startDateValue}
                    name="startDate"
                    onChange={this.handleSelectChange}
                    className="half"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  >
                    {this.renderPayPeriods()}
                  </SelectField>
                  <div className="half flex-container-row align-baseline">
                      <div className="input-decorator left">$</div>
                      <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="full"
                            floatingLabelText="Annual salary" name="salary" type="number" value={this.state.salary} onChange={this.handleInputChange} />
                  </div>
                  <div className="half flex-container-row align-baseline">
                      <TextField floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} className="full"
                            floatingLabelText="Super percentage"  name="superPercent" type="number" value={this.state.superPercent} onChange={this.handleInputChange}
                            hintText={this.state.superHint} />
                      <div className="input-decorator right">%</div>
                  </div>
                </div>
              </CardText>
              <CardActions>
                <FlatButton id="generatePayslip" onClick={(e) => this.handleFormSubmit(e)} label="Generate payslip" />
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
