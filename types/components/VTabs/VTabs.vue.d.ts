/**
 * Show and hide content based on which tabs are selected.
 *
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 *
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        active: {
            type: NumberConstructor;
            default: number;
        };
        label: {
            type: StringConstructor;
            default: any;
        };
        orientation: {
            type: StringConstructor;
            default: string;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data(): {
        activeIndex: any;
        activeTab: any;
    };
    computed: {
        /** @returns {Array} */
        tabList(): string[];
        /** @returns {Array} */
        panelList(): string[];
    };
    watch: {
        active(next: any): void;
        activeIndex(next: any): void;
    };
    created(): void;
    methods: {
        onKeydown(event: any): void;
        determineOrientation(event: any): void;
        switchTabOnArrowPress(event: any): void;
        setFocus(): any;
    };
};
export default _default;
