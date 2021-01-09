import { mount } from '@vue/test-utils';
import VAlert from '@components/VAlert/VAlert.vue';

describe('VAlert', () => {
  describe('Created', () => {

    it('renders correctly without props', () => {
      const wrapper = mount(VAlert);
      expect(wrapper).toMatchSnapshot();
    });

  });
});
