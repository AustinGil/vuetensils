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
    sizes: String,
    // width: [String, Number],
    // height: [String, Number],
    background: String,
    alt: String,
    immediate: Boolean
  },

  mounted() {
    // this.$isServer

    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      const img = entry.target
      img.onload = function() {
        // delete img.dataset.src
        // delete img.dataset.srcset
        // delete img.dataset.sizes
        delete img.onload
        img.classList.remove(`${NAME}--loading`)
        img.classList.add(`${NAME}--loaded`)
      }
      if (entry.isIntersecting) {
        // Image is in viewport
        img.classList.add(`${NAME}--loading`)
        img.src = this.src
        observer.disconnect()
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
    // if (this.$parent.$isServer) {
    //   return create(false)
    // }

    // const classNames = (ctx.data.class || []).concat(['g-image'])

    return create("img", {
      class: NAME,
      attrs: {
        // src: "https://source.unsplash.com/random/900x600"
        // "data-test": "mytest"
      }
    })
  }
}
</script>
