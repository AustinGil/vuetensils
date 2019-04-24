<script>
const NAME = "vts-img"

/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 <br>
 <br>
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
export default {
  // name: NAME,
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
    alt: String
  },

  mounted() {
    let timeOut
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
          timeOut = setTimeout(() => {
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
      if (timeOut) {
        clearTimeout(timeOut)
      }
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

    let placeholderSrc = false
    const hasDimensions = this.width && this.height
    let placeholder = create(false)

    if (hasDimensions) {
      const w = 100
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = (this.height / this.width) * w

      placeholderSrc = canvas.toDataURL()

      placeholder = create(
        "div",
        {
          class: `${NAME}__placeholder`,
          style: {
            background: this.background || false
          }
        },
        [
          create("img", {
            attrs: {
              src: this.placeholder || placeholderSrc,
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
        src: placeholderSrc,
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
      [placeholder, img]
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

.vts-img__img {
  position: relative;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vts-img__placeholder {
  position: absolute;
  top: 0;
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
