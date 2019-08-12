<script>
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
    },
    /**
     * Flag to control immediate execution of the promise passed by `await` prop on `mounted()` hook.
     */
    lazy: Boolean
  },

  data() {
    return {
      pending: false,
      results: this.default,
      error: null
    }
  },

  mounted() {
    if (this.lazy) return
    this.trigger(this.await)
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
    },

    /**
     * Used for manually calling promises from the default scoped slot. Can accept a new promise (or function that resolves to a promise), or falls back to the `await` prop.
     * @param { promise, function } promise
     * @public
     */
    call(promise) {
      this.trigger(promise || this.await)
    }
  },

  render(h, test) {
    if (!this.$scopedSlots.default) {
      return h(false)
    }

    const scopedSlot = this.$scopedSlots.default({
      pending: this.pending,
      results: typeof this.results !== "undefined" ? this.results : this.default,
      error: this.error,
      call: this.call
    })

    if (scopedSlot && scopedSlot.length > 1) {
      return h("div", [scopedSlot])
    }

    return scopedSlot
  }
}
</script>
