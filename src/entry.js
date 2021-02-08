import * as allComponents from './components/index';
import * as allDirectives from './directives/index';
import * as allFilters from './filters/index';

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
   * @param {VuetensilsConfig} pluginConfig Vuetensils configuration
   */
  install(Vue, pluginConfig) {
    if (!pluginConfig) return;

    if (pluginConfig.components) {
      Object.entries(pluginConfig.components).forEach(entry => {
        const [key, options] = entry;
        const component = allComponents[key];
        // @ts-ignore
        const name = typeof options === 'boolean' ? options.name || key : key;
        Vue.component(name, component);
      });
    }

    if (pluginConfig.directives) {
      Object.entries(pluginConfig.directives).forEach(entry => {
        const [key, options] = entry;
        const directive = allDirectives[key];
        // @ts-ignore
        const name = typeof options === 'boolean' ? options.name || key : key;
        Vue.directive(name, directive);
      });
    }

    if (pluginConfig.filters) {
      Object.entries(pluginConfig.filters).forEach(entry => {
        const [key, options] = entry;
        const filter = allFilters[key];
        // @ts-ignore
        const name = typeof options === 'boolean' ? options.name || key : key;
        Vue.filter(name, filter);
      });
    }
  }
};

export * from './components/index';
export * from './directives/index';
export * from './filters/index';
