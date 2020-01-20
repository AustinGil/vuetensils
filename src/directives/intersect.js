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
    const { enter, leave, once } = modifiers
    let initiated = false // prevent firing the handlers until after first run

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
      if (leave) listeners.onLeave = value
      if (!enter && !leave) listeners.onChange = value
    }

    const observer = new IntersectionObserver(entries => {
      if (!initiated) {
        initiated = true
        return
      }
      const { isIntersecting } = entries[0]

      if (isIntersecting) {
        listeners.onEnter && listeners.onEnter(el)
      } else {
        listeners.onLeave && listeners.onLeave(el)
      }
      listeners.onChange && listeners.onChange(el, isIntersecting)

      if (once) {
        unbind(el)
      }
    }, options)
    observer.observe(el)
    el._vobserver = observer
  },

  unbind,
}
