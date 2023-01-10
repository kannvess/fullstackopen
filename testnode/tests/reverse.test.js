const { reverse } = require('../utils/for_testing');

describe('reverse', () => {
  test('of a', () => {
    expect(reverse('a')).toBe('a');
  });

  test('of react', () => {
    expect(reverse('react')).toBe('tcaer');
  });

  test('of releveler', () => {
    expect(reverse('releveler')).toBe('releveler');
  });
});
