<template>
  <div :id="id" class="datepicker">
    <!-- TODO: slot -->
    <button aria-label="Choose Date" @click="show = !show">
      calendar btn {{ show }}
    </button>

    <div
      v-show="show"
      ref="calendar"
      class=""
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${id}-dialog-label`"
      @click="onClick"
      @keydown="onKeydown"
      @keydown.tab="focusTrap"
      @keydown.esc="show = false"
    >
      <div class="header">
        <button
          ref="prevYear"
          class="prevYear"
          aria-label="previous year"
          @click="incrementYearBy(-1)"
        >
          <slot name="prevYear">
            &#8606;
          </slot>
        </button>
        <button
          class="prevMonth"
          aria-label="previous month"
          @click="incrementMonthBy(-1)"
        >
          <slot name="prevMonth">
            &#8592;
          </slot>
        </button>
        <h4 :id="`${id}-dialog-label`" class="monthYear" aria-live="polite">
          {{ monthYear }}
        </h4>
        <button class="" aria-label="next month" @click="incrementMonthBy(1)">
          <slot name="nextMonth">
            &#8594;
          </slot>
        </button>
        <button class="" aria-label="next year" @click="incrementYearBy(1)">
          <slot name="nextYear">
            &#8608;
          </slot>
        </button>
      </div>
      <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -->
      <table class="" role="grid" :aria-labelledby="`${id}-dialog-label`">
        <thead>
          <tr>
            <th
              v-for="(val, key) in daysOfWeek"
              :key="key"
              :abbr="val"
              scope="col"
            >
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in 6" :key="week">
            <td
              v-for="day in daysByWeeks[week - 1]"
              :key="day.date.toString()"
              :class="[
                'vts-date__cell',
                { 'vts-date__cell--focused': day.isFocused },
              ]"
            >
              <button
                :class="[
                  'vts-date__day',
                  { 'vts-date__day--focused': day.isFocused },
                ]"
                :tabindex="day.isFocused ? '0' : '-1'"
                :aria-selected="day.isFocused"
                :value="day.date"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="">
        <button class="" value="cancel" @click="show = false">
          Cancel
        </button>
        <button class="" value="ok" @click="selectedDate = focusedDate">
          OK
        </button>
      </div>
      <div class="" aria-live="polite">
        Cursor keys can navigate dates
      </div>
    </div>
  </div>
</template>

<script>
import KEYCODES from '../../data/keycodes.js';
import { randomString, applyFocusTrap } from '../../utils.js';

/**
 * @param {object} first
 * @param {object} second
 * @return {boolean}
 */
function sameDays(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

const keysUsed = [
  KEYCODES.UP,
  KEYCODES.DOWN,
  KEYCODES.LEFT,
  KEYCODES.RIGHT,
  KEYCODES.PAGEUP,
  KEYCODES.PAGEDOWN,
  KEYCODES.HOME,
  KEYCODES.END,
];

export default {
  // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
  model: {
    prop: 'date',
    event: 'update',
  },

  props: {
    date: {
      type: [Date, String],
      default: new Date(),
    },

    id: {
      type: String,
      default: () => `vts-${randomString(4)}`,
    },

    daysOfWeek: {
      type: Object,
      default: () => {
        return Object.freeze({
          Su: 'Sunday',
          Mo: 'Monday',
          Tu: 'Tuesday',
          We: 'Wednesday',
          Th: 'Thursday',
          Fr: 'Friday',
          Sa: 'Saturday',
        });
      },
    },

    monthLabels: {
      type: Array,
      default: () => [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      show: false,
      previousActiveEl: null,
      focusedDate: new Date(this.date),
      selectedDate: new Date(this.date),
    };
  },

  computed: {
    monthYear() {
      const { monthLabels, focusedDate } = this;
      return `${
        monthLabels[focusedDate.getMonth()]
      } ${focusedDate.getFullYear()}`;
    },

    daysByWeeks() {
      const { focusedDate, selectedDate } = this;
      const firstDayOfMonth = new Date(
        focusedDate.getFullYear(),
        focusedDate.getMonth(),
        1
      );
      const dayOfWeek = firstDayOfMonth.getDay();
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      const daysInMonth = new Date(
        focusedDate.getFullYear(),
        focusedDate.getMonth() + 1,
        0
      ).getDate();

      const d = new Date(firstDayOfMonth);
      const maxWeeks = dayOfWeek + daysInMonth < 36 ? 5 : 6;
      const weeks = [];

      for (let i = 0; i < maxWeeks; i++) {
        weeks.push([]);

        for (let j = 0; j < 7; j++) {
          const date = new Date(d);
          weeks[i].push({
            date,
            isFocused: sameDays(date, focusedDate),
            isSelected: sameDays(date, selectedDate),
          });
          d.setDate(d.getDate() + 1);
        }
      }

      return weeks;
    },
  },

  watch: {
    show(isShow) {
      const { previousActiveEl, date } = this;
      if (isShow) {
        this.previousActiveEl = document.activeElement;
        this.focusedDate = new Date(date);
        this.$nextTick(() => {
          this.$el.querySelector('button[aria-selected="true"]').focus();
        });
      } else if (previousActiveEl) {
        previousActiveEl.focus();
      }
    },

    selectedDate(date) {
      this.$emit('update', date);
      this.show = false;
    },
  },

  methods: {
    incrementMonthBy(inc) {
      const { focusedDate } = this;
      // get last day of prev/next month
      const last = new Date(focusedDate);
      last.setMonth(last.getMonth() + inc + 1);
      last.setDate(0);

      const fd = new Date(focusedDate);
      fd.setDate(Math.min(fd.getDate(), last.getDate())); // Must happen before month change`
      fd.setMonth(fd.getMonth() + inc);

      this.focusedDate = fd;
    },

    incrementYearBy(inc) {
      const d = new Date(this.focusedDate);
      d.setFullYear(d.getFullYear() + inc);
      this.focusedDate = d;
    },

    onClick({ target }) {
      if (!target.classList.contains('vts-date__day')) return;
      this.selectedDate = new Date(target.value);
    },

    onKeydown(event) {
      // Use event delegation on parent so we dont have 42 event listeners on buttons
      if (!event.target.classList.contains('vts-date__day')) return;
      if (!keysUsed.includes(event.keyCode)) return;

      event.stopPropagation();
      event.preventDefault();

      const { focusedDate } = this;
      let d = new Date(focusedDate);

      switch (event.keyCode) {
        case KEYCODES.ENTER:
        case KEYCODES.SPACE:
          this.selectedDate = d;
          return;

        case KEYCODES.RIGHT:
          d.setDate(d.getDate() + 1);
          break;

        case KEYCODES.LEFT:
          d.setDate(d.getDate() - 1);
          break;

        case KEYCODES.DOWN:
          d.setDate(d.getDate() + 7);
          break;

        case KEYCODES.UP:
          d.setDate(d.getDate() - 7);
          break;

        case KEYCODES.PAGEUP:
          if (event.shiftKey) {
            d.setFullYear(focusedDate.getFullYear() - 1);
          } else {
            d.setMonth(focusedDate.getMonth() - 1);
          }
          break;

        case KEYCODES.PAGEDOWN:
          if (event.shiftKey) {
            d.setFullYear(focusedDate.getFullYear() + 1);
          } else {
            d.setMonth(focusedDate.getMonth() + 1);
          }
          break;

        case KEYCODES.HOME:
          d.setDate(d.getDate() - d.getDay());
          break;

        case KEYCODES.END:
          d.setDate(d.getDate() + (6 - d.getDay()));
          break;
      }
      this.focusedDate = d;
      this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      });
    },

    focusTrap(event) {
      applyFocusTrap(this.$refs.calendar, event);
    },
  },
};
</script>

<style>
.datepicker {
  position: relative;
}

.datepicker .datepickerDialog {
  /* position: absolute;
  width: 45%;
  clear: both;
  display: none; */
}

.datepicker .header {
  display: flex;
  justify-content: space-around;
}
</style>
