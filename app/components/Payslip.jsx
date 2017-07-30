import React from 'react';
import isFinite  from 'lodash/isFinite';
import toNumber  from 'lodash/toNumber';
import round  from 'lodash/round';
import map  from 'lodash/map';
import has  from 'lodash/has';
import sum  from 'lodash/sum';
import request from 'superagent';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Loader from './Loader.jsx';

export default class Payslip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      payPeriodsPerYear: 12,
      dataLoaded: false
    };

  }
  componentWillMount = () => {
    this.getTaxTables();
  }

  getTaxTables = () => {
    request
      .get('https://mocksvc.mulesoft.com/mocks/857fa75a-8ca1-4dd1-beb4-9b4407da993e/taxTables')
      .accept('json')
      .end((error, response) => {
        this.setState({
          taxTablesResponse:response.body,
          error:error,
          dataLoaded: true
        });
      });
  };

  calculateGross = (salary) => {
    salary = toNumber(salary);
    if(!isFinite(salary)) {return 0;}
    if(salary <= 0) {return 0;};
    return(round(salary / this.state.payPeriodsPerYear));
  }
  calculateTax(salary) {
    if(!isFinite(salary)) {return 0;}
    if(salary <= 0) {return 0;}
    var bracketSalary = 0;

    var tax = map(this.state.taxTablesResponse, function(taxBracket) {
      bracketSalary = salary;
      if(has(taxBracket, 'maxRange')) {
        if(salary >= taxBracket.maxRange) { bracketSalary = taxBracket.maxRange; }
      }
      if(salary >= taxBracket.minRange) {
        bracketSalary = bracketSalary - (taxBracket.minRange -1); // account for the $1 from the >= in min-range
      }
      else {
        bracketSalary = 0;
      }
      return(bracketSalary * taxBracket.taxRate);
    })
    return(round(sum(tax)/this.state.payPeriodsPerYear));
  }
  calculateNet(grossPay, tax) {
    if(!isFinite(grossPay) && !isFinite(tax)) {return 0;}
    if(grossPay <= 0 || tax < 0) {return 0;}
    return(round(grossPay - tax));
  }
  calculateSuper(grossPay, superPercent) {
    if(!isFinite(grossPay) && !isFinite(superPercent)) {return 0;}
    if(grossPay <= 0 || superPercent <= 0) {return 0;}
    return(round(grossPay * (superPercent / 100)));
  }

  render() {
    if(!this.state.dataLoaded) {return (<Loader />)}

    var grossEarnings = this.calculateGross(toNumber(this.props.salary)),
        taxPaid = this.calculateTax(toNumber(this.props.salary)),
        netPay = this.calculateNet(grossEarnings, taxPaid),
        superPaid = this.calculateSuper(toNumber(this.props.salary), toNumber(this.props.superPercent));

    return (
      <section>
        <h2>Payslip</h2>
        <Card className="mbd">
          <CardHeader title="Cindertom creations"
                      subtitle="ABN 10 100 100 100"
                      avatar="" />
          <CardText>
            <div className="payee-details box-model-block">
              <h3>Payee details</h3>
              <ul className="no-list-style">
                <li>{this.props.firstName} {this.props.surname}</li>
                <li>Annual salary: {this.props.salary}</li>
              </ul>
            </div>
            <div className="pay-overview box-model-block">
              <ul className="no-list-style flex-container-row-resp space-between med-txt ptb bg-dark plr">
                <li>Pay period {this.props.startDate}</li>
                <li>Total earnings ${grossEarnings}</li>
                <li>Net pay ${netPay}</li>
              </ul>
            </div>
            <div className="pay-details box-model-block">
              <h3>Wages</h3>
              <ul className="no-list-style flex-container-column align-end payslip-row">
                <li>Total earnings ${grossEarnings}</li>
                <li>Net pay ${netPay}</li>
              </ul>
            </div>
            <div className="tax-details box-model-block">
              <h3>PAYG Tax</h3>
              <ul className="no-list-style flex-container-row-resp flex-end payslip-row">
                <li>Tax withheld ${taxPaid}</li>
              </ul>
            </div>
            <div className="super-details box-model-block">
              <h3>Superannuation</h3>
              <ul className="no-list-style flex-container-row-resp flex-end payslip-row">
                <li>Employer contribution ${superPaid}</li>
              </ul>
            </div>
          </CardText>
        </Card>
      </section>
    );
  }
}
