// https://github.com/heavyy/vue-intersect

const NAME = "vts-intersection"

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
  },
  destroyed() {
    this.observer.disconnect()
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
