/**
 * NOTES Concerning :visible prop.
 * Per W3C specifications:
 * https://www.w3.org/TR/wai-aria-practices/#alert
 * --
 * "It is also important to avoid designing alerts that disappear automatically.
 * An alert that disappears too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3.
 * Another critical design consideration is the frequency of interruption caused by alerts.
 * Frequent interruptions inhibit usability for people with visual and cognitive disabilities,
 * which makes meeting the requirements of WCAG 2.0 success criterion 2.2.4 more difficult."
 */
declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        /**
         * HTML tag used to wrap the component.
         */
        tag: {
            type: StringConstructor;
            default: string;
        };
        /**
         * Determines whether the alert is visible. Also binds with `v-model`.
         */
        modelValue: {
            type: (BooleanConstructor | NumberConstructor)[];
            default: boolean;
        };
        /**
         * Allows a user to dismiss this alert.
         */
        dismissible: BooleanConstructor;
        /**
         * Aria-label that is not visibly, but screen readers will read for the dismiss button.
         */
        dismissLabel: {
            type: (StringConstructor | BooleanConstructor)[];
            default: string;
        };
        /**
         * The transition name if you want to add one.
         */
        transition: {
            type: StringConstructor;
            default: any;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data: () => {
        dismissed: boolean;
        timerId: any;
    };
    watch: {
        modelValue: {
            handler(visible: any): void;
            immediate: boolean;
        };
    };
    beforeUnmount(): void;
    /** @deprecated */
    beforeDestroy(): void;
    methods: {
        dismiss(): void;
        countdown(): void;
        clearTimer(): void;
    };
};
/**
 * A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.
 */
export default _default;
