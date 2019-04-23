<template>
  <div
    v-if="tablist.length"
    class="vts-tabs"
  >
    <div
      role="tablist"
      :aria-label="label"
      :aria-orientation="orientation"
      class="vts-tablist"
    >
      <button
        v-for="(tab, index) in tablist"
        :key="tab"
        ref="tab"
        @keydown="onKeydown"
        @click="activeIndex = index"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? false : -1"
        :id="`${id}-tab-${index}`"
        :aria-controls="`${id}-panel-${index}`"
        :class="`vts-tabs__tab vts-tabs__tab--${index}`"
        role="tab"
      >{{ tab }}</button>
    </div>

    <div
      v-for="(tab, index) in tablist"
      :key="tab"
      :id="`${id}-panel-${index}`"
      :aria-labelledby="`${id}-tab-${index}`"
      :hidden="index !== activeIndex"
      :class="`vts-tabs__panel vts-tabs__panel--${index}`"
      tabindex="0"
      role="tabpanel"
    >
      <slot :name="tab"></slot>
    </div>
  </div>
</template>

<script>
import keycodes from "../../data/keycodes"

const NAME = "vts-tabs"

/**
 * Show and hide content based on which tabs are selected.
 * <br><br>
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 * <br><br>
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
export default {
  // name: NAME,

  props: {
    /**
     * Support for aria-label attribute
     */
    label: String,
    /**
     * Support for aria-orientation attribute
     */
    orientation: {
      type: String,
      default: "horizontal"
    }
  },

  data: () => ({
    activeIndex: 0
  }),

  computed: {
    tablist() {
      return Object.keys(this.$slots)
    },

    id() {
      if (this.$attrs.id) return this.$attrs.id
      return Array(6)
        .fill()
        .map(() => Math.floor(36 * Math.random()).toString(36))
        .join("")
    }
  },

  methods: {
    onKeydown(event) {
      const { keyCode } = event
      switch (keyCode) {
        case keycodes.END:
          event.preventDefault()
          this.activeIndex = this.tablist.length - 1
          this.setFocus()
          break
        case keycodes.HOME:
          event.preventDefault()
          this.activeIndex = 0
          this.setFocus()
          break
        // Up and down are in keydown because we need to prevent page scroll >:)
        case keycodes.LEFT:
        case keycodes.RIGHT:
        case keycodes.UP:
        case keycodes.DOWN:
          this.determineOrientation(event)
          break
      }
    },

    // When a tablist's aria-orientation is set to vertical, only up and down arrow should function. In all other cases only left and right arrow function.
    determineOrientation(event) {
      const keyCode = event.keyCode
      let proceed = false
      if (this.orientation === "vertical") {
        if (keyCode === keycodes.UP || keyCode === keycodes.DOWN) {
          event.preventDefault()
          proceed = true
        }
      } else {
        if (keyCode === keycodes.LEFT || keyCode === keycodes.RIGHT) {
          proceed = true
        }
      }
      if (proceed) {
        this.switchTabOnArrowPress(event)
        this.setFocus()
      }
    },

    // Either focus the next, previous, first, or last tab depening on key pressed
    switchTabOnArrowPress(event) {
      const keyCode = event.keyCode
      const directions = {
        [keycodes.LEFT]: -1,
        [keycodes.UP]: -1,
        [keycodes.RIGHT]: 1,
        [keycodes.DOWN]: 1
      }

      /* istanbul ignore next */
      if (!directions[keyCode]) return
      const nextIndex = this.activeIndex + directions[keyCode]
      if (nextIndex < 0) {
        this.activeIndex = this.$refs.tab.length - 1
      } else if (nextIndex >= this.$refs.tab.length) {
        this.activeIndex = 0
      } else {
        this.activeIndex = nextIndex
      }
    },

    setFocus() {
      this.$refs.tab[this.activeIndex].focus()
    }
  }
}
</script>
