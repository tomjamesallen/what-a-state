import { HELLO_WORLD } from './compare';

test('it should hello', () => {
  expect(HELLO_WORLD).toMatchInlineSnapshot(`"Hello World!"`);
});
