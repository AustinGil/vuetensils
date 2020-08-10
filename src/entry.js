import * as components from './components/index';
import * as directives from './directives/index';
import * as filters from './filters/index';

/**
 * @typedef {Array<'VAction'|'VAlert'|'VAsync'|'VBtn'|'VDate'|'VDialog'|'VDrawer'|'VDropdown'|'VFile'|'VForm'|'VImg'|'VInput'|'VIntersect'|'VResize'|'VSkip'|'VTable'|'VTabs'|'VToggle'|'VTooltip'|'VTry'>} ComponentsList
 * @typedef {Array<'autofocus'|'clickout'|'copy'|'intersect'>} DirectivesList
 * @typedef {Array<'capitalize'|'currency'|'number'|'placeholder'|'plural'|'truncate'>} FiltersList
 *
 * @typedef {{
 * components: ComponentsList,
 * directives: DirectivesList,
 * filters: FiltersList
 * }} VuetensilsConfig
 */

/** @type {import('vue').PluginObject} */
export default {
  /**
   * @param {*} Vue Vue instance
   * @param {VuetensilsConfig} config Vuetensils configuration
   */
  install(Vue, config) {
    if (!config) return;

    if (config.components) {
      for (const item of config.components) {
        Vue.component(item, components[item]);
      }
    }

    if (config.directives) {
      for (const item of config.directives) {
        Vue.directive(item, directives[item]);
      }
    }

    if (config.filters) {
      for (const item of config.filters) {
        Vue.filter(item, filters[item]);
      }
    }
  }
};

export * from './components/index';
export * from './directives/index';
export * from './filters/index';
