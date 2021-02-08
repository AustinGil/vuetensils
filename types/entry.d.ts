declare var _default: {
    /**
     * @param {*} Vue Vue instance
     * @param {VuetensilsConfig} pluginConfig Vuetensils configuration
     */
    install(Vue: any, pluginConfig: VuetensilsConfig): void;
};
export default _default;
export * from "./components";
export * from "./directives";
export * from "./filters";
export type VuetensilsConfig = {
    components?: Partial<Record<keyof typeof allComponents, Record<string, any> | boolean>>;
    directives?: Record<keyof typeof allDirectives, Record<string, any> | boolean>;
    filters?: Record<keyof typeof allFilters, Record<string, any> | boolean>;
};
import * as allComponents from "./components";
import * as allDirectives from "./directives";
import * as allFilters from "./filters";
