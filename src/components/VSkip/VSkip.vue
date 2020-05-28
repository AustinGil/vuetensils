<template functional>
  <a
    :ref="data.ref"
    :class="['vts-skip', data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    :href="props.to"
    v-on="listeners"
    @click="$options.skipTo(props.to)"
  >
    <slot>Skip to main content</slot>
  </a>
</template>

<script>
export default {
  name: "VSkip",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // mounted() {
  //   window.addEventListener(
  //     "hashchange",
  //     () => {
  //       this.skipTo(location.hash.substring(1))
  //     },
  //     false
  //   )
  //   if (location.hash && location.hash.substring(1)) {
  //     this.skipTo(location.hash.substring(1))
  //   }
  // },
  skipTo(id) {
    if (!id) return;

    const target = window.document.getElementById(id.slice(1));
    if (!target) return;

    if (
      !["a", "select", "input", "button", "textarea"].includes(
        target.tagName.toLowerCase()
      )
    ) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus();
  },
};
</script>

<style>
.vts-skip {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: -10000px;
  border: 3px solid;
  padding: 0.5rem;
  color: #000;
  background-color: #fff;
}

.vts-skip:focus {
  left: 0;
}
</style>
