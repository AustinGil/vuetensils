/* eslint-disable import/namespace */
import * as allComponents from './components/index.js';
import * as allDirectives from './directives/index.js';
import * as allFilters from './filters/index.js';

export const components = allComponents;
export const directives = allDirectives;
export const filters = allFilters;

/**
 * TODO:
 * Provide config options for library/components
 * Finish up rebuilding table
 * Get rid of auto safe slot (breaking)
 * Create main.css file
 * Prop warning messages (img alt, input label)
 */

/**
 * @typedef {{
 * components?: Partial<Record<keyof allComponents, Record<string, any> | boolean>>,
 * directives?: Record<keyof allDirectives, Record<string, any> | boolean>,
 * filters?: Record<keyof allFilters, Record<string, any> | boolean>
 * }} VuetensilsConfig
 */

/** @type {import('vue').PluginObject} */
export default {
  /**
   * @param {*} Vue Vue instance
   * @param {VuetensilsConfig} [pluginConfig] Vuetensils configuration
   */
  install(Vue, pluginConfig = {}) {
    if (pluginConfig.components) {
      if (Array.isArray(pluginConfig.components)) {
        pluginConfig.components = pluginConfig.components.reduce(
          (config, key) => {
            config[key] = true;
            return config;
          },
          {}
        );
      }
      Object.entries(pluginConfig.components).forEach((entry) => {
        const [key, options] = entry;
        const component = allComponents[key];
        // @ts-ignore
        const name = typeof options === 'boolean' ? options.name || key : key;
        Vue.component(name, component);
      });
    }

    if (pluginConfig.directives) {
      if (Array.isArray(pluginConfig.directives)) {
        pluginConfig.directives = pluginConfig.directives.reduce(
          (config, key) => {
            config[key] = true;
            return config;
          },
          {}
        );
      }
      Object.entries(pluginConfig.directives).forEach((entry) => {
        const [key] = entry;
        const directive = allDirectives[key];
        Vue.directive(key, directive);
      });
    }

    if (pluginConfig.filters) {
      if (Array.isArray(pluginConfig.filters)) {
        pluginConfig.filters = pluginConfig.filters.reduce((config, key) => {
          config[key] = true;
          return config;
        }, {});
      }
      Object.entries(pluginConfig.filters).forEach((entry) => {
        const [key] = entry;
        const filter = allFilters[key];
        Vue.filter(key, filter);
      });
    }
  },
};

export * from './components/index.js';
export * from './composables/index.js';
export * from './directives/index.js';
export * from './filters/index.js';
