/**
 * @type {import('vue').DirectiveFunction}
 */
function unbind(el) {
  if (!el._vobserver) return;
  el._vobserver.unobserve(el);
  delete el._vobserver;
}

export default {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  inserted: (el, { value, modifiers }) => {
    const options = {
      ...value,
    };
    const { enter, exit, once } = modifiers;

    if (options.root) {
      options.root =
        typeof options.root === 'string'
          ? document.querySelector(options.root)
          : options.root;
    }

    const listeners = { ...value };

    // Support passing direct function
    if (value instanceof Function) {
      if (enter) listeners.onEnter = value;
      if (exit) listeners.onExit = value;
      if (!enter && !exit) listeners.onChange = value;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Firefox doesn't properly handle the isIntersecting prop
      const isThresholdArray = Array.isArray(options.threshold);
      const clone = {};
      for (let key in entry) {
        clone[key] = entry[key];
      }
      clone.isIntersecting = isThresholdArray
        ? options.threshold.includes(entry.intersectionRatio)
        : entry.intersectionRatio === options.threshold;

      if (clone.isIntersecting) {
        listeners.onEnter && listeners.onEnter(clone, el);
      } else {
        listeners.onExit && listeners.onExit(clone, el);
      }
      listeners.onChange && listeners.onChange(clone, el);

      if (once) {
        unbind(el);
      }
    }, options);
    observer.observe(el);
    el._vobserver = observer;
  },

  unbind,
};
