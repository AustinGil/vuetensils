/**
 * Detects if a VDOM element is a <RouterLink>, <a>, or <button>
 *
 * @param  {object} props       props container
 *         {string} props.to    the :to prop for router-link
 * @param  {object} data        data container
 *         {object} data.attrs  attributes container
 * @return {string}             'RouterLink', 'a', or 'button'
 */
export declare function getTag(props: any, data: any): "a" | "button" | "RouterLink";
declare const _default: {
    name: string;
    functional: boolean;
    render(h: any, { data, listeners, props, children }: {
        data: any;
        listeners: any;
        props: any;
        children: any;
    }): any;
};
export default _default;
