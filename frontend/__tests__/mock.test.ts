import React from 'react';

const sum = (a: number, b: number) => a + b;

test('Dummy unit test', () => {
  const actual = sum(1, 2);
  expect(actual).toBe(3);
});
