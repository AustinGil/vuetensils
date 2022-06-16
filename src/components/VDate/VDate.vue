<template>
  <div :id="id" v-clickout="onClickout" :class="['vtd-date', classes.root]">
    <slot v-bind="toggle">
      <button
        v-bind="toggle.bind"
        type="button"
        :class="['vtd-date__toggle', classes.toggle]"
        v-on="toggle.on"
      >
        <span role="img" :aria-label="buttonLabels.showCalendar">
          &#x1F4C5;
        </span>
      </button>
    </slot>

    <div
      v-show="show"
      ref="calendar"
      class=""
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${id}-dialog-label`"
      :class="['vtd-date__wrapper', classes.wrapper]"
      @click="onClick"
      @keydown="onKeydown"
      @keydown.tab="onTab"
      @keydown.esc="show = false"
    >
      <div class="vts-date__navigation">
        <button
          :class="['vtd-date__prev-year', classes.prevYear]"
          :aria-label="buttonLabels.previousYear"
          type="button"
          :disabled="disableNav.prevYear"
          @click="incrementYearBy(-1)"
        >
          <slot name="prevYearLabel">&#8606;</slot>
        </button>
        <button
          :class="['vtd-date__prev-month', classes.prevMonth]"
          :aria-label="buttonLabels.previousMonth"
          type="button"
          :disabled="disableNav.prevMonth"
          @click="incrementMonthBy(-1)"
        >
          <slot name="prevMonthLabel">&#8592;</slot>
        </button>
        <h4
          :id="`${id}-dialog-label`"
          :class="['vtd-date__title', classes.title]"
          aria-live="polite"
        >
          {{ monthYear }}
        </h4>
        <button
          :class="['vtd-date__next-month', classes.nextMonth]"
          :aria-label="buttonLabels.nextMonth"
          type="button"
          :disabled="disableNav.nextMonth"
          @click="incrementMonthBy(1)"
        >
          <slot name="nextMonthLabel">&#8594;</slot>
        </button>
        <button
          :class="['vtd-date__next-year', classes.nextYear]"
          :aria-label="buttonLabels.nextYear"
          type="button"
          :disabled="disableNav.nextYear"
          @click="incrementYearBy(1)"
        >
          <slot name="nextYearLabel">&#8608;</slot>
        </button>
      </div>
      <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -->
      <table
        :class="['vtd-date__calendar', classes.calendar]"
        role="grid"
        :aria-labelledby="`${id}-dialog-label`"
      >
        <thead :class="['vtd-date__thead', classes.thead]">
          <tr :class="['vtd-date__week', classes.week]">
            <th
              v-for="(val, key) in daysOfWeek"
              :key="key"
              :abbr="val"
              scope="col"
              :class="['vtd-date__th', classes.th]"
            >
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody :class="['vtd-date__tbody', classes.tbody]">
          <tr
            v-for="week in 6"
            :key="week"
            :class="['vtd-date__tr', classes.tr]"
          >
            <td
              v-for="day in daysByWeeks[week - 1]"
              :key="day.date.toString()"
              :class="[
                'vts-date__td',
                { 'vts-date__td--focused': day.isFocused },
                { 'vts-date__td--selected': day.isSelected },
                classes.td,
                { [classes.tdFocused]: classes.tdFocused && day.isFocused },
                { [classes.tdSelected]: classes.tdSelected && day.isSelected },
              ]"
            >
              <button
                :class="[
                  'vts-date__day',
                  { 'vts-date__day--focused': day.isFocused },
                  { 'vts-date__day--selected': day.isSelected },
                  classes.day,
                  { [classes.dayFocused]: classes.dayFocused && day.isFocused },
                  {
                    [classes.daySelected]:
                      classes.daySelected && day.isSelected,
                  },
                ]"
                :tabindex="day.isFocused ? '0' : '-1'"
                :aria-selected="day.isFocused"
                :value="day.date"
                :disabled="day.disabled"
                type="button"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- TODO: -->
      <!-- <div class="">
        <button class="" value="cancel" type="button" @click="show = false">
          Cancel
        </button>
        <button
          class=""
          value="ok"
          type="button"
          @click="selectedDate = focusedDate"
        >
          OK
        </button>
      </div>
      <div class="" aria-live="polite">
        Cursor keys can navigate dates
      </div> -->
    </div>
  </div>
</template>

<script>
import KEYCODES from '../../data/keycodes.js';
import { clickout } from '../../directives/index.js';
import { randomString, applyFocusTrap } from '../../utils.js';

/**
 * Compares the year, month, and day of two dates to confirm if they match.
 *
 * @param   {object}  first   Date object
 * @param   {object}  second  Date object
 * @returns {boolean}         True if dates match
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

// Based on https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
export default {
  name: 'VDate',
  directives: {
    clickout,
  },

  model: {
    prop: 'date',
    event: 'update',
  },

  props: {
    // TODO: include, exclude
    modelValue: {
      type: [Date, String],
      default: () => new Date(),
    },
    date: {
      type: [Date, String],
      default: () => new Date(),
    },

    min: {
      type: [Date, String],
      default: '',
    },

    max: {
      type: [Date, String],
      default: '',
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

    buttonLabels: {
      type: Object,
      default: () => {
        return Object.freeze({
          selectDate: 'Select Date',
          showCalendar: 'show calendar',
          previousMonth: 'previous month',
          nextMonth: 'next month',
          previousYear: 'previous year',
          nextYear: 'next year',
        });
      },
    },

    classes: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update', 'update:modelValue'],

  data() {
    return {
      show: false,
      previousActiveEl: null,
      focusedDate: new Date(this.modelValue || this.date),
      selectedDate: new Date(this.modelValue || this.date),
    };
  },

  computed: {
    monthYear() {
      const { monthLabels, focusedDate } = this;
      return `${
        monthLabels[focusedDate.getMonth()]
      } ${focusedDate.getFullYear()}`;
    },

    disableNav() {
      const { focusedDate, min, max } = this;
      const disableNav = {};
      const minDate = new Date(min);
      const maxDate = new Date(max);

      if (min) {
        disableNav.prevYear = focusedDate.getYear() <= minDate.getYear();
        disableNav.prevMonth = focusedDate.getMonth() <= minDate.getMonth();
      }
      if (max) {
        disableNav.nextYear = focusedDate.getYear() >= maxDate.getYear();
        disableNav.nextMonth = focusedDate.getMonth() >= maxDate.getMonth();
      }
      return disableNav;
    },

    daysByWeeks() {
      const { focusedDate, selectedDate, min, max } = this;
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
          let disabled = false;
          if (min) {
            disabled = date < new Date(min);
          }
          if (max && !disabled) {
            disabled = date > new Date(max);
          }

          weeks[i].push({
            date,
            isFocused: sameDays(date, focusedDate),
            isSelected: sameDays(date, selectedDate),
            disabled,
          });
          d.setDate(d.getDate() + 1);
        }
      }

      return weeks;
    },

    toggle() {
      const { show } = this;
      return {
        bind: {
          'aria-label': this.buttonLabels.selectDate,
          'aria-expanded': '' + show,
        },
        on: {
          click: () => {
            this.show = !show;
          },
        },
      };
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
      this.$emit('update:modelValue', date);
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

      const { focusedDate, min, max } = this;
      const d = new Date(focusedDate);

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

      const minDate = min && new Date(min);
      const maxDate = max && new Date(max);

      if ((minDate && d < minDate) || (maxDate && d > maxDate)) return;

      this.focusedDate = d;

      this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      });
    },

    onTab(event) {
      applyFocusTrap(this.$refs.calendar, event);
    },

    onClickout(event) {
      const { show } = this;
      event.preventDefault();
      if (show) {
        this.show = false;
      }
    },
  },
};
</script>

<style>
.vtd-date {
  position: relative;
}

.vts-date__navigation {
  display: flex;
  justify-content: space-around;
}
</style>
