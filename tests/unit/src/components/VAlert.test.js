import { render } from '@testing-library/vue';
// import userEvent from '@testing-library/user-event';
import VAlert from '@components/VAlert/VAlert.vue';

describe('VAlert', () => {
  describe('Default Functionality', () => {

    it('render correctly without props', () => {
      const { getByRole } = render(VAlert);
      const alertBox = getByRole('alert');
      expect(alertBox).toMatchSnapshot();
    });

    describe('Dismiss & Timing visibility', () => {

      it('render default dismiss button', () => {
        const { getByLabelText } = render(VAlert, {
          props: {
            dismissible: true,
          },
        });
  
        const dismissButton = getByLabelText('Dismiss this alert');
        expect(dismissButton).toBeVisible();
      });

    });
  });
});
