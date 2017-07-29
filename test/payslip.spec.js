import React from 'react';
import {shallow} from 'enzyme';
import Payslip from './../app/components/Payslip';

const wrapper = shallow(<Payslip firstName='Jodi' surname='Goodin' salary='150000' superPercent='17' startDate='' />);
const props = wrapper.instance().props;
test('props came through correctly', () => {
  expect(props.firstName).toBe('Jodi');
  expect(props.surname).toBe('Goodin');
  expect(props.salary).toBe('150000');
  expect(props.superPercent).toBe('17');
  expect(props.startDate).toBe('');
});

test('Gross monthly income: 7500', () => {
  expect(wrapper.instance().calculateGross(90000)).toBe(7500);
});

test('Gross monthly income: 0', () => {
  expect(wrapper.instance().calculateGross(0)).toBe(0);
});

test('Gross monthly income: type error to 0', () => {
  expect(wrapper.instance().calculateGross('test')).toBe(0);
});

test('Gross monthly income: Rounding down', () => {
  expect(wrapper.instance().calculateGross(90001)).toBe(7500);
});

test('Super: 1275', () => {
  expect(wrapper.instance().calculateSuper(7500,17)).toBe(1275);
});

test('Super: 0', () => {
  expect(wrapper.instance().calculateSuper(0,0)).toBe(0);
});

test('Super: type error to 0', () => {
  expect(wrapper.instance().calculateSuper('test','test')).toBe(0);
});

test('Super: Rounding down', () => {
  expect(wrapper.instance().calculateSuper(7501,17)).toBe(1275);
});
