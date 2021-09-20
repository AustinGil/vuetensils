/* eslint-disable */
import faker from 'faker';
import { mount } from '@cypress/vue';
import IdxBtn from './IdxBtn.vue';

describe('IdxBtn', () => {
  const text = faker.lorem.words();

  it('is accessible', () => {
    mount(IdxBtn, {
      slots: {
        default: text,
      },
    });
    cy.injectAxe();
    cy.checkA11y(null, {
      rules: {
        'html-has-lang': { enabled: false },
        'landmark-one-main': { enabled: false },
        'page-has-heading-one': { enabled: false },
        region: { enabled: false },
      },
    });
  });

  it('renders a button by default', () => {
    mount(IdxBtn, {
      slots: {
        default: text,
      },
    });
    cy.get('button').should('contain', text);
  });

  it('renders an anchor tag when `href` is present', () => {
    mount(IdxBtn, {
      propsData: {
        href: faker.internet.url(),
      },
      slots: {
        default: text,
      },
    });
    cy.get('a').should('contain', text);
  });

  it('renders a router link when `to` is present', () => {
    mount(IdxBtn, {
      propsData: {
        to: '/',
      },
      stubs: ['RouterLink'],
      slots: {
        default: text,
      },
    });
    cy.get('routerlink-stub').should('contain', text);
  });
});
