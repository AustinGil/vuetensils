
<script>
import { safeSlot } from "../../utils"
/**
 * A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.
 */
export default {
  props: {
    /**
     * A promise or function that returns a promise.
     */
    await: {
      type: [Promise, Function],
      default: () => Promise.resolve(),
    },
    /**
     * The default value to provide for the `results`. Useful if the promise resolve value is undefined.
     */
    default: {
      type: undefined,
      default: undefined,
    },
  },

  data() {
    return {
      pending: false,
      results: this.default,
      error: null,
    }
  },

  watch: {
    await: {
      handler: "awaitOn",
      immediate: true,
    },

    pending: {
      handler(pending) {
        /**
         * Fired whenever the pending status changes.
         * @event pending
         * @type { boolean }
         */
        this.$emit("pending", pending)
      },
      immediate: true,
    },
  },

  methods: {
    awaitOn(promise) {
      if (!promise) return

      promise = typeof promise === "function" ? promise() : promise

      if (!promise.then) return

      this.pending = true
      this.results = this.default
      this.error = null

      return promise
        .then(results => {
          this.results = results
          /**
           * Fired after promise has resolved with the resolved value.
           * @event resolve
           * @type { unknown }
           */
          this.$emit("resolve", this.results)
        })
        .catch(error => {
          this.error = error
          /**
           * Fired after promise has rejected with the rejected error.
           * @event reject
           * @type { error }
           */
          this.$emit("reject", error)
        })
        .finally(() => {
          this.pending = false
          /**
           * Fired after promise has fulfilled, regardless of success or failure.
           * @event finally
           * @type { undefined }
           */
          this.$emit("finally")
        })
    },
  },

  render(h) {
    const pending = this.pending

    if (pending && this.$scopedSlots.pending) {
      /** @slot Rendered while the promise is in a pending state */
      const pendingSlot = this.$scopedSlots.pending()
      return safeSlot(h, pendingSlot)
    }

    const error = this.error

    if (!pending && error && this.$scopedSlots.rejected) {
      /** @slot Rendered when the promise has rejected. Provides the caught error. */
      const rejectSlot = this.$scopedSlots.rejected(error)
      return safeSlot(h, rejectSlot)
    }

    const results = this.results === undefined ? this.default : this.results

    if (!pending && this.$scopedSlots.resolved) {
      /** @slot Rendered when the promise has resolved. Provides the results. */
      const resolveSlot = this.$scopedSlots.resolved(results)
      return safeSlot(h, resolveSlot)
    }

    if (!this.$scopedSlots.default) return

    /** @slot Provides the status of the component for pending state, error, or results. */
    const defaultSlot = this.$scopedSlots.default({
      pending,
      results,
      error,
    })
    return safeSlot(h, defaultSlot)
  },
}
</script>
