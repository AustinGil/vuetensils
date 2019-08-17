
<script>
import { safeSlot } from "../../utils"
/**
 * A renderless component for awaiting promises to resolve; great for making HTTP requests.
 *
 * Supports delayed resolution, manual promise calling, and re-triggering promises. The default scoped slot provides an object with the following signature:
 *
 * ```
 * {
 *   pending: Boolean;
 *   results: Any;
 *   error: Error;
 *   call: Function; // used to manually call a promise
 * }
 * ```
 */
export default {
  props: {
    /**
     * A promise reference or function that returns a promise. This is required unless you are going to manually call the promise with the `call()` method.
     */
    await: {
      type: [Promise, Function],
      default: () => Promise.resolve()
    },
    /**
     * The default value to provide for the `results`.
     */
    default: {
      type: undefined,
      default: undefined
    }
  },

  data() {
    return {
      pending: false,
      results: this.default,
      error: null
    }
  },

  watch: {
    await: {
      handler: "trigger",
      immediate: true
    },

    pending(pending) {
      this.$emit("pending", pending)
    }
  },

  methods: {
    trigger(promise) {
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
    }
  },

  render(h, test) {
    const pending = this.pending

    if (pending && this.$scopedSlots.pending) {
      const pendingSlot = this.$scopedSlots.pending()
      return safeSlot(h, pendingSlot)
    }

    const error = this.error

    if (error && this.$scopedSlots.reject) {
      const rejectSlot = this.$scopedSlots.reject(error)
      return safeSlot(h, rejectSlot)
    }

    const results = this.results === undefined ? this.default : this.results

    if (results !== undefined && this.$scopedSlots.resolve) {
      const resolveSlot = this.$scopedSlots.resolve(results)
      return safeSlot(h, resolveSlot)
    }

    if (!this.$scopedSlots.default) return h(false)

    const defaultSlot = this.$scopedSlots.default({
      pending,
      results,
      error
    })
    return safeSlot(h, defaultSlot)
  }
}
</script>
