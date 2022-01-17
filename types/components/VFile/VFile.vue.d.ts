declare const _default: {
    name: string;
    model: {
        prop: string;
        event: string;
    };
    props: {
        label: {
            type: StringConstructor;
            required: boolean;
        };
        files: {
            type: ArrayConstructor;
            default: () => any[];
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data: () => {
        localFiles: any[];
        droppable: boolean;
    };
    computed: {
        listeners(): any;
    };
    watch: {
        files(files: any): void;
        localFiles(): void;
    };
    created(): void;
    methods: {
        onChange(event: any): void;
        onDrop(event: any): void;
    };
};
export default _default;
