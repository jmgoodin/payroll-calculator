import React from 'react';
import {shallow} from 'enzyme';
import Payslip from './../app/components/Payslip';

const wrapper = shallow(<Payslip firstName='Jodi' surname='Goodin' salary='150000' superPercent='17' startDate='' />);
const props = wrapper.instance().props;
wrapper.instance().state.taxTablesResponse =
{
    "bracket1": {
        "minRange": 0,
        "maxRange": 18200,
        "taxRate": 0
    },
    "bracket2": {
        "minRange": 18201,
        "maxRange": 37000,
        "taxRate": 0.19
    },
    "bracket3": {
        "minRange": 37001,
        "maxRange": 80000,
        "taxRate": 0.325
    },
    "bracket4": {
        "minRange": 80001,
        "maxRange": 180000,
        "taxRate": 0.37
    },
    "bracket5": {
        "minRange": 180001,
        "taxRate": 0.45
    }
}

// Tests
// Properties
test('props came through correctly', () => {
  expect(props.firstName).toBe('Jodi');
  expect(props.surname).toBe('Goodin');
  expect(props.salary).toBe('150000');
  expect(props.superPercent).toBe('17');
  expect(props.startDate).toBe('');
});

// Gross pay
test('Gross: 7500', () => {
  expect(wrapper.instance().calculateGross(90000)).toBe(7500);
});

test('Gross: 0', () => {
  expect(wrapper.instance().calculateGross(0)).toBe(0);
});

test('Gross: type error to 0', () => {
  expect(wrapper.instance().calculateGross('test')).toBe(0);
});

test('Gross: Rounding down', () => {
  expect(wrapper.instance().calculateGross(90001)).toBe(7500);
});
test('Gross: Rounding up', () => {
  expect(wrapper.instance().calculateGross(90010)).toBe(7501);
});

// Super
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

test('Super: Rounding up', () => {
  expect(wrapper.instance().calculateSuper(7503,17)).toBe(1276);
});

// tax
test('Tax: 0', () => {
  expect(wrapper.instance().calculateTax(0)).toBe(0);
});

test('Tax: type error to 0', () => {
  expect(wrapper.instance().calculateTax('test','test')).toBe(0);
});

test('Tax: bracket 1, earned: 16000, tax: 0', () => {
  expect(wrapper.instance().calculateTax(16000)).toBe(0);
});
test('Tax: bracket 2, earned: 25670, tax: 1419.3, per period: 118', () => {
  expect(wrapper.instance().calculateTax(25670)).toBe(118);
});
test('Tax: bracket 3, earned: 57609, tax: 10269.925, per period: 856', () => {
  expect(wrapper.instance().calculateTax(57609)).toBe(856);
});
test('Tax: bracket 4, earned: 122354, tax: 33217.979999999996, per period: 2768', () => {
  expect(wrapper.instance().calculateTax(122354)).toBe(2768);
});
test('Tax: bracket 5, earned: 309827, tax: 112969.15 , per period: 9414', () => {
  expect(wrapper.instance().calculateTax(309827)).toBe(9414);
});

// Net
test('Net: 0', () => {
  expect(wrapper.instance().calculateNet(0,0)).toBe(0);
});
test('Net: type error to 0', () => {
  expect(wrapper.instance().calculateSuper('test','test')).toBe(0);
});
test('Net: gross: 1333, tax: 0, net per period: 1333', () => {
  expect(wrapper.instance().calculateNet(1333, 0)).toBe(1333);
});
test('Net: gross: 2139, tax: 118, net per period: 2021', () => {
  expect(wrapper.instance().calculateNet(2139, 118)).toBe(2021);
});
test('Net: gross: 25819, tax:9414, net per period: 16405', () => {
  expect(wrapper.instance().calculateNet(25819, 9414)).toBe(16405);
});
