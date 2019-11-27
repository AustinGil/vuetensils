<template>
  <div :class="['vts-img', classes.root]" :style="style">
    <div
      v-if="hasDimensions"
      :class="['vts-img__placeholder', classes.placeholder]"
      :style="{ background }"
    >
      <img
        :src="placeholder || dataUrl"
        :alt="$attrs.alt || ''"
        v-bind="$attrs"
      />
    </div>
    <img
      :src="dataUrl"
      :class="['vts-img__img', classes.img]"
      :alt="$attrs.alt || ''"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
const NAME = "vts-img"

/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 *
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
export default {
  inheritAttrs: false,
  // functional: true, // TODO

  props: {
    /**
     * Same as the HTML attribute
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * URL of the blurred placeholder image to use if you need one (ideally a very small image).
     */
    placeholder: String,
    /**
     * CSS background styles for the placeholder in case you just want colors.
     */
    background: String,

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    style() {
      const width = this.$attrs.width
      return {
        maxWidth: width && `${width}px`,
      }
    },

    hasDimensions() {
      const { width, height } = this.$attrs
      return !!width && !!height
    },

    dataUrl() {
      if (!this.hasDimensions) return ""
      const { width, height } = this.$attrs
      const w = 100
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = (height / width) * w

      return canvas.toDataURL()
    },
  },

  mounted() {
    let timeOut
    const { src } = this

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
        img.src = src
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
