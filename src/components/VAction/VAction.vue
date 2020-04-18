<template functional>
  <component
    :is="$options.tag(props, data)"
    v-bind="data.attrs"
    :to="props.to || false"
    class="vts-action"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: "",
    },
  },

  tag({ to }, { attrs }) {
    if (to) {
      return "RouterLink"
    }
    if (attrs && attrs.href) {
      return "a"
    }
    return "button"
  },
}
</script>
