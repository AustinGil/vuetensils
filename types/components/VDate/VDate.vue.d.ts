declare const _default: {
    name: string;
    directives: {
        clickout: any;
    };
    model: {
        prop: string;
        event: string;
    };
    props: {
        modelValue: {
            type: (StringConstructor | DateConstructor)[];
            default: () => Date;
        };
        date: {
            type: (StringConstructor | DateConstructor)[];
            default: () => Date;
        };
        min: {
            type: (StringConstructor | DateConstructor)[];
            default: string;
        };
        max: {
            type: (StringConstructor | DateConstructor)[];
            default: string;
        };
        id: {
            type: StringConstructor;
            default: () => string;
        };
        daysOfWeek: {
            type: ObjectConstructor;
            default: () => Readonly<{
                Su: "Sunday";
                Mo: "Monday";
                Tu: "Tuesday";
                We: "Wednesday";
                Th: "Thursday";
                Fr: "Friday";
                Sa: "Saturday";
            }>;
        };
        monthLabels: {
            type: ArrayConstructor;
            default: () => string[];
        };
        /** @type {import('vue').Prop<Record<keyof defaultButtonLabels, string>>} */
        buttonLabels: {
            type: ObjectConstructor;
            default: () => Readonly<{
                selectDate: string;
                showCalendar: string;
                previousMonth: string;
                nextMonth: string;
                previousYear: string;
                nextYear: string;
            }>;
        };
        classes: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    emits: string[];
    data(): {
        show: boolean;
        previousActiveEl: any;
        focusedDate: Date;
        selectedDate: Date;
    };
    computed: {
        monthYear(): string;
        disableNav(): {};
        daysByWeeks(): any[];
        toggle(): {
            bind: {
                'aria-label': any;
                'aria-expanded': string;
            };
            on: {
                click: () => void;
            };
        };
    };
    watch: {
        show(isShow: any): void;
        selectedDate(date: any): void;
    };
    methods: {
        incrementMonthBy(inc: any): void;
        incrementYearBy(inc: any): void;
        onClick({ target }: {
            target: any;
        }): void;
        onKeydown(event: any): void;
        onTab(event: any): void;
        onClickout(event: any): void;
    };
};
export default _default;
