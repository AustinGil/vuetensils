import '../../shared.css';
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
        id: {
            type: StringConstructor;
            default: () => string;
        };
        modelValue: {
            type: ArrayConstructor;
            default: () => any[];
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
        modelValue(files: any): void;
        localFiles(): void;
    };
    methods: {
        onChange(event: any): void;
        onDrop(event: any): void;
    };
};
export default _default;
