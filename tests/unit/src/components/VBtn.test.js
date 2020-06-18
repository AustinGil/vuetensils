import { mount } from '@vue/test-utils';

import VBtn, { getTag } from '../../../../src/components/VBtn/VBtn.vue';

describe('VBtn', () => {
  describe('Created', () => {
    test('Renders correctly', () => {
      const wrapper = mount(VBtn);

      expect(wrapper)
        .toMatchSnapshot();
    });
  });

  describe('getTag', () => {
    const props = { to: '/path' };
    const data = { attrs: { href: '/path' } };

    test('Detects router-link', () => {
      expect(getTag(props))
        .toEqual('RouterLink');
    });

    test('Detects anchor', () => {
      expect(getTag(undefined, data))
        .toEqual('a');
    });

    test('Detects button', () => {
      expect(getTag())
        .toEqual('button');
    });
  });
});
