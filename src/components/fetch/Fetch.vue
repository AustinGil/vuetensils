<script>
const NAME = "vts-fetch"

/**
 * Makes JSON API requests and provides responses, loading states, and errors
 */
export default {
  name: NAME,

  props: {
    url: {
      type: String
    }
  },

  data: () => ({
    loading: false,
    response: null,
    error: null
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    fetch(url) {
      this.loading = true
      this.response = null
      this.error = null
      fetch(url || this.url)
        .then(res => res.json())
        .then(response => {
          this.response = response
          this.loading = false
          /**
           * @event success
           * @type { object }
           */
          this.$emit("success", response)
        })
        .catch(error => {
          this.error = error
          this.loading = false
          /**
           * @event error
           * @type { object }
           */
          this.$emit("error", error)
        })
    }
  },

  render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    const scopedSlot = this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
      error: this.error,
      fetch: this.fetch
    })
    if (scopedSlot.length) {
      return create("div", [scopedSlot])
    }
    return scopedSlot
  }
}
</script>
