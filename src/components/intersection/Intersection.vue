<script>
const NAME = "vts-intersection"

/**
 * Adds [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to content and provides event callbacks
 */
export default {
  name: NAME,
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0, 0.2]
    },
    root: {
      type: String,
      required: false,
      default: () => null
    },
    rootMargin: {
      type: String,
      required: false,
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
          this.$emit("leave", [entries[0]])
        } else {
          this.$emit("enter", [entries[0]])
        }
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
    // TODO: check variable content support
    return create(
      this.tag,
      {
        class: NAME
      },
      [this.$slots.default]
    )
  }
}
</script>
