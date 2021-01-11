import { render } from '@testing-library/vue';
import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

// import userEvent from '@testing-library/user-event';
import VActionStub from '../stubs/VActionStub.vue';

describe('VAction Unit Test', () => {
  describe('Default Functionality', () => {
    it('Returns a <RouterLink/> tag', () => {
    // Create localInstance of VueRouter to get access to <router-link /> component
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      const { getByTestId, debug } = render(VActionStub, {
        localVue,
        // props: {
        //   to: '/internal-link',
        // },
        // data: function() {
        //   return {
        //     attrs: {
        //       'data-testid': 'internal',
        //     },
        //   };
        // },
        // slots: {
        //   default: 'Internal Link',
        // },
        stubs: ['router-link'],
      });

      const testLink = getByTestId('internal');
      debug(testLink);
      expect(testLink).toHaveAttribute(
        'to',
        expect.stringContaining('/internal-link')
      );
    });
    it('Returns an anchor tag', () => {
      const { getByTestId, debug } = render(VActionStub);
      const testLink = getByTestId('external');
      debug(testLink);
      expect(testLink).toHaveAttribute(
        'href',
        expect.stringContaining('http://example.com/')
      );
    });
    it('Returns a <button />', () => {
      const { getByTestId } = render(VActionStub);
      const testLink = getByTestId('button');
      expect(testLink).toContainHTML('<button class="vts-action" />');
    });
  });
});
