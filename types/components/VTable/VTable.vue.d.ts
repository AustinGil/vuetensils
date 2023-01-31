/**
 * @typedef {{ key: string, text: string, sortable: boolean, sort: (a, b, isAscending: boolean) => number }} Header
 * @typedef {Header & { bind: object, sortBtn: object }} ComputedHeader
 */
declare const _default: {
    name: string;
    provide(): {
        $table: any;
    };
    props: {
        /** @type {import('vue').Prop<Header[]>} */
        headers: {
            type: ArrayConstructor;
            default: () => any[];
        };
        /** @type {import('vue').Prop<Object[]>} */
        items: {
            type: ArrayConstructor;
            default: () => any[];
        };
        page: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        perPage: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        sortBy: {
            type: StringConstructor;
            default: string;
        };
        /** @type {import('vue').Prop<'ASC'|'DESC'>} */
        sortDirection: {
            type: StringConstructor;
            default: string;
            /** @param {string} direction */
            validator: (direction: any) => boolean;
        };
        id: {
            type: StringConstructor;
            default: string;
        };
        caption: {
            type: StringConstructor;
            default: string;
        };
        sortable: BooleanConstructor;
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    data(): {
        localSortBy: any;
        localSortDirection: any;
        localPage: number;
        localPerPage: number;
    };
    computed: {
        /** @returns {ComputedHeader[]} */
        computedHeaders(): any[];
        /** @returns {Array} */
        computedItems(): any[];
        /** @returns {number} */
        lastPage(): number;
    };
    watch: {
        /** @param {string} value */
        sortBy(value: any): void;
        localSortBy(value: any): void;
        /** @param {string} value */
        sortDirection(value: any): void;
        localSortDirection(value: any): void;
        /** @param {string | number} value */
        page(value: any): void;
        localPage(value: any): void;
        /** @param {string | number} value */
        perPage(value: any): void;
        localPerPage(value: any): void;
    };
    methods: {
        /**
         * @param a
         * @param b
         * @param {boolean} isAscending
         * @returns {number}
         */
        defaultComparisonFn(a: any, b: any, isAscending: any): number;
        onSort(key: any): void;
        /**
         * @param page
         * @returns {void}
         */
        goToPage(page: any): void;
    };
};
export default _default;
