import React from 'react';
import isFinite  from 'lodash/isFinite';
import floor  from 'lodash/floor';

export default class Payslip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  calculateGross(salary) {
    if(!isFinite(salary)) {return 0;}
    if(salary <= 0) {return 0;}
    var payPeriodsPerYear = 12;
    return(floor(salary / payPeriodsPerYear));
  }
  calculateSuper(grossPay, superPercent) {
    if(!isFinite(grossPay) && !isFinite(superPercent)) {return 0;}
    if(grossPay <= 0 || superPercent <= 0) {return 0;}
    return(floor(grossPay * (superPercent / 100)));
  }

  render() {
    return (
      <section>
      <h2>Payslip</h2>

      </section>
    );
  }
}
