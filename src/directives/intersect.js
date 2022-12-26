/** @typedef {import('vue').DirectiveHook} DirectiveHook */

/** @type {DirectiveHook} */
function unmounted(el) {
  if (!el._vtsIntersect) return;
  el._vtsIntersect.unobserve(el);
  delete el._vtsIntersect;
}

/** @type {DirectiveHook} */
function mounted(el, { value, modifiers }) {
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
    for (const key in entry) {
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
      unmounted(el);
    }
  }, options);
  observer.observe(el);
  el._vtsIntersect = observer;
}

/**
 * @type {import('vue').Directive & { inserted: DirectiveHook, unbind: DirectiveHook }}
 */
export default {
  mounted,
  unmounted,
  // TODO: Drop Vue 2
  inserted: mounted,
  unbind: unmounted,
};
