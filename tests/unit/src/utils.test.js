import { randomString } from '../../../src/utils.js';

describe('Utilities', () => {
  describe('randomString', () => {
    test('No inputs', () => {
      const output = randomString();

      expect(typeof (output))
        .toEqual('string');

      expect(output.length)
        .toEqual(10);
    });

    test('Bad inputs', () => {
      expect(randomString(NaN, {}))
        .toEqual('');
    });

    test('Length 0', () => {
      expect(randomString(0))
        .toEqual('');
    });

    test('Length 1', () => {
      const output = randomString(1);

      expect(typeof (output))
        .toEqual('string');

      expect(output.length)
        .toEqual(1);
    });

    test('Length 100', () => {
      const output = randomString(100);

      expect(typeof (output))
        .toEqual('string');

      expect(output.length)
        .toEqual(100);
    });

    test('Only allow numbers', () => {
      const allowed = '0123456789';
      const output = randomString(10, allowed);

      const filtered = output.split('').filter(function (character) {
        return allowed.includes(character);
      });

      expect(output.length)
        .toEqual(filtered.length);
    });
  });
});
