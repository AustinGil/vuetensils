<template>
  <form
    v-if="action && data"
    :action="action"
    method="POST"
    class="vts-btn__form"
    @submit.prevent="$emit('submit', $event)"
  >
    <!-- target="_blank" ? -->
    <input
      v-for="(value, key) in data"
      :key="key"
      :value="value"
      :name="String(key)"
      type="hidden"
      hidden
      autocomplete="off"
      aria-hidden="true"
      tabindex="-1"
    />
    <button type="submit" v-bind="$attrs" class="vts-btn" v-on="listeners">
      <slot />
    </button>
  </form>

  <component
    :is="tag"
    v-else
    class="vts-btn"
    :type="type"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script>
import { isVue3 } from 'vue-demi';

export default {
  name: 'VBtn',
  inheritAttrs: false,
  props: {
    action: { type: String, default: '' },
    data: { type: Object, default: () => ({}) },
  },
  emits: ['submit'],
  computed: {
    tag() {
      const attrs = this.$attrs || {};
      if (attrs.to) {
        return 'RouterLink';
      }
      if (attrs.href) {
        return 'a';
      }
      return 'button';
    },
    type() {
      if (this.tag !== 'button') return;
      return this.$attrs.type || 'button';
    },
    listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },
};
</script>

<style>
.vts-btn__form {
  display: inline;
}
</style>
