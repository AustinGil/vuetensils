<script>
const NAME = "vts-intersection"

/**
 * Adds [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to content and provides event callbacks
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
        if (!entries[0].isIntersecting) {
          /**
           * @event leave
           * @type { IntersectionObserverEntry }
           */
          this.$emit("leave", [entries[0]])
        } else {
          /**
           * @event enter
           * @type { IntersectionObserverEntry }
           */
          this.$emit("enter", [entries[0]])
        }
        /**
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
