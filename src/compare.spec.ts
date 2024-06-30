import { compare } from './compare';

describe('simple enum', () => {
  const api = compare(['a', 'b', 'c'] as const);

  test('matches', () => {
    expect(api('a').matches('a')).toBe(true);
    expect(api('b').matches('b')).toBe(true);
    expect(api('c').matches('c')).toBe(true);

    expect(api('a').matches('b')).toBe(false);
    expect(api('b').matches('c')).toBe(false);
  });

  test('gte', () => {
    expect(api('a').gte('a')).toBe(true);
    expect(api('a').gte('b')).toBe(false);
    expect(api('a').gte('c')).toBe(false);

    expect(api('b').gte('a')).toBe(true);
    expect(api('b').gte('b')).toBe(true);
    expect(api('b').gte('c')).toBe(false);

    expect(api('c').gte('a')).toBe(true);
    expect(api('c').gte('b')).toBe(true);
    expect(api('c').gte('c')).toBe(true);
  });

  test('lte', () => {
    expect(api('a').lte('a')).toBe(true);
    expect(api('a').lte('b')).toBe(true);
    expect(api('a').lte('c')).toBe(true);

    expect(api('b').lte('a')).toBe(false);
    expect(api('b').lte('b')).toBe(true);
    expect(api('b').lte('c')).toBe(true);

    expect(api('c').lte('a')).toBe(false);
    expect(api('c').lte('b')).toBe(false);
    expect(api('c').lte('c')).toBe(true);
  });

  test('gt', () => {
    expect(api('a').gt('a')).toBe(false);
    expect(api('a').gt('b')).toBe(false);
    expect(api('a').gt('c')).toBe(false);

    expect(api('b').gt('a')).toBe(true);
    expect(api('b').gt('b')).toBe(false);
    expect(api('b').gt('c')).toBe(false);

    expect(api('c').gt('a')).toBe(true);
    expect(api('c').gt('b')).toBe(true);
    expect(api('c').gt('c')).toBe(false);
  });

  test('lt', () => {
    expect(api('a').lt('a')).toBe(false);
    expect(api('a').lt('b')).toBe(true);
    expect(api('a').lt('c')).toBe(true);

    expect(api('b').lt('a')).toBe(false);
    expect(api('b').lt('b')).toBe(false);
    expect(api('b').lt('c')).toBe(true);

    expect(api('c').lt('a')).toBe(false);
    expect(api('c').lt('b')).toBe(false);
    expect(api('c').lt('c')).toBe(false);
  });
});

