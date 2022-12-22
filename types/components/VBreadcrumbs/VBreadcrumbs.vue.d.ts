declare const _default: {
    name: string;
    props: {
        breadcrumbs: {
            type: ArrayConstructor;
            default: () => any[];
        };
    };
    computed: {
        routeBreadcrumbs({ $route }: {
            $route: any;
        }): any;
    };
    methods: {
        getText(item: any): any;
    };
};
export default _default;
