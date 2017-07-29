import React from 'react';
import {shallow} from 'enzyme';
import Calculator from './../app/components/Calculator';
// import renderer from 'react-test-renderer';
const wrapper = shallow(<Calculator />);

test('sum: 1 + 3 = 4', () => {
    expect(wrapper.instance().sum(1,3)).toBe(4);
});

test('handleInputChange: update first name to Jodi', () => {
  let event = {
    target: {
      name : 'firstName',
      value : 'Jodi'
    }
  }
  wrapper.instance().handleInputChange(event);
  expect(wrapper.instance().state.firstName).toBe('Jodi');
});

test('handleFormSubmit: set state of showPayslip', () => {
  wrapper.instance().handleFormSubmit();
  expect(wrapper.instance().state.showPayslip).toBe(true);
});
