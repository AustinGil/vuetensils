<script>
const NAME = "vts-intersection"

/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
export default {
  name: NAME,
  props: {
    threshold: {
      type: Array,
      default: () => [0, 0.2]
    },
    root: {
      type: String,
      default: () => null
    },
    rootMargin: {
      type: String,
      default: () => "0px 0px 0px 0px"
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          /**
           * Fired when the observed element enters the screen.
           * @event enter
           * @type { IntersectionObserverEntry }
           */
          this.$emit("enter", [entries[0]])
        } else {
          /**
           * Fired when the observed element exits the screen.
           * @event exit
           * @type { IntersectionObserverEntry }
           */
          this.$emit("exit", [entries[0]])
        }
        /**
         * Fired when the observed element enters or exits the screen.
         * @event change
         * @type { IntersectionObserverEntry }
         */
        this.$emit("change", [entries[0]])
      },
      {
        threshold: this.threshold,
        root: this.root,
        rootMargin: this.rootMargin
      }
    )
    this.observer.observe(this.$el)
    this.$once("hook:beforeDestroy", () => {
      this.observer.disconnect()
    })
  },
  render(create) {
    return create(this.tag, { class: NAME }, [this.$slots.default])
  }
}
</script>