describe('nested enum', () => {
  const api = compare([
    'a',
    'b.1',
    'b.2',
    'c.1',
    'c.2.enabled',
    'c.2.disabled',
    'c.3',
    'd',
  ] as const);

  test('all states', () => {
    expect(api('a').allStates).toMatchInlineSnapshot(`
      [
        "a",
        "b.1",
        "b.2",
        "c.1",
        "c.2.enabled",
        "c.2.disabled",
        "c.3",
        "d",
      ]
    `);
  });

  expect(api('a').activeState).toBe('a');
  expect(api('c.2.enabled').activeState).toBe('c.2.enabled');

  test('matches', () => {
    expect(api('a').matches('a')).toBe(true);
    expect(api('a').matches('b')).toBe(false);
    expect(api('a').matches('c')).toBe(false);

    expect(api('b.1').matches('b')).toBe(true);
    expect(api('b.1').matches('b.1')).toBe(true);

    expect(api('c.1').matches('c')).toBe(true);

    expect(api('c.2.enabled').matches('c')).toBe(true);
    expect(api('c.2.enabled').matches('c.2')).toBe(true);
    expect(api('c.2.enabled').matches('c.2.enabled')).toBe(true);
    expect(api('c.2.enabled').matches('c.1')).toBe(false);
    expect(api('c.2.enabled').matches('c.2.disabled')).toBe(false);
  });

  test('gte', () => {
    expect(api('a').gte('a')).toBe(true);
    expect(api('b.1').gte('a')).toBe(true);
    expect(api('b.2').gte('a')).toBe(true);

    expect(api('a').gte('b')).toBe(false);
    expect(api('b.1').gte('b')).toBe(true);
    expect(api('b.2').gte('b')).toBe(true);
    expect(api('c.1').gte('b')).toBe(true);

    expect(api('a').gte('b.1')).toBe(false);
    expect(api('b.1').gte('b.1')).toBe(true);
    expect(api('b.2').gte('b.1')).toBe(true);
    expect(api('c.1').gte('b.1')).toBe(true);

    expect(api('a').gte('b.2')).toBe(false);
    expect(api('b.1').gte('b.2')).toBe(false);
    expect(api('b.2').gte('b.2')).toBe(true);
    expect(api('c.1').gte('b.2')).toBe(true);

    expect(api('a').gte('c')).toBe(false);
    expect(api('b.1').gte('c')).toBe(false);
    expect(api('b.2').gte('c')).toBe(false);
    expect(api('c.1').gte('c')).toBe(true);

    expect(api('a').gte('c.1')).toBe(false);
    expect(api('b.1').gte('c.1')).toBe(false);
    expect(api('b.2').gte('c.1')).toBe(false);
    expect(api('c.1').gte('c.1')).toBe(true);
    expect(api('c.2.enabled').gte('c.1')).toBe(true);

    expect(api('a').gte('c.2')).toBe(false);
    expect(api('b.1').gte('c.2')).toBe(false);
    expect(api('b.2').gte('c.2')).toBe(false);
    expect(api('c.1').gte('c.2')).toBe(false);
    expect(api('c.2.enabled').gte('c.2')).toBe(true);
    expect(api('c.2.disabled').gte('c.2')).toBe(true);

    expect(api('a').gte('c.2.enabled')).toBe(false);
    expect(api('b.1').gte('c.2.enabled')).toBe(false);
    expect(api('b.2').gte('c.2.enabled')).toBe(false);
    expect(api('c.1').gte('c.2.enabled')).toBe(false);
    expect(api('c.2.enabled').gte('c.2.enabled')).toBe(true);
    expect(api('c.2.disabled').gte('c.2.enabled')).toBe(true);
    expect(api('d').gte('c.2.enabled')).toBe(true);

    expect(api('a').gte('c.2.disabled')).toBe(false);
    expect(api('b.1').gte('c.2.disabled')).toBe(false);
    expect(api('b.2').gte('c.2.disabled')).toBe(false);
    expect(api('c.1').gte('c.2.disabled')).toBe(false);
    expect(api('c.2.enabled').gte('c.2.disabled')).toBe(false);
    expect(api('c.2.disabled').gte('c.2.disabled')).toBe(true);
    expect(api('c.3').gte('c.2.disabled')).toBe(true);
    expect(api('d').gte('c.2.disabled')).toBe(true);

    expect(api('a').gte('c.3')).toBe(false);
    expect(api('b.1').gte('c.3')).toBe(false);
    expect(api('b.2').gte('c.3')).toBe(false);
    expect(api('c.1').gte('c.3')).toBe(false);
    expect(api('c.2.enabled').gte('c.3')).toBe(false);
    expect(api('c.2.disabled').gte('c.3')).toBe(false);
    expect(api('c.3').gte('c.3')).toBe(true);
    expect(api('d').gte('c.3')).toBe(true);
  });

  test('lte', () => {
    expect(api('a').lte('a')).toBe(true);
    expect(api('b.1').lte('a')).toBe(false);
    expect(api('b.2').lte('a')).toBe(false);

    expect(api('a').lte('b')).toBe(true);
    expect(api('b.1').lte('b')).toBe(true);
    expect(api('b.2').lte('b')).toBe(true);
    expect(api('c.1').lte('b')).toBe(false);

    expect(api('a').lte('b.1')).toBe(true);
    expect(api('b.1').lte('b.1')).toBe(true);
    expect(api('b.2').lte('b.1')).toBe(false);
    expect(api('c.1').lte('b.1')).toBe(false);

    expect(api('a').lte('b.2')).toBe(true);
    expect(api('b.1').lte('b.2')).toBe(true);
    expect(api('b.2').lte('b.2')).toBe(true);
    expect(api('c.1').lte('b.2')).toBe(false);

    expect(api('a').lte('c')).toBe(true);
    expect(api('b.1').lte('c')).toBe(true);
    expect(api('b.2').lte('c')).toBe(true);
    expect(api('c.1').lte('c')).toBe(true);

    expect(api('a').lte('c.1')).toBe(true);
    expect(api('b.1').lte('c.1')).toBe(true);
    expect(api('b.2').lte('c.1')).toBe(true);
    expect(api('c.1').lte('c.1')).toBe(true);
    expect(api('c.2.enabled').lte('c.1')).toBe(false);

    expect(api('a').lte('c.2')).toBe(true);
    expect(api('b.1').lte('c.2')).toBe(true);
    expect(api('b.2').lte('c.2')).toBe(true);
    expect(api('c.1').lte('c.2')).toBe(true);
    expect(api('c.2.enabled').lte('c.2')).toBe(true);
    expect(api('c.2.disabled').lte('c.2')).toBe(true);

    expect(api('a').lte('c.2.enabled')).toBe(true);
    expect(api('b.1').lte('c.2.enabled')).toBe(true);
    expect(api('b.2').lte('c.2.enabled')).toBe(true);
    expect(api('c.1').lte('c.2.enabled')).toBe(true);
    expect(api('c.2.enabled').lte('c.2.enabled')).toBe(true);
    expect(api('c.2.disabled').lte('c.2.enabled')).toBe(false);
    expect(api('d').lte('c.2.enabled')).toBe(false);

    expect(api('a').lte('c.2.disabled')).toBe(true);
    expect(api('b.1').lte('c.2.disabled')).toBe(true);
    expect(api('b.2').lte('c.2.disabled')).toBe(true);
    expect(api('c.1').lte('c.2.disabled')).toBe(true);
    expect(api('c.2.enabled').lte('c.2.disabled')).toBe(true);
    expect(api('c.2.disabled').lte('c.2.disabled')).toBe(true);
    expect(api('c.3').lte('c.2.disabled')).toBe(false);
    expect(api('d').lte('c.2.disabled')).toBe(false);

    expect(api('a').lte('c.3')).toBe(true);
    expect(api('b.1').lte('c.3')).toBe(true);
    expect(api('b.2').lte('c.3')).toBe(true);
    expect(api('c.1').lte('c.3')).toBe(true);
    expect(api('c.2.enabled').lte('c.3')).toBe(true);
    expect(api('c.2.disabled').lte('c.3')).toBe(true);
    expect(api('c.3').lte('c.3')).toBe(true);
    expect(api('d').lte('c.3')).toBe(false);
  });

  test('gt', () => {
    expect(api('a').gt('a')).toBe(false);
    expect(api('b.1').gt('a')).toBe(true);
    expect(api('b.2').gt('a')).toBe(true);

    expect(api('a').gt('b')).toBe(false);
    expect(api('b.1').gt('b')).toBe(false);
    expect(api('b.2').gt('b')).toBe(false);
    expect(api('c.1').gt('b')).toBe(true);

    expect(api('a').gt('b.1')).toBe(false);
    expect(api('b.1').gt('b.1')).toBe(false);
    expect(api('b.2').gt('b.1')).toBe(true);
    expect(api('c.1').gt('b.1')).toBe(true);

    expect(api('a').gt('b.2')).toBe(false);
    expect(api('b.1').gt('b.2')).toBe(false);
    expect(api('b.2').gt('b.2')).toBe(false);
    expect(api('c.1').gt('b.2')).toBe(true);

    expect(api('a').gt('c')).toBe(false);
    expect(api('b.1').gt('c')).toBe(false);
    expect(api('b.2').gt('c')).toBe(false);
    expect(api('c.1').gt('c')).toBe(false);

    expect(api('a').gt('c.1')).toBe(false);
    expect(api('b.1').gt('c.1')).toBe(false);
    expect(api('b.2').gt('c.1')).toBe(false);
    expect(api('c.1').gt('c.1')).toBe(false);
    expect(api('c.2.enabled').gt('c.1')).toBe(true);

    expect(api('a').gt('c.2')).toBe(false);
    expect(api('b.1').gt('c.2')).toBe(false);
    expect(api('b.2').gt('c.2')).toBe(false);
    expect(api('c.1').gt('c.2')).toBe(false);
    expect(api('c.2.enabled').gt('c.2')).toBe(false);
    expect(api('c.2.disabled').gt('c.2')).toBe(false);
    expect(api('c.3').gt('c.2')).toBe(true);
    expect(api('d').gt('c.2')).toBe(true);

    expect(api('a').gt('c.2.enabled')).toBe(false);
    expect(api('b.1').gt('c.2.enabled')).toBe(false);
    expect(api('b.2').gt('c.2.enabled')).toBe(false);
    expect(api('c.1').gt('c.2.enabled')).toBe(false);
    expect(api('c.2.enabled').gt('c.2.enabled')).toBe(false);
    expect(api('c.2.disabled').gt('c.2.enabled')).toBe(true);
    expect(api('c.3').gt('c.2.enabled')).toBe(true);
    expect(api('d').gt('c.2.enabled')).toBe(true);

    expect(api('a').gt('c.2.disabled')).toBe(false);
    expect(api('b.1').gt('c.2.disabled')).toBe(false);
    expect(api('b.2').gt('c.2.disabled')).toBe(false);
    expect(api('c.1').gt('c.2.disabled')).toBe(false);
    expect(api('c.2.enabled').gt('c.2.disabled')).toBe(false);
    expect(api('c.2.disabled').gt('c.2.disabled')).toBe(false);
    expect(api('c.3').gt('c.2.disabled')).toBe(true);
    expect(api('d').gt('c.2.disabled')).toBe(true);

    expect(api('a').gt('c.3')).toBe(false);
    expect(api('b.1').gt('c.3')).toBe(false);
    expect(api('b.2').gt('c.3')).toBe(false);
    expect(api('c.1').gt('c.3')).toBe(false);
    expect(api('c.2.enabled').gt('c.3')).toBe(false);
    expect(api('c.2.disabled').gt('c.3')).toBe(false);
    expect(api('c.3').gt('c.3')).toBe(false);
    expect(api('d').gt('c.3')).toBe(true);
  });

  test('lt', () => {
    expect(api('a').lt('a')).toBe(false);
    expect(api('b.1').lt('a')).toBe(false);
    expect(api('b.2').lt('a')).toBe(false);

    expect(api('a').lt('b')).toBe(true);
    expect(api('b.1').lt('b')).toBe(false);
    expect(api('b.2').lt('b')).toBe(false);
    expect(api('c.1').lt('b')).toBe(false);

    expect(api('a').lt('b.1')).toBe(true);
    expect(api('b.1').lt('b.1')).toBe(false);
    expect(api('b.2').lt('b.1')).toBe(false);
    expect(api('c.1').lt('b.1')).toBe(false);

    expect(api('a').lt('b.2')).toBe(true);
    expect(api('b.1').lt('b.2')).toBe(true);
    expect(api('b.2').lt('b.2')).toBe(false);
    expect(api('c.1').lt('b.2')).toBe(false);

    expect(api('a').lt('c')).toBe(true);
    expect(api('b.1').lt('c')).toBe(true);
    expect(api('b.2').lt('c')).toBe(true);
    expect(api('c.1').lt('c')).toBe(false);
    expect(api('c.2.enabled').lt('c')).toBe(false);
    expect(api('c.3').lt('c')).toBe(false);
    expect(api('d').lt('c')).toBe(false);

    expect(api('a').lt('c.1')).toBe(true);
    expect(api('b.1').lt('c.1')).toBe(true);
    expect(api('b.2').lt('c.1')).toBe(true);
    expect(api('c.1').lt('c.1')).toBe(false);
    expect(api('c.2.enabled').lt('c.1')).toBe(false);

    expect(api('a').lt('c.2')).toBe(true);
    expect(api('b.1').lt('c.2')).toBe(true);
    expect(api('b.2').lt('c.2')).toBe(true);
    expect(api('c.1').lt('c.2')).toBe(true);
    expect(api('c.2.enabled').lt('c.2')).toBe(false);
    expect(api('c.2.disabled').lt('c.2')).toBe(false);
    expect(api('c.3').lt('c.2')).toBe(false);

    expect(api('a').lt('c.2.enabled')).toBe(true);
    expect(api('b.1').lt('c.2.enabled')).toBe(true);
    expect(api('b.2').lt('c.2.enabled')).toBe(true);
    expect(api('c.1').lt('c.2.enabled')).toBe(true);
    expect(api('c.2.enabled').lt('c.2.enabled')).toBe(false);
    expect(api('c.2.disabled').lt('c.2.enabled')).toBe(false);
    expect(api('d').lt('c.2.enabled')).toBe(false);

    expect(api('a').lt('c.2.disabled')).toBe(true);
    expect(api('b.1').lt('c.2.disabled')).toBe(true);
    expect(api('b.2').lt('c.2.disabled')).toBe(true);
    expect(api('c.1').lt('c.2.disabled')).toBe(true);
    expect(api('c.2.enabled').lt('c.2.disabled')).toBe(true);
    expect(api('c.2.disabled').lt('c.2.disabled')).toBe(false);
    expect(api('c.3').lt('c.2.disabled')).toBe(false);
    expect(api('d').lt('c.2.disabled')).toBe(false);

    expect(api('a').lt('c.3')).toBe(true);
    expect(api('b.1').lt('c.3')).toBe(true);
    expect(api('b.2').lt('c.3')).toBe(true);
    expect(api('c.1').lt('c.3')).toBe(true);
    expect(api('c.2.enabled').lt('c.3')).toBe(true);
    expect(api('c.2.disabled').lt('c.3')).toBe(true);
    expect(api('c.3').lt('c.3')).toBe(false);
    expect(api('d').lt('c.3')).toBe(false);
  });
});
