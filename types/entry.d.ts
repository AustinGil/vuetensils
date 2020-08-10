declare var _default: {
    /**
     * @param {*} Vue Vue instance
     * @param {VuetensilsConfig} config Vuetensils configuration
     */
    install(Vue: any, config: VuetensilsConfig): void;
};
export default _default;
export * from "./components";
export * from "./directives";
export * from "./filters";
export type ComponentsList = ("VAction" | "VAlert" | "VAsync" | "VBtn" | "VDate" | "VDialog" | "VDrawer" | "VDropdown" | "VFile" | "VForm" | "VImg" | "VInput" | "VIntersect" | "VResize" | "VSkip" | "VTable" | "VTabs" | "VToggle" | "VTooltip" | "VTry")[];
export type DirectivesList = ("copy" | "autofocus" | "clickout" | "intersect")[];
export type FiltersList = ("number" | "currency" | "capitalize" | "placeholder" | "plural" | "truncate")[];
export type VuetensilsConfig = {
    components: ("VAction" | "VAlert" | "VAsync" | "VBtn" | "VDate" | "VDialog" | "VDrawer" | "VDropdown" | "VFile" | "VForm" | "VImg" | "VInput" | "VIntersect" | "VResize" | "VSkip" | "VTable" | "VTabs" | "VToggle" | "VTooltip" | "VTry")[];
    directives: ("copy" | "autofocus" | "clickout" | "intersect")[];
    filters: ("number" | "currency" | "capitalize" | "placeholder" | "plural" | "truncate")[];
};
