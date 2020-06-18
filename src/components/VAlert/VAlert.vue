<template>
  <transition :name="transition">
    <component
      :is="tag"
      v-if="!dismissed && !!visible"
      role="alert"
      :class="['vts-alert', classes.root]"
    >
      <!-- @slot The default slot content that is shown to the user -->
      <slot />

      <button
        v-if="dismissible"
        :aria-label="dismissLabel"
        :class="['vts-alert__dismiss', classes.dismiss]"
        @click="dismiss"
      >
        <!-- @slot The dismiss button content -->
        <slot name="dismiss">
          &times;
        </slot>
      </button>
    </component>
  </transition>
</template>

<script>
/**
 * A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.
 */
export default {
  name: 'VAlert',
  model: {
    prop: 'visible',
    event: 'update',
  },

  props: {
    /**
     * HTML tag used to wrap the component.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Determines whether the alert is visible. Also binds with `v-model`.
     */
    visible: {
      type: [Boolean, Number],
      default: true,
    },
    /**
     * Allows a user to dismiss this alert.
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Aria-label that is not visibly, but screen readers will read for the dismiss button.
     */
    dismissLabel: {
      type: [String, Boolean],
      default: 'Dismiss this alert',
    },
    /**
     * The transition name if you want to add one.
     */
    transition: {
      type: String,
      default: undefined,
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    dismissed: false,
    timerId: null,
  }),

  watch: {
    visible: {
      handler(visible) {
        if (visible) {
          this.dismissed = false;
        }
        if (typeof visible === 'number') {
          this.clearTimer(); // Clear timers in case this.visible watcher adds multiples
          this.countdown();
        }
      },
      immediate: true,
    },
  },

  beforeDestroy() {
    this.clearTimer();
  },

  methods: {
    dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       *
       * @event dismiss
       * @type { undefined }
       */
      this.$emit('dismiss');
      this.dismissed = true;
      if (typeof this.visible === 'number') {
        this.$emit('update', 0);
        this.clearTimer();
      } else {
        this.$emit('update', false);
      }
    },

    countdown() {
      const { visible } = this;
      if (visible <= 0) return;

      this.timerId = setTimeout(() => {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         *
         * @event update
         * @type { boolean/number }
         */
        this.$emit('update', visible - 1);
      }, 1000);
    },

    clearTimer() {
      const { timerId } = this;
      if (timerId) {
        clearInterval(timerId);
        this.timerId = null;
      }
    },
  },
};
</script>
