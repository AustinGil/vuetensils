<script>
const NAME = "vts-img"
export default {
  name: NAME,
  // functional: true,

  props: {
    src: {
      type: String,
      required: true
    },
    srcset: String,
    width: [String, Number],
    height: [String, Number],
    background: String,
    alt: String,
    immediate: Boolean
  },

  mounted() {
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) {
          console.log("this far...")
          // this.$emit("leave", [entries[0]])
        } else {
          // this.$emit("enter", [entries[0]])
          console.log("enter?")
        }
        // this.$emit("change", [entries[0]])
      }
      // {
      //   threshold: this.threshold,
      //   root: this.root,
      //   rootMargin: this.rootMargin
      // }
    )
    observer.observe(document.querySelector("img"))
    this.$once("hook:beforeDestroy", () => {
      observer.disconnect()
    })
  },

  render(create, ctx) {
    // const classNames = (ctx.data.class || []).concat(['g-image'])

    return create("img", {
      attrs: {
        src: "https://source.unsplash.com/random/900x600"
      }
    })
  }
}
</script>
