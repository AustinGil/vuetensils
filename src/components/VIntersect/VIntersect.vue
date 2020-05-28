<script>
import { safeSlot } from "../../utils";

/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
export default {
  name: "VIntersect",
  props: {
    /**
     * The IntersectionObserver threshold value.
     */
    threshold: {
      type: [Number, Array],
      default: () => null,
    },
    /**
     * The IntersectionObserver root value.
     */
    root: {
      type: String,
      default: undefined,
    },
    /**
     * The IntersectionObserver rootMargin value.
     */
    rootMargin: {
      type: String,
      default: undefined,
    },

    options: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    entry: {},
  }),

  mounted() {
    const { root, threshold, rootMargin, options, handler } = this;
    const observerOptions = {
      ...options,
      root,
      threshold,
      rootMargin,
    };

    this.observer = new IntersectionObserver(handler, observerOptions);
    this.observer.observe(this.$el);

    this.$once("hook:beforeDestroy", () => {
      this.observer.disconnect();
    });
  },

  methods: {
    handler([entry]) {
      this.entry = entry;
      // console.log(entry)
      if (entry.isIntersecting) {
        /**
         * Fired when the observed element enters the screen.
         * @event enter
         * @type { IntersectionObserverEntry }
         */
        this.$emit("enter", entry);
      } else {
        /**
         * Fired when the observed element exits the screen.
         * @event exit
         * @type { IntersectionObserverEntry }
         */
        this.$emit("exit", entry);
      }
      /**
       * Fired when the observed element enters or exits the screen.
       * @event change
       * @type { IntersectionObserverEntry }
       */
      this.$emit("change", entry);
    },
  },

  render(h) {
    // @slot Content to be tracked with IntersectionObserver
    const { entry } = this;

    /** @slot Slot content providing isIntersecting */
    const defaultSlot = this.$slots.default;
    const scopedSlot = this.$scopedSlots.default;

    if (defaultSlot) {
      return safeSlot(h, defaultSlot);
    }

    return safeSlot(h, scopedSlot(entry));
  },
};
</script>
