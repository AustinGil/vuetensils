const NAME = "vts-fetch"

export default {
  name: NAME,
  props: ["url"],
  data: () => ({
    loading: false,
    response: null,
    error: null
  }),
  mounted() {
    this.send()
  },
  methods: {
    async send(url) {
      this.loading = true
      this.response = null
      this.error = null
      try {
        const response = await fetch(url || this.url).then(res => res.json())
        this.response = response
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
  render() {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    const scopedSlot = this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
      error: this.error,
      send: this.send
    })
    if (scopedSlot.length) {
      console.warn("[ItemsList] Requires 1 root element. Using injected <div>.")
      return create("div", [scopedSlot])
    }
    return scopedSlot
  }
}
