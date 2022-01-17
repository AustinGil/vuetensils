declare const _default: {
    name: string;
    props: {
        value: {
            type: StringConstructor;
            default: any;
        };
        search: {
            type: StringConstructor;
            default: any;
        };
        options: {
            type: ArrayConstructor;
            default: any;
        };
    };
    data(): {
        isOpen: boolean;
        highlightedIndex: number;
    };
    methods: {
        open(): void;
        close(): void;
        cancel(): void;
        commitSelection(): void;
        select(index: any): void;
        highlight(index: any): void;
        highlightPrev(): void;
        highlightNext(): void;
    };
};
export default _default;
