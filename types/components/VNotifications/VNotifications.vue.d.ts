/**
 * @param {Omit<VNotification, 'timeoutId'> | string} notification
 */
export declare function notify(notification: any): void;
declare const _default: {
    props: {
        timeout: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        persistent: {
            type: BooleanConstructor;
            default: boolean;
        };
        transition: {
            type: StringConstructor;
            default: string;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    computed: {
        notifications(): any[];
    };
    watch: {
        'notifications.length': {
            handler(length: any, oldLength: any): void;
        };
    };
    unmounted(): void;
    methods: {
        /** @param {VNotification} notification */
        remove: (notification: any) => void;
    };
};
export default _default;
