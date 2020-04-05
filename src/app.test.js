function sum(a, b) {
  return a + b;
}

test('testing summ', () => {
  expect(sum(5, 5)).toBe(10);
});