import { cleanup } from '@testing-library/react';

afterEach(cleanup);

const sum = (a: number, b: number) => {
  return a + b;
};

test('Dummy unit test', () => {
  const actual = sum(1, 2);
  expect(actual).toBe(3);
});
