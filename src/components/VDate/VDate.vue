<template>
  <div id="myDatepicker" class="datepicker">
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
      <button class="icon" aria-label="Choose Date">
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
        <button class="prevYear" aria-label="previous year">
          <span class="fas fa-angle-double-left fa-lg" />
        </button>
        <button class="prevMonth" aria-label="previous month">
          <span class="fas fa-angle-left fa-lg" />
        </button>
        <h2 id="id-dialog-label" class="monthYear" aria-live="polite">
          Month Year
        </h2>
        <button class="nextMonth" aria-label="next month">
          <span class="fas fa-angle-right fa-lg" />
        </button>
        <button class="nextYear" aria-label="next year">
          <span class="fas fa-angle-double-right fa-lg" />
        </button>
      </div>
      <table
        id="myDatepickerGrid"
        class="dates"
        role="grid"
        aria-labelledby="id-dialog-label"
      >
        <thead>
          <tr>
            <th scope="col" abbr="Sunday">
              Su
            </th>
            <th scope="col" abbr="Monday">
              Mo
            </th>
            <th scope="col" abbr="Tuesday">
              Tu
            </th>
            <th scope="col" abbr="Wednesday">
              We
            </th>
            <th scope="col" abbr="Thursday">
              Th
            </th>
            <th scope="col" abbr="Friday">
              Fr
            </th>
            <th scope="col" abbr="Saturday">
              Sa
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                25
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                26
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                27
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                28
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                29
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                30
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                1
              </button>
            </td>
          </tr>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                2
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                3
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                4
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                5
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                6
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                7
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                8
              </button>
            </td>
          </tr>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                9
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                10
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                11
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                12
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                13
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="0">
                14
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                15
              </button>
            </td>
          </tr>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                16
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                17
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                18
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                19
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                20
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                21
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                22
              </button>
            </td>
          </tr>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                23
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                24
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                25
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                26
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                27
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                28
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                29
              </button>
            </td>
          </tr>
          <tr>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                30
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1">
                31
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                1
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                2
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                3
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                4
              </button>
            </td>
            <td class="dateCell">
              <button class="dateButton" tabindex="-1" disabled="">
                5
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="dialogButtonGroup">
        <button class="dialogButton" value="cancel">
          Cancel
        </button>
        <button class="dialogButton" value="ok">
          OK
        </button>
      </div>
      <div class="message" aria-live="polite">
        Test
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
}
</script>

<style>
.datepicker {
  margin-top: 1em;
  position: relative;
}

.datepicker button.icon {
  padding: 4px;
  margin: 0;
  border: transparent 2px solid;
  border-radius: 5px;
  text-align: left;
  background-color: white;
  position: relative;
  left: -4px;
  top: 3px;
}

.datepicker button.icon:focus {
  outline: none;
  border-color: hsl(216, 80%, 55%);
}

.datepicker span.arrow {
  margin: 0;
  padding: 0;
  display: none;
  background: transparent;
}

.datepicker input {
  margin: 0;
  width: 20%;
}

.datepicker .datepickerDialog {
  position: absolute;
  width: 45%;
  clear: both;
  display: none;
  border: 3px solid hsl(216, 80%, 55%);
  margin-top: 1em;
  border-radius: 5px;
  padding: 0;
  background-color: #fff;
}

.datepicker .header {
  cursor: default;
  background-color: hsl(216, 80%, 55%);
  padding: 7px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  display: flex;
  justify-content: space-around;
}

.datepicker .header h2 {
  margin: 0;
  padding: 0;
  display: inline-block;
  font-size: 1em;
  color: white;
  text-transform: none;
  font-weight: bold;
}

.datepicker .header button {
  border-style: none;
  background: transparent;
}

.datepicker .datepickerDialog button::-moz-focus-inner {
  border: 0;
}

.datepicker .prevYear,
.datepicker .prevMonth,
.datepicker .nextMonth,
.datepicker .nextYear {
  padding: 4px;
  width: 24px;
  height: 24px;
  color: white;
}

.datepicker .prevYear:focus,
.datepicker .prevMonth:focus,
.datepicker .nextMonth:focus,
.datepicker .nextYear:focus {
  padding: 2px;
  border: 2px solid white;
  border-radius: 4px;
  outline: 0;
}

.datepicker .dialogButtonGroup {
  text-align: right;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
}

.datepicker .dialogButton {
  padding: 5px;
  margin-left: 1em;
  width: 5em;
  background-color: hsl(216, 80%, 92%);
  font-size: 0.85em;
  color: black;
  outline: none;
  border: 1px solid hsl(216, 80%, 92%);
  border-radius: 5px;
}

.datepicker .dialogButton:focus {
  padding: 4px;
  border: 2px solid black;
}

.datepicker .fa-calendar-alt {
  color: hsl(216, 89%, 72%);
}

.datepicker .monthYear {
  display: inline-block;
  width: 12em;
  text-align: center;
}

.datepicker table.dates {
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
}

.datepicker table.dates th,
.datepicker table.dates td {
  text-align: center;
}

.datepicker .dateRow {
  border: 1px solid black;
}

.datepicker .dateCell {
  outline: 0;
  border: 0;
  padding: 0;
  margin: 0;
  height: 40px;
  width: 40px;
}

.datepicker .dateButton {
  padding: 0;
  margin: 0;
  line-height: inherit;
  height: 100%;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 15px;
  background: #eee;
}

.datepicker .dateButton:focus,
.datepicker .dateButton:hover {
  padding: 0;
  background-color: hsl(216, 80%, 92%);
}

.datepicker .dateButton:focus {
  border-width: 2px;
  border-color: rgb(100, 100, 100);
  outline: 0;
}

.datepicker .dateButton[aria-selected] {
  border-color: rgb(100, 100, 100);
}

.datepicker .dateButton[tabindex="0"] {
  background-color: hsl(216, 80%, 92%);
}

.datepicker .disabled {
  color: #afafaf;
}

.datepicker .disabled:hover {
  color: black;
}

.datepicker .dateButton:disabled {
  color: #777;
  background-color: #fff;
  border: none;
  cursor: not-allowed;
}

.datepicker .message {
  padding-top: 0.25em;
  padding-left: 1em;
  height: 1.75em;
  background: hsl(216, 80%, 55%);
  color: white;
}
</style>
