const { dummy } = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  expect(dummy(blogs)).toBe(1);
});
