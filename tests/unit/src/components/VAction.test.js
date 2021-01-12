import { render } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import VActionStub from '../stubs/VActionStub.vue';

describe('VAction Unit Test', () => {
  describe('Default Functionality', () => {
    it('Returns a <RouterLink/> tag', () => {
      const { getByTestId } = render(VActionStub, {
        stubs: {
          RouterLink: RouterLinkStub
        },
      });

      const testLink = getByTestId('internal');
      expect(testLink).toHaveAttribute(
        'to',
        expect.stringContaining('/internal-link')
      );
    });
    it('Returns an anchor tag with :href', () => {
      const { getByTestId } = render(VActionStub);
      const testLink = getByTestId('external-href');
      expect(testLink).toHaveAttribute(
        'href',
        expect.stringContaining('http://example.com/')
      );
    });
    it('Fails to return an anchor tag with :attrs', () => {
      const { getByTestId } = render(VActionStub);
      const testLink = getByTestId('external-attrs');
      expect(testLink).not.toHaveAttribute('href');
    });
    it('Fails to return an anchor tag with :data', () => {
      const { getByTestId } = render(VActionStub);
      const testLink = getByTestId('external-data');
      expect(testLink).not.toHaveAttribute('href');
    });
    it('Returns a <button />', () => {
      const { getByTestId } = render(VActionStub);
      const testLink = getByTestId('button');
      expect(testLink).toHaveTextContent('Button');
    });
  });
});
