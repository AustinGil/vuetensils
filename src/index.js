/* eslint-disable import/namespace */
import * as allComponents from './components/index.js';
import * as allDirectives from './directives/index.js';
import * as allFilters from './filters/index.js';
// import { notify } from './components/VNotifications/VNotifications.vue';

export const components = allComponents;
export const directives = allDirectives;
export const filters = allFilters;

/**
 * TODO:
 * Provide config options for library/components
 * Prop warning messages (img alt, input label)
 */

/**
 * @typedef {{
 * components?: Partial<Record<keyof allComponents, Record<string, any> | boolean>>,
 * directives?: Record<keyof allDirectives, Record<string, any> | boolean>,
 * filters?: Record<keyof allFilters, Record<string, any> | boolean>
 * }} VuetensilsConfig
 */

/** @type {import('vue').Plugin} */
export default {
  /**
   * @param {*} app app instance
   * @param {VuetensilsConfig} [pluginConfig] Vuetensils configuration
   */
  install(app, pluginConfig = {}) {
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
        app.component(name, component);

        if (key === 'VNotifications') {
          // // app.config.globalProperties.$vnotify = notify;
        }
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
        app.directive(key, directive);
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
        app.filter(key, filter);
      });
    }
  },
};

export * from './components/index.js';
export * from './composables/index.js';
export * from './directives/index.js';
export * from './filters/index.js';
