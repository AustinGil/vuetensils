<script>
const NAME = "vts-img"
export default {
  name: NAME,
  // functional: true, // TODO

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
    const observer = new IntersectionObserver(entries => {
      const img = entries[0]
      img.onload = function() {
        // delete img.dataset.src
        // delete img.dataset.srcset
        // delete img.dataset.sizes
        // delete img.onload
        // img.classList.remove("g-image--loading")
        // img.classList.add("g-image--loaded")
      }
      if (img.isIntersecting) {
        observer.disconnect()
        console.log("intersecting ")
        // img.src = img.dataset.src
        // img.srcset = img.dataset.srcset
        // img.sizes = img.dataset.sizes
      }
    })

    observer.observe(this.$el)
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
