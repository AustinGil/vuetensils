<template>
  <div
    v-on-clickaway="
      () => {
        isOpen ? cancel() : null
      }
    "
    class="relative"
  >
    <div
      ref="input"
      class="block w-full border px-3 py-2 bg-white rounded focus:outline-0 focus:shadow-focus"
      :class="{ 'shadow-focus': isOpen }"
      tabindex="0"
      @click="open"
      @keydown.up.prevent="open"
      @keydown.down.prevent="open"
      @keydown.space.prevent="open"
    >
      <span v-if="value !== null">{{ value }}</span>
      <span v-else class="text-grey-dark">Select a band...</span>
    </div>
    <div
      v-show="isOpen"
      class="mt-1 absolute pin-x bg-grey-darkest p-2 rounded shadow z-50"
    >
      <!-- TODO: -->
      <!-- <input
        ref="search"
        :value="search"
        type="text"
        class="block mb-2 w-full px-3 py-2 bg-grey-darker text-white rounded"
        style="outline: 0;"
        @input="
          e => {
            $emit('search', e.target.value)
          }
        "
        @keydown.up="highlightPrev"
        @keydown.down="highlightNext"
        @keydown.enter.prevent="commitSelection"
        @keydown.esc="cancel"
        @keydown.tab.prevent
      /> -->
      <ul
        v-show="options.length"
        ref="options"
        class="list-reset relative overflow-y-auto scrolling-touch"
        style="max-height: 200px;"
      >
        <li
          v-for="(option, i) in options"
          ref="option"
          :key="option"
          class="px-3 py-2 text-white cursor-pointer rounded"
          :class="[i === highlightedIndex ? 'bg-blue' : 'hover:bg-grey-darker']"
          @click="select(i)"
          @keydown.enter="$log('TODO')"
        >
          {{ option }}
        </li>
      </ul>
      <div v-show="options.length === 0" class="px-3 py-2 text-grey">
        No results found for "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"

export default {
  mixins: [clickaway],
  props: {
    value: {
      type: String,
      default: undefined
    },
    search: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: undefined
    }
  },

  data() {
    return {
      isOpen: false,
      highlightedIndex: 0,
    }
  },
  methods: {
    open() {
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    close() {
      this.isOpen = false
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    cancel() {
      this.close()
    },
    commitSelection() {
      this.$emit("input", this.options[this.highlightedIndex])
      this.$emit("search", "")
      this.close()
    },
    select(index) {
      this.highlightedIndex = index
      this.commitSelection()
    },
    highlight(index) {
      this.open()
      this.highlightedIndex = index
      this.$nextTick(() => {
        this.$refs.option[index].scrollIntoView({ block: "nearest" })
      })
    },
    highlightPrev() {
      this.highlight(
        this.highlightedIndex - 1 < 0
          ? this.options.length - 1
          : this.highlightedIndex - 1
      )
    },
    highlightNext() {
      this.highlight(
        this.highlightedIndex + 1 >= this.options.length
          ? 0
          : this.highlightedIndex + 1
      )
    },
  },
}
</script>

<style>
.shadow-focus {
  box-shadow: 0 0 0 4px rgba(52, 144, 220, 0.5);
}
.focus\:shadow-focus:focus {
  box-shadow: 0 0 0 4px rgba(52, 144, 220, 0.5);
}
.focus\:outline-0:focus {
  outline: 0;
}
</style>
