import Vue from 'vue';
import * as components from '../../src/components';
import * as directives from '../../src/directives';
import * as filters from '../../src/filters';
import Vuetensils from '../../src/index.js';

Vue.use(Vuetensils, {
  components,
  directives,
  filters
});