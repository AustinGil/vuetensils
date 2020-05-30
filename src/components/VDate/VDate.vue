<template>
  <div id="myDatepicker" class="datepicker" @keydown="onKeydown">
    <div class="date">
      <label for="id-textbox-1">
        Date
        <input
          id="id-textbox-1"
          type="text"
          placeholder="mm/dd/yyyy"
          aria-autocomplete="none"
        />
      </label>
      <button aria-label="Choose Date">
        calendar btn
      </button>
    </div>
    <div
      id="id-datepicker-1"
      class="datepickerDialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="id-dialog-label"
    >
      <div class="header">
        <button ref="prevYear" class="prevYear" aria-label="previous year">
          <slot name="prevYear">
            &#8606;
          </slot>
        </button>
        <button class="prevMonth" aria-label="previous month">
          <slot name="prevMonth">
            &#8592;
          </slot>
        </button>
        <h4 id="id-dialog-label" class="monthYear" aria-live="polite">
          {{ monthYear }}
        </h4>
        <button class="nextMonth" aria-label="next month">
          <slot name="nextMonth">
            &#8594;
          </slot>
        </button>
        <button class="nextYear" aria-label="next year">
          <slot name="nextYear">
            &#8608;
          </slot>
        </button>
      </div>
      <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -->
      <table
        id="myDatepickerGrid"
        class="dates"
        role="grid"
        aria-labelledby="id-dialog-label"
      >
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
              v-for="day in weeksDays[week - 1]"
              :key="day.date.toString()"
              :class="[
                'vts-date__cell',
                { 'vts-date__cell--active': day.isFocused },
              ]"
            >
              <button
                :class="[
                  'vts-date__day',
                  { 'vts-date__day--active': day.isFocused },
                ]"
                :tabindex="day.isFocused ? '0' : '-1'"
                :aria-selected="day.isFocused"
                :disabled="!day.isFocused"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="">
        <button class="" value="cancel" @click="onCancel">
          Cancel
        </button>
        <button class="" value="ok" @click="onOk">
          OK
        </button>
      </div>
      <div class="" aria-live="polite">
        Test
      </div>
    </div>
  </div>
</template>

<script>
import keycodes from '../../data/keycodes.js';

/**
 * @param {object} first
 * @param {object} second
 * @return {boolean}
 */
function sameDays(first, second) {
  // console.log(
  //   first.getMonth() === second.getMonth(),
  //   first.getDate() === second.getDate()
  // )
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export default {
  // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
  props: {
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
    dayLabels: {
      type: Array,
      default: () => [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
  },

  data: () => ({
    // dayList: [],
    daysOfWeek: Object.freeze({
      Su: 'Sunday',
      Mo: 'Monday',
      Tu: 'Tuesday',
      We: 'Wednesday',
      Th: 'Thursday',
      Fr: 'Friday',
      Sa: 'Saturday',
    }),
    focusedDate: new Date(),
    selectedDate: new Date(0, 0, 1),
    hideLastRow: false,
  }),

  computed: {
    monthYear() {
      const { monthLabels, focusedDate } = this;
      return `${
        monthLabels[focusedDate.getMonth()]
      } ${focusedDate.getFullYear()}`;
    },
    weeksDays() {
      const { focusedDate } = this;
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
            isSelected: false,
          });
          d.setDate(d.getDate() + 1);
        }
      }

      return weeks;
    },
  },

  methods: {
    hide() {
      console.log('hide');
    },

    isFocusedIndex(i, j) {
      const { days, focusedDate } = this;
      const weekIndex = i - 1;
      const dayIndex = j - 1;
      const testDate = days[weekIndex * 7 + dayIndex];

      return sameDays(focusedDate, testDate);
    },

    onKeydown(event) {
      const { focusedDate } = this;
      let flag = false;
      let d;

      if (event.target.classList.contains('vts-date__day')) {
        d = new Date(focusedDate);

        switch (event.keyCode) {
          case keycodes.ENTER:
          case keycodes.SPACE:
            // this.datepicker.setTextboxDate(this.day)
            // this.datepicker.hide()
            flag = true;
            break;

          case keycodes.RIGHT:
            d.setDate(d.getDate() + 1);

            flag = true;
            break;

          case keycodes.LEFT:
            d.setDate(d.getDate() - 1);

            flag = true;
            break;

          case keycodes.DOWN:
            d.setDate(d.getDate() + 7);

            flag = true;
            break;

          case keycodes.UP:
            d.setDate(d.getDate() - 7);
            flag = true;
            break;
        }

        this.focusedDate = d;
      }

      switch (event.keyCode) {
        case keycodes.ESC:
          this.hide();
          break;

        case keycodes.TAB:
          // TODO: focus trap
          // this.datepicker.cancelButtonNode.focus()
          if (event.shiftKey) {
            // this.datepicker.nextYearNode.focus()
          }
          // this.datepicker.setMessage("")
          // flag = true
          break;

        case keycodes.PAGEUP:
          if (event.shiftKey) {
            // this.datepicker.moveToPreviousYear();
          } else {
            // this.datepicker.moveToPreviousMonth()
          }
          flag = true;
          break;

        case keycodes.PAGEDOWN:
          if (event.shiftKey) {
            // this.datepicker.moveToNextYear()
          } else {
            // this.datepicker.moveToNextMonth()
          }
          flag = true;
          break;

        case keycodes.HOME:
          // this.datepicker.moveFocusToFirstDayOfWeek()
          flag = true;
          break;

        case keycodes.END:
          // this.datepicker.moveFocusToLastDayOfWeek()
          flag = true;
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    },

    onCancel() {
      console.log('cancel');
    },

    onOk() {
      console.log('ok', this.selectedDate);
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

.datepicker .header button {
  border-style: none;
  background: transparent;
}

.vts-date__day {
  height: 100%;
  width: 100%;
}
</style>
