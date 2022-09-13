<template>
  <a class="vts-skip" :href="to" @click="skipTo(to)">
    <slot>Skip to main content</slot>
  </a>
</template>

<script>
export default {
  name: 'VSkip',
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
  methods: {
    skipTo(id) {
      if (!id) return;

      const target = window.document.getElementById(id.slice(1));
      if (!target) return;

      if (
        !['a', 'select', 'input', 'button', 'textarea'].includes(
          target.tagName.toLowerCase()
        )
      ) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus();
    },
  },
};
</script>

<style>
:where(.vts-skip) {
  position: fixed;
  z-index: 1000;
  inset-block-start: 0;
  inset-inline-start: -10000px;
  border: 3px solid;
  padding: 0.5rem;
  color: #000;
  background-color: #fff;
}

:where(.vts-skip:focus) {
  inset-inline-start: 0;
}
</style>
