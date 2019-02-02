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
        if (placeholder) {
          setTimeout(() => {
            placeholder.remove()
          }, 300)
        }
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

    const hasDimensions = this.width && this.height

    let aspectRatio = create(false)
    if (hasDimensions) {
      aspectRatio = create("div", {
        class: `${NAME}__aspect-ratio`,
        style: {
          paddingTop: (this.height / this.width) * 100 + "%",
          background: this.background || false
        }
      })
    }

    let placeholder = create(false)
    if (hasDimensions && this.placeholder) {
      placeholder = create(
        "div",
        {
          class: `${NAME}__placeholder`
        },
        [
          create("img", {
            attrs: {
              src: this.placeholder,
              width: this.width,
              height: this.height
            }
          })
        ]
      )
    }

    const img = create("img", {
      class: `${NAME}__img`,
      attrs: {
        ...this.$attrs,
        width: this.width || false,
        height: this.height || false
      }
    })

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
        class: [NAME, { [`${NAME}--has-dimensions`]: hasDimensions }],
        style: {
          maxWidth: this.width + "px"
        }
      },
      [aspectRatio, placeholder, img]
    )
  }
}
</script>

<style>
.vts-img {
  display: inline-block;
  position: relative;
  width: 100%;
}

.vts-img img {
  vertical-align: top;
}

.vts-img--has-dimensions .vts-img__img,
.vts-img--has-dimensions .vts-img__placeholder {
  position: absolute;
  top: 0;
  left: 0;
}

.vts-img__img {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vts-img__placeholder {
  overflow: hidden;
}

.vts-img__placeholder img {
  transform: scale(1.05);
  filter: blur(10px);
}

.vts-img--loaded .vts-img__img {
  opacity: 1;
}
</style>
