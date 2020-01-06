<template>
  <div :class="['vts-img', classes.root]">
    <div
      v-if="dataUrl"
      :class="['vts-img__placeholder', classes.placeholder]"
      :style="{ background }"
    >
      <img :src="placeholder || dataUrl" alt="" v-bind="$attrs" />
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
     * Same as the HTML attribute
     */
    srcset: String,
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
    dataUrl() {
      const { width, height } = this.$attrs
      if (!width || !height) return ""

      const w = 100
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = (height / width) * w

      return canvas.toDataURL()
    },
  },

  mounted() {
    let timeOut
    const { src, srcset, $el } = this

    const observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector(`.${NAME}__img`)
      const placeholder = $el.querySelector(`.${NAME}__placeholder`)

      function onLoad() {
        img.removeEventListener("load", onLoad)
        $el.classList.remove(`${NAME}--loading`)
        $el.classList.add(`${NAME}--loaded`)
        if (placeholder) {
          timeOut = setTimeout(() => {
            placeholder.remove()
          }, 300)
        }
      }
      img.addEventListener("load", onLoad)

      if (entry.isIntersecting) {
        // Element is in viewport
        $el.classList.add(`${NAME}--loading`)
        if (!!srcset) {
          img.srcset = srcset
        }
        img.src = src
        observer.disconnect()
      }
    })
    observer.observe($el)

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
}

.vts-img img {
  vertical-align: top;
}

.vts-img__placeholder {
  position: absolute;
  overflow: hidden;
}

.vts-img__placeholder img {
  transform: scale(1.05);
  filter: blur(10px);
}

.vts-img__img {
  opacity: 0;
  transition: opacity 300ms ease;
}

.vts-img--loaded .vts-img__img {
  opacity: 1;
}
</style>
