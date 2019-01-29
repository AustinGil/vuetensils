<script>
const NAME = "vts-img"

export default {
  name: NAME,
  inheritAttrs: false,
  // functional: true, // TODO

  props: {
    src: {
      type: String,
      required: true,
      default: ""
    },
    srcset: String,
    sizes: String,
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    placeholder: String,
    background: String,
    // immediate: Boolean,
    alt: String
  },

  mounted() {
    // this.$isServer
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      const wrapper = entry.target
      const img = entry.target.querySelector(".vts-img__img")
      const placeholder = entry.target.querySelector(".vts-img__placeholder")

      img.onload = function() {
        delete img.onload
        wrapper.classList.remove(`${NAME}--loading`)
        wrapper.classList.add(`${NAME}--loaded`)
        setTimeout(() => {
          placeholder.remove()
        }, 300)
      }
      if (entry.isIntersecting) {
        // Element is in viewport
        wrapper.classList.add(`${NAME}--loading`)
        img.src = this.src
        if (!!this.srcset) img.srcset = this.srcset
        if (!!this.alt) img.alt = this.alt
        observer.disconnect()
      }
    })

    observer.observe(this.$el)
    this.$once("hook:beforeDestroy", () => {
      observer.disconnect()
    })
  },

  render(create, ctx) {
    // const randomStr = Math.random()
    //   .toString(36)
    //   .substr(2)
    // const id = `${NAME}-${randomStr}`
    // if (this.$parent.$isServer) {
    //   return create(false)
    // }

    const img = create("img", {
      class: `${NAME}__img`,
      attrs: {
        ...this.$attrs,
        width: this.width || false,
        height: this.height || false
      }
    })

    let placeholder = create(false)
    // Only add the placeholder if we have something to show, and we have the dimensions
    if ((this.placeholder || this.background) && this.width && this.height) {
      placeholder = create("div", { class: `${NAME}__placeholder` }, [
        create("img", {
          attrs: {
            src: this.placeholder,
            width: this.width,
            height: this.height
          },
          style: {
            background: this.background || false
          }
        })
      ])
    }

    // TODO: Add this when SSR support is enabled
    // const noscript = create("noscript", [
    //   create("img", {
    //     attrs: {
    //       src: this.src || ''
    //     }
    //   })
    // ])
    return create(
      "div",
      {
        class: NAME
      },
      [placeholder, img]
    )
  }
}
</script>

<style>
.vts-img {
  position: relative;
}

.vts-img img {
  vertical-align: top;
}

.vts-img__img {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vts-img__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.vts-img__placeholder img {
  transform: scale(1.05);
  filter: blur(10px);
}

.vts-img--loaded .vts-img__placeholder {
  opacity: 0;
}

.vts-img--loaded .vts-img__img {
  opacity: 1;
}
</style>
