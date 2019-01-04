export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    filterInput: {
      default: ""
    },
    filterFunction: {
      type: Function
    },
    sortFunction: {
      type: Function
    }
  },
  model: {
    prop: "items",
    event: "update"
  },

  data: () => ({
    localItems: []
  }),

  computed: {
    returned() {
      let items = this.localItems
      if (this.filterFunction) {
        items = items.filter(this.filterFunction)
      }
      if (this.sortFunction) {
        items = items.sort(this.sortFunction)
      }
      return items
    }
  },

  methods: {
    addItem(item) {
      this.$emit("added", item)
      this.localItems.push(item)
      this.$emit("update", this.localItems)
    },

    removeItem(index) {
      this.$emit("removed", this.localItems[index], index)
      this.localItems.splice(index, 1)
      this.$emit("update", this.localItems)
    }
  },

  watch: {
    items: {
      immediate: true,
      handler(next, prev) {
        this.localItems = next
      }
    }
  },

  render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    const scopedSlot = this.$scopedSlots.default({
      filteredItems: this.returned,
      addItem: this.addItem,
      removeItem: this.removeItem
    })
    if (scopedSlot.length) {
      console.warn("[ItemsList] Requires 1 root element. Using injected <div>.")
      return create("div", [scopedSlot])
    }
    return scopedSlot
  }
}
