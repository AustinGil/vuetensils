declare var _default: {
    /**
     * @param {*} Vue Vue instance
     * @param {VuetensilsConfig} [pluginConfig] Vuetensils configuration
     */
    install(Vue: any, pluginConfig?: VuetensilsConfig): void;
};
export default _default;
export * from "./components/index.js";
export * from "./composables/index.js";
export * from "./directives/index.js";
export * from "./filters/index.js";
export type VuetensilsConfig = {
    components?: Partial<Record<keyof typeof allComponents, Record<string, any> | boolean>>;
    directives?: Record<keyof typeof allDirectives, Record<string, any> | boolean>;
    filters?: Record<keyof typeof allFilters, Record<string, any> | boolean>;
};
import * as allComponents from "./components/index.js";
import * as allDirectives from "./directives/index.js";
import * as allFilters from "./filters/index.js";
