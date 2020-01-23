function unbind(el) {
  if (!el._vobserver) return
  el._vobserver.unobserve(el)
  delete el._vobserver
}

export default {
  inserted: (el, { value, modifiers }) => {
    const options = {
      ...value,
    }
    const { enter, exit, once } = modifiers

    if (options.root) {
      options.root =
        typeof options.root === "string"
          ? document.querySelector(options.root)
          : options.root
    }

    const listeners = { ...value }

    // Support passing direct function
    if (value instanceof Function) {
      if (enter) listeners.onEnter = value
      if (exit) listeners.onExit = value
      if (!enter && !exit) listeners.onChange = value
    }

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting } = entry

      if (isIntersecting) {
        listeners.onEnter && listeners.onEnter(entry, el)
      } else {
        listeners.onExit && listeners.onExit(entry, el)
      }
      listeners.onChange && listeners.onChange(entry, el)

      if (once) {
        unbind(el)
      }
    }, options)
    observer.observe(el)
    el._vobserver = observer
  },

  unbind,
}
