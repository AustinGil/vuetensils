declare const _default: {
    name: string;
    components: any;
    data: () => {
        prom: Promise<unknown>;
        countdown: number;
        headers: ({
            key: string;
            sort?: undefined;
            text?: undefined;
        } | {
            key: string;
            sort: boolean;
            text?: undefined;
        } | {
            key: string;
            text: string;
            sort: () => number;
        })[];
        people: {
            name: string;
            age: number;
            color: string;
        }[];
    };
    methods: {
        log: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
};
export default _default;
