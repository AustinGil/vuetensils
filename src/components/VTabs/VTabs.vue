<template>
  <div :class="['vts-tabs', classes.root]">
    <div
      role="tablist"
      :aria-label="label"
      :aria-orientation="orientation"
      :class="['vts-tabs__tablist', classes.tablist]"
    >
      <button
        v-for="(tab, index) in tabList"
        :id="`${id}-${tab}`"
        :key="tab"
        :ref="tab"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? null : -1"
        :aria-controls="`${id}-${tab.replace('tab', 'panel')}`"
        :class="[
          `vts-tabs__tab vts-tabs__tab--${tab} vts-tabs__tab--${index}`,
          {
            'vts-tabs__tab--active': index === activeIndex,
            [classes.tabActive]: index === activeIndex,
          },
          classes.tab,
        ]"
        role="tab"
        type="button"
        @keydown="onKeydown($event, tab, index)"
        @click="onClick($event, tab, index)"
      >
        <slot :name="tab" />
      </button>
    </div>

    <div
      v-for="(tab, index) in panelList"
      :id="`${id}-panel-${index}`"
      :key="tab"
      :aria-labelledby="`${id}-tab-${index}`"
      :hidden="index !== activeIndex"
      :class="[
        `vts-tabs__panel vts-tabs__panel--${index}`,
        {
          'vts-tabs__panel--active': index === activeIndex,
          [classes.panelActive]: index === activeIndex,
        },
        classes.panel,
      ]"
      tabindex="0"
      role="tabpanel"
    >
      <slot :name="tab" />
    </div>
  </div>
</template>

<script>
import { randomString } from '../../utils.js';
import keycodes from '../../data/keycodes.js';

// const NAME = "vts-tabs"

// https://codesandbox.io/embed/vue-tabs-pt5lm?codemirror=1

/**
 * Show and hide content based on which tabs are selected.
 *
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 *
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
export default {
  name: 'VTabs',

  model: {
    prop: 'active',
    event: 'change',
  },

  props: {
    active: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: undefined,
    },
    orientation: {
      type: String,
      default: 'horizontal',
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      activeIndex: this.active,
      activeTab: this.active,
    };
  },

  computed: {
    /** @returns {Array} */
    tabList() {
      return Object.keys(this.$slots).filter((name) => name.startsWith('tab-'));
    },
    /** @returns {Array} */
    panelList() {
      return Object.keys(this.$slots).filter((name) =>
        name.startsWith('panel-')
      );
    },
  },

  watch: {
    active(next) {
      this.activeIndex = Math.max(0, Math.min(this.tabList.length - 1, next));
    },
    activeIndex(next) {
      this.$emit('change', next);
    },
  },

  created() {
    this.id = this.$attrs.id || `vts-${randomString(4)}`;
  },

  methods: {
    onClick(event, tab, index) {
      if (this.activeIndex !== index) {
        this.$nextTick(() => this.$emit('tabChange', { event, tab, index }));
      }
      this.activeIndex = index;
    },
    onKeydown(event, tab, index) {
      const { keyCode } = event;
      const oldIndex = this.activeIndex;
      switch (keyCode) {
        case keycodes.END:
          event.preventDefault();
          this.activeIndex = this.tabList.length - 1;
          this.setFocus();
          break;
        case keycodes.HOME:
          event.preventDefault();
          this.activeIndex = 0;
          this.setFocus();
          break;
        // Up and down are in keydown because we need to prevent page scroll >:)
        case keycodes.LEFT:
        case keycodes.RIGHT:
        case keycodes.UP:
        case keycodes.DOWN:
          this.determineOrientation(event);
          break;
      }

      if (oldIndex !== this.activeIndex) {
        this.$nextTick(() => this.$emit('tabChange', { 
          event, 
          tab: this.tablist[this.activeIndex], 
          index: this.activeIndex 
        }));
      }
    },

    // When a tabList's aria-orientation is set to vertical, only up and down arrow should function. In all other cases only left and right arrow function.
    determineOrientation(event) {
      const keyCode = event.keyCode;
      let proceed = false;
      if (this.orientation === 'vertical') {
        if (keyCode === keycodes.UP || keyCode === keycodes.DOWN) {
          event.preventDefault();
          proceed = true;
        }
      } else {
        if (keyCode === keycodes.LEFT || keyCode === keycodes.RIGHT) {
          event.preventDefault();
          proceed = true;
        }
      }
      if (proceed) {
        this.switchTabOnArrowPress(event);
        this.setFocus();
      }
    },

    // Either focus the next, previous, first, or last tab depening on key pressed
    switchTabOnArrowPress(event) {
      const keyCode = event.keyCode;
      const directions = {
        [keycodes.LEFT]: -1,
        [keycodes.UP]: -1,
        [keycodes.RIGHT]: 1,
        [keycodes.DOWN]: 1,
      };

      /* istanbul ignore next */
      if (!directions[keyCode]) return;

      const activeIndex = this.activeIndex;
      const tabLength = this.tabList.length;
      const nextIndex = activeIndex + directions[keyCode];

      if (nextIndex < 0) {
        this.activeIndex = tabLength - 1;
      } else if (nextIndex >= tabLength) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = nextIndex;
      }
    },

    setFocus() {
      const { $refs, tabList, activeIndex } = this;
      const activeTab = tabList[activeIndex];

      return $refs[activeTab][0].focus();
    },
  },
};
</script>
