var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { openBlock, createBlock, Transition, withCtx, resolveDynamicComponent, normalizeClass, renderSlot, createElementBlock, createCommentVNode, createTextVNode, withModifiers, Fragment, renderList, createElementVNode, mergeProps, toHandlers, resolveDirective, withDirectives, normalizeProps, guardReactiveProps, withKeys, toDisplayString, vShow, createVNode, normalizeStyle, toHandlerKey, vModelText, vModelDynamic, reactive, watch, nextTick, computed } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$j = {
  name: "VAlert",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    modelValue: {
      type: [Boolean, Number],
      default: true
    },
    dismissible: Boolean,
    dismissLabel: {
      type: [String, Boolean],
      default: "Dismiss this alert"
    },
    transition: {
      type: String,
      default: void 0
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    dismissed: false,
    timerId: null
  }),
  watch: {
    modelValue: {
      handler(visible) {
        if (visible) {
          this.dismissed = false;
        }
        if (typeof visible === "number") {
          this.clearTimer();
          this.countdown();
        }
      },
      immediate: true
    }
  },
  beforeUnmount() {
    this.clearTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    dismiss() {
      this.$emit("dismiss");
      this.dismissed = true;
      if (typeof this.modelValue === "number") {
        this.$emit("update:modelValue", 0);
        this.$emit("update", 0);
        this.clearTimer();
      } else {
        this.$emit("update:modelValue", false);
        this.$emit("update", false);
      }
    },
    countdown() {
      const { modelValue } = this;
      if (modelValue <= 0)
        return;
      this.timerId = setTimeout(() => {
        this.$emit("update:modelValue", modelValue - 1);
        this.$emit("update", modelValue - 1);
      }, 1e3);
    },
    clearTimer() {
      const { timerId } = this;
      if (timerId) {
        clearInterval(timerId);
        this.timerId = null;
      }
    }
  }
};
const _hoisted_1$e = ["aria-label"];
const _hoisted_2$a = /* @__PURE__ */ createTextVNode(" \xD7 ");
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: $props.transition }, {
    default: withCtx(() => [
      !_ctx.dismissed && !!$props.modelValue ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        key: 0,
        role: "alert",
        class: normalizeClass(["vts-alert", $props.classes.root])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          $props.dismissible ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": $props.dismissLabel,
            class: normalizeClass(["vts-alert__dismiss", $props.classes.dismiss]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.dismiss && $options.dismiss(...args))
          }, [
            renderSlot(_ctx.$slots, "dismiss", {}, () => [
              _hoisted_2$a
            ])
          ], 10, _hoisted_1$e)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["name"]);
}
var VAlert = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$g]]);
const _sfc_main$i = {
  name: "VAsync",
  props: {
    await: {
      type: [Promise, Function],
      default: () => Promise.resolve()
    },
    default: {
      type: void 0,
      default: void 0
    }
  },
  data() {
    return {
      pending: false,
      results: this.default,
      error: null,
      done: false
    };
  },
  watch: {
    await: {
      handler: "awaitOn",
      immediate: true
    },
    pending: {
      handler(pending) {
        this.$emit("pending", pending);
      },
      immediate: true
    }
  },
  methods: {
    awaitOn(promise) {
      if (!promise)
        return;
      promise = typeof promise === "function" ? promise() : promise;
      if (!promise.then)
        return;
      this.pending = true;
      this.results = this.default;
      this.error = null;
      return promise.then((results) => {
        this.results = typeof results === "undefined" ? this.default : results;
        this.$emit("resolve", results);
      }).catch((error) => {
        if (error instanceof Error) {
          error = {
            name: error.name,
            message: error.message
          };
        }
        this.error = error;
        this.$emit("reject", error);
      }).finally(() => {
        this.pending = false;
        this.done = true;
        this.$emit("finally");
      });
    }
  },
  render() {
    const { pending, error, results, done } = this;
    let slots = this.$slots;
    const pendingSlot = slots.pending;
    const rejectedSlot = slots.rejected;
    const resolvedSlot = slots.resolved;
    const defaultSlot = slots.default;
    if (pending && pendingSlot) {
      return pendingSlot();
    }
    if (done && error && rejectedSlot) {
      return rejectedSlot(error);
    }
    if (done && !error && resolvedSlot) {
      return resolvedSlot(results);
    }
    if (!defaultSlot)
      return;
    return defaultSlot({
      pending,
      resolved: results,
      rejected: error,
      results,
      error
    });
  }
};
var VBtn_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = {
  name: "VBtn",
  inheritAttrs: false,
  props: {
    action: { type: String, default: "" },
    data: { type: Object, default: () => ({}) }
  },
  computed: {
    tag() {
      const attrs = this.$attrs || {};
      if (attrs.to) {
        return "RouterLink";
      }
      if (attrs.href) {
        return "a";
      }
      return "button";
    },
    type() {
      if (this.tag !== "button")
        return;
      return this.$attrs.type || "button";
    },
    listeners() {
      {
        return this.$attrs;
      }
    }
  },
  methods: {
    async onSubmit({ target: form }) {
      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: data
        });
        this.$emit("response", response);
      } catch (error) {
        this.$emit("error", error);
      }
    }
  }
};
const _hoisted_1$d = ["action"];
const _hoisted_2$9 = ["value", "name"];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.action && $props.data ? (openBlock(), createElementBlock("form", {
    key: 0,
    action: $props.action,
    method: "POST",
    class: "vts-btn__form",
    onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => $options.onSubmit && $options.onSubmit(...args), ["prevent"]))
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.data, (key, value) => {
      return openBlock(), createElementBlock("input", {
        key,
        value,
        name: key,
        type: "hidden",
        hidden: "",
        autocomplete: "off",
        "aria-hidden": "true",
        tabindex: "-1"
      }, null, 8, _hoisted_2$9);
    }), 128)),
    createElementVNode("button", mergeProps({ type: "submit" }, _ctx.$attrs, { class: "vts-btn" }, toHandlers($options.listeners)), [
      renderSlot(_ctx.$slots, "default")
    ], 16)
  ], 40, _hoisted_1$d)) : (openBlock(), createBlock(resolveDynamicComponent($options.tag), mergeProps({
    key: 1,
    class: "vts-btn",
    type: $options.type
  }, _ctx.$attrs, toHandlers($options.listeners)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["type"]));
}
var VBtn = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$f]]);
var keycodes = Object.freeze({
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});
var autofocus = {
  inserted: (el) => el.focus()
};
var clickout = {
  bind(el, binding) {
    el._vtsClickout = {
      stop: (e) => e.stopPropagation()
    };
    document.body.addEventListener("click", binding.value);
    el.addEventListener("click", el._vtsClickout.stop);
  },
  unbind(el, binding) {
    document.body.removeEventListener("click", binding.value);
    el.removeEventListener("click", el._vtsClickout.stop);
  }
};
function copyToClipboard(content) {
  const activeEl = document.activeElement;
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.fontSize = "12pt";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  activeEl && activeEl.focus();
}
var copy = {
  bind(el, binding) {
    el._vtsCopy = () => copyToClipboard(binding.value);
    el.addEventListener("click", el._vtsCopy);
  },
  update(el, binding) {
    el.removeEventListener("click", el._vtsCopy);
    el._vtsCopy = () => copyToClipboard(binding.value);
    el.addEventListener("click", el._vtsCopy);
  },
  unbind(el) {
    el.removeEventListener("click", el._vtsCopy);
  }
};
function unbind(el) {
  if (!el._vtsIntersect)
    return;
  el._vtsIntersect.unobserve(el);
  delete el._vtsIntersect;
}
var intersect = {
  inserted: (el, { value, modifiers }) => {
    const options = __spreadValues({}, value);
    const { enter, exit, once } = modifiers;
    if (options.root) {
      options.root = typeof options.root === "string" ? document.querySelector(options.root) : options.root;
    }
    const listeners = __spreadValues({}, value);
    if (value instanceof Function) {
      if (enter)
        listeners.onEnter = value;
      if (exit)
        listeners.onExit = value;
      if (!enter && !exit)
        listeners.onChange = value;
    }
    const observer = new IntersectionObserver(([entry]) => {
      const isThresholdArray = Array.isArray(options.threshold);
      const clone = {};
      for (const key in entry) {
        clone[key] = entry[key];
      }
      clone.isIntersecting = isThresholdArray ? options.threshold.includes(entry.intersectionRatio) : entry.intersectionRatio === options.threshold;
      if (clone.isIntersecting) {
        listeners.onEnter && listeners.onEnter(clone, el);
      } else {
        listeners.onExit && listeners.onExit(clone, el);
      }
      listeners.onChange && listeners.onChange(clone, el);
      if (once) {
        unbind(el);
      }
    }, options);
    observer.observe(el);
    el._vtsIntersect = observer;
  },
  unbind
};
var allDirectives = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autofocus,
  clickout,
  copy,
  intersect
}, Symbol.toStringTag, { value: "Module" }));
var FOCUSABLE = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden]):not([tabindex^="-"])',
  'select:not([disabled]):not([aria-hidden]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([aria-hidden]):not([tabindex^="-"])',
  'button:not([disabled]):not([aria-hidden]):not([tabindex^="-"]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'object:not([tabindex^="-"])',
  'embed:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])'
];
function randomString(length, allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result;
}
function isType(v, type) {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase() === type.toLowerCase();
}
function applyFocusTrap(el, event) {
  const focusable = Array.from(el.querySelectorAll(FOCUSABLE));
  if (!focusable.length) {
    event.preventDefault();
    return;
  }
  if (!el.contains(document.activeElement)) {
    event.preventDefault();
    focusable[0].focus();
  } else {
    const focusedItemIndex = focusable.indexOf(document.activeElement);
    if (event.shiftKey && focusedItemIndex === 0) {
      focusable[focusable.length - 1].focus();
      event.preventDefault();
    }
    if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
      focusable[0].focus();
      event.preventDefault();
    }
  }
}
var VDate_vue_vue_type_style_index_0_lang = "";
function sameDays(first, second) {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
}
const keysUsed = [
  keycodes.UP,
  keycodes.DOWN,
  keycodes.LEFT,
  keycodes.RIGHT,
  keycodes.PAGEUP,
  keycodes.PAGEDOWN,
  keycodes.HOME,
  keycodes.END
];
const _sfc_main$g = {
  name: "VDate",
  directives: {
    clickout
  },
  model: {
    prop: "date",
    event: "update"
  },
  props: {
    date: {
      type: [Date, String],
      default: () => new Date()
    },
    min: {
      type: [Date, String],
      default: ""
    },
    max: {
      type: [Date, String],
      default: ""
    },
    id: {
      type: String,
      default: () => `vts-${randomString(4)}`
    },
    daysOfWeek: {
      type: Object,
      default: () => {
        return Object.freeze({
          Su: "Sunday",
          Mo: "Monday",
          Tu: "Tuesday",
          We: "Wednesday",
          Th: "Thursday",
          Fr: "Friday",
          Sa: "Saturday"
        });
      }
    },
    monthLabels: {
      type: Array,
      default: () => [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    },
    buttonLabels: {
      type: Object,
      default: () => {
        return Object.freeze({
          selectDate: "Select Date",
          showCalendar: "show calendar",
          previousMonth: "previous month",
          nextMonth: "next month",
          previousYear: "previous year",
          nextYear: "next year"
        });
      }
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false,
      previousActiveEl: null,
      focusedDate: new Date(this.date),
      selectedDate: new Date(this.date)
    };
  },
  computed: {
    monthYear() {
      const { monthLabels, focusedDate } = this;
      return `${monthLabels[focusedDate.getMonth()]} ${focusedDate.getFullYear()}`;
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
      const firstDayOfMonth = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);
      const daysInMonth = new Date(focusedDate.getFullYear(), focusedDate.getMonth() + 1, 0).getDate();
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
            disabled
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
          "aria-label": this.buttonLabels.selectDate,
          "aria-expanded": "" + show
        },
        on: {
          click: () => {
            this.show = !show;
          }
        }
      };
    }
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
      this.$emit("update", date);
      this.show = false;
    }
  },
  methods: {
    incrementMonthBy(inc) {
      const { focusedDate } = this;
      const last = new Date(focusedDate);
      last.setMonth(last.getMonth() + inc + 1);
      last.setDate(0);
      const fd = new Date(focusedDate);
      fd.setDate(Math.min(fd.getDate(), last.getDate()));
      fd.setMonth(fd.getMonth() + inc);
      this.focusedDate = fd;
    },
    incrementYearBy(inc) {
      const d = new Date(this.focusedDate);
      d.setFullYear(d.getFullYear() + inc);
      this.focusedDate = d;
    },
    onClick({ target }) {
      if (!target.classList.contains("vts-date__day"))
        return;
      this.selectedDate = new Date(target.value);
    },
    onKeydown(event) {
      if (!event.target.classList.contains("vts-date__day"))
        return;
      if (!keysUsed.includes(event.keyCode))
        return;
      event.stopPropagation();
      event.preventDefault();
      const { focusedDate, min, max } = this;
      const d = new Date(focusedDate);
      switch (event.keyCode) {
        case keycodes.ENTER:
        case keycodes.SPACE:
          this.selectedDate = d;
          return;
        case keycodes.RIGHT:
          d.setDate(d.getDate() + 1);
          break;
        case keycodes.LEFT:
          d.setDate(d.getDate() - 1);
          break;
        case keycodes.DOWN:
          d.setDate(d.getDate() + 7);
          break;
        case keycodes.UP:
          d.setDate(d.getDate() - 7);
          break;
        case keycodes.PAGEUP:
          if (event.shiftKey) {
            d.setFullYear(focusedDate.getFullYear() - 1);
          } else {
            d.setMonth(focusedDate.getMonth() - 1);
          }
          break;
        case keycodes.PAGEDOWN:
          if (event.shiftKey) {
            d.setFullYear(focusedDate.getFullYear() + 1);
          } else {
            d.setMonth(focusedDate.getMonth() + 1);
          }
          break;
        case keycodes.HOME:
          d.setDate(d.getDate() - d.getDay());
          break;
        case keycodes.END:
          d.setDate(d.getDate() + (6 - d.getDay()));
          break;
      }
      const minDate = min && new Date(min);
      const maxDate = max && new Date(max);
      if (minDate && d < minDate || maxDate && d > maxDate)
        return;
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
    }
  }
};
const _hoisted_1$c = ["id"];
const _hoisted_2$8 = ["aria-label"];
const _hoisted_3$4 = ["aria-labelledby"];
const _hoisted_4$3 = { class: "vts-date__navigation" };
const _hoisted_5$1 = ["aria-label", "disabled"];
const _hoisted_6$1 = /* @__PURE__ */ createTextVNode("\u219E");
const _hoisted_7$1 = ["aria-label", "disabled"];
const _hoisted_8$1 = /* @__PURE__ */ createTextVNode("\u2190");
const _hoisted_9$1 = ["id"];
const _hoisted_10 = ["aria-label", "disabled"];
const _hoisted_11 = /* @__PURE__ */ createTextVNode("\u2192");
const _hoisted_12 = ["aria-label", "disabled"];
const _hoisted_13 = /* @__PURE__ */ createTextVNode("\u21A0");
const _hoisted_14 = ["aria-labelledby"];
const _hoisted_15 = ["abbr"];
const _hoisted_16 = ["tabindex", "aria-selected", "value", "disabled"];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickout = resolveDirective("clickout");
  return withDirectives((openBlock(), createElementBlock("div", {
    id: $props.id,
    class: normalizeClass(["vtd-date", $props.classes.root])
  }, [
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps($options.toggle)), () => [
      createElementVNode("button", mergeProps($options.toggle.bind, {
        type: "button",
        class: ["vtd-date__toggle", $props.classes.toggle]
      }, toHandlers($options.toggle.on)), [
        createElementVNode("span", {
          role: "img",
          "aria-label": $props.buttonLabels.showCalendar
        }, " \u{1F4C5} ", 8, _hoisted_2$8)
      ], 16)
    ]),
    withDirectives(createElementVNode("div", {
      ref: "calendar",
      class: normalizeClass(["", ["vtd-date__wrapper", $props.classes.wrapper]]),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": `${$props.id}-dialog-label`,
      onClick: _cache[4] || (_cache[4] = (...args) => $options.onClick && $options.onClick(...args)),
      onKeydown: [
        _cache[5] || (_cache[5] = (...args) => $options.onKeydown && $options.onKeydown(...args)),
        _cache[6] || (_cache[6] = withKeys((...args) => $options.onTab && $options.onTab(...args), ["tab"])),
        _cache[7] || (_cache[7] = withKeys(($event) => $data.show = false, ["esc"]))
      ]
    }, [
      createElementVNode("div", _hoisted_4$3, [
        createElementVNode("button", {
          class: normalizeClass(["vtd-date__prev-year", $props.classes.prevYear]),
          "aria-label": $props.buttonLabels.previousYear,
          type: "button",
          disabled: $options.disableNav.prevYear,
          onClick: _cache[0] || (_cache[0] = ($event) => $options.incrementYearBy(-1))
        }, [
          renderSlot(_ctx.$slots, "prevYearLabel", {}, () => [
            _hoisted_6$1
          ])
        ], 10, _hoisted_5$1),
        createElementVNode("button", {
          class: normalizeClass(["vtd-date__prev-month", $props.classes.prevMonth]),
          "aria-label": $props.buttonLabels.previousMonth,
          type: "button",
          disabled: $options.disableNav.prevMonth,
          onClick: _cache[1] || (_cache[1] = ($event) => $options.incrementMonthBy(-1))
        }, [
          renderSlot(_ctx.$slots, "prevMonthLabel", {}, () => [
            _hoisted_8$1
          ])
        ], 10, _hoisted_7$1),
        createElementVNode("h4", {
          id: `${$props.id}-dialog-label`,
          class: normalizeClass(["vtd-date__title", $props.classes.title]),
          "aria-live": "polite"
        }, toDisplayString($options.monthYear), 11, _hoisted_9$1),
        createElementVNode("button", {
          class: normalizeClass(["vtd-date__next-month", $props.classes.nextMonth]),
          "aria-label": $props.buttonLabels.nextMonth,
          type: "button",
          disabled: $options.disableNav.nextMonth,
          onClick: _cache[2] || (_cache[2] = ($event) => $options.incrementMonthBy(1))
        }, [
          renderSlot(_ctx.$slots, "nextMonthLabel", {}, () => [
            _hoisted_11
          ])
        ], 10, _hoisted_10),
        createElementVNode("button", {
          class: normalizeClass(["vtd-date__next-year", $props.classes.nextYear]),
          "aria-label": $props.buttonLabels.nextYear,
          type: "button",
          disabled: $options.disableNav.nextYear,
          onClick: _cache[3] || (_cache[3] = ($event) => $options.incrementYearBy(1))
        }, [
          renderSlot(_ctx.$slots, "nextYearLabel", {}, () => [
            _hoisted_13
          ])
        ], 10, _hoisted_12)
      ]),
      createElementVNode("table", {
        class: normalizeClass(["vtd-date__calendar", $props.classes.calendar]),
        role: "grid",
        "aria-labelledby": `${$props.id}-dialog-label`
      }, [
        createElementVNode("thead", {
          class: normalizeClass(["vtd-date__thead", $props.classes.thead])
        }, [
          createElementVNode("tr", {
            class: normalizeClass(["vtd-date__week", $props.classes.week])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.daysOfWeek, (val, key) => {
              return openBlock(), createElementBlock("th", {
                key,
                abbr: val,
                scope: "col",
                class: normalizeClass(["vtd-date__th", $props.classes.th])
              }, toDisplayString(key), 11, _hoisted_15);
            }), 128))
          ], 2)
        ], 2),
        createElementVNode("tbody", {
          class: normalizeClass(["vtd-date__tbody", $props.classes.tbody])
        }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(6, (week) => {
            return createElementVNode("tr", {
              key: week,
              class: normalizeClass(["vtd-date__tr", $props.classes.tr])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.daysByWeeks[week - 1], (day) => {
                return openBlock(), createElementBlock("td", {
                  key: day.date.toString(),
                  class: normalizeClass([
                    "vts-date__td",
                    { "vts-date__td--focused": day.isFocused },
                    { "vts-date__td--selected": day.isSelected },
                    $props.classes.td,
                    { [$props.classes.tdFocused]: $props.classes.tdFocused && day.isFocused },
                    { [$props.classes.tdSelected]: $props.classes.tdSelected && day.isSelected }
                  ])
                }, [
                  createElementVNode("button", {
                    class: normalizeClass([
                      "vts-date__day",
                      { "vts-date__day--focused": day.isFocused },
                      { "vts-date__day--selected": day.isSelected },
                      $props.classes.day,
                      { [$props.classes.dayFocused]: $props.classes.dayFocused && day.isFocused },
                      {
                        [$props.classes.daySelected]: $props.classes.daySelected && day.isSelected
                      }
                    ]),
                    tabindex: day.isFocused ? "0" : "-1",
                    "aria-selected": day.isFocused,
                    value: day.date,
                    disabled: day.disabled,
                    type: "button"
                  }, toDisplayString(day.date.getDate()), 11, _hoisted_16)
                ], 2);
              }), 128))
            ], 2);
          }), 64))
        ], 2)
      ], 10, _hoisted_14)
    ], 42, _hoisted_3$4), [
      [vShow, $data.show]
    ])
  ], 10, _hoisted_1$c)), [
    [_directive_clickout, $options.onClickout]
  ]);
}
var VDate = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$e]]);
var VDialog_vue_vue_type_style_index_0_lang = "";
const _sfc_main$f = {
  name: "VDialog",
  inheritAttrs: false,
  model: {
    prop: "showing",
    event: "update:showing"
  },
  props: {
    showing: Boolean,
    tag: {
      type: String,
      default: "div"
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: ""
    },
    inlineSize: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: String,
      default: ""
    },
    maxInlineSize: {
      type: String,
      default: ""
    },
    noScroll: Boolean,
    transition: {
      type: String,
      default: ""
    },
    bgTransition: {
      type: String,
      default: ""
    },
    contentTransition: {
      type: String,
      default: ""
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "update:showing"],
  data() {
    return {
      localShow: this.showing,
      activeElement: null
    };
  },
  computed: {
    slots() {
      return this.$slots;
    }
  },
  watch: {
    showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler(next, prev) {
        if (typeof window === "undefined")
          return;
        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();
          const { activeElement } = this;
          if (activeElement && activeElement.focus) {
            this.$nextTick(() => {
              activeElement.focus();
            });
          }
        }
        this.$emit("update", next);
        this.$emit("update:showing", next);
      }
    }
  },
  destroyed() {
    this.onClose();
  },
  methods: {
    onOpen() {
      const { onClick, onKeydown, noScroll } = this;
      window.addEventListener("click", onClick);
      window.addEventListener("keydown", onKeydown);
      noScroll && document.body.style.setProperty("overflow", "hidden");
      this.$nextTick(() => this.$refs.content.focus());
      this.$emit("open");
    },
    onClose() {
      const { onClick, onKeydown, noScroll } = this;
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeydown);
      noScroll && document.body.style.removeProperty("overflow");
      this.$emit("close");
    },
    onClick(event) {
      if (event.target.classList.contains("vts-dialog") && this.dismissible) {
        this.localShow = false;
      }
    },
    onKeydown(event) {
      if (event.keyCode === keycodes.ESC && this.dismissible) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        const content = this.$refs.content;
        if (!content)
          return;
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE));
        if (!focusable.length) {
          event.preventDefault();
          return;
        }
        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          const focusedItemIndex = focusable.indexOf(document.activeElement);
          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }
          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    }
  }
};
const _hoisted_1$b = { key: 0 };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.localShow || $options.slots.toggle ? (openBlock(), createElementBlock("span", _hoisted_1$b, [
    $options.slots.toggle ? renderSlot(_ctx.$slots, "toggle", normalizeProps(mergeProps({ key: 0 }, {
      on: {
        click: () => $data.localShow = !$data.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": true,
        "aria-expanded": "" + $data.localShow
      }
    }))) : createCommentVNode("", true),
    createVNode(Transition, {
      name: $props.bgTransition || $props.transition,
      appear: true
    }, {
      default: withCtx(() => [
        $data.localShow ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["vts-dialog", $props.classes.root, $props.classes.bg, _ctx.$attrs.class])
        }, [
          createVNode(Transition, { name: $props.contentTransition }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
                ref: "content",
                class: normalizeClass(["vts-dialog__content", $props.classes.content]),
                style: normalizeStyle({
                  width: $props.width,
                  "inline-size": $props.inlineSize,
                  "max-width": $props.maxWidth,
                  "max-inline-size": $props.maxInlineSize
                }),
                tabindex: "-1",
                role: "dialog",
                "aria-modal": "true"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["class", "style"]))
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : createCommentVNode("", true);
}
var VDialog = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$d]]);
var VDrawer_vue_vue_type_style_index_0_lang = "";
const NAME$1 = "vts-drawer";
const _sfc_main$e = {
  name: "VDrawer",
  model: {
    prop: "showing",
    event: "update"
  },
  props: {
    showing: Boolean,
    tag: {
      type: String,
      default: "aside"
    },
    right: Boolean,
    width: {
      type: String,
      default: ""
    },
    inlineSize: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: String,
      default: ""
    },
    maxInlineSize: {
      type: String,
      default: ""
    },
    noScroll: Boolean,
    transition: {
      type: String,
      default: ""
    },
    bgTransition: {
      type: String,
      default: ""
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localShow: this.showing,
      activeElement: null
    };
  },
  computed: {
    slots() {
      return this.$slots;
    }
  },
  watch: {
    showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler(next, prev) {
        if (typeof window === "undefined")
          return;
        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();
          const { activeElement } = this;
          if (activeElement && activeElement.focus) {
            this.$nextTick(() => {
              activeElement.focus();
            });
          }
        }
        this.$emit("update", next);
      }
    }
  },
  destroyed() {
    this.onClose();
  },
  methods: {
    onOpen() {
      const { onClick, onKeydown, noScroll } = this;
      window.addEventListener("click", onClick);
      window.addEventListener("keydown", onKeydown);
      noScroll && document.body.style.setProperty("overflow", "hidden");
      this.$nextTick(() => this.$refs.content.focus());
      this.$emit("open");
    },
    onClose() {
      const { onClick, onKeydown, noScroll } = this;
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeydown);
      noScroll && document.body.style.removeProperty("overflow");
      this.$emit("close");
    },
    onClick(event) {
      if (event.target.classList.contains(NAME$1)) {
        this.localShow = false;
      }
    },
    onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        const content = this.$refs.content;
        if (!content)
          return;
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE));
        if (!focusable.length) {
          event.preventDefault();
          return;
        }
        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          const focusedItemIndex = focusable.indexOf(document.activeElement);
          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }
          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    }
  }
};
const _hoisted_1$a = { key: 0 };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.localShow || $options.slots.toggle ? (openBlock(), createElementBlock("span", _hoisted_1$a, [
    $options.slots.toggle ? renderSlot(_ctx.$slots, "toggle", normalizeProps(mergeProps({ key: 0 }, {
      on: {
        click: () => $data.localShow = !$data.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": true,
        "aria-expanded": "" + $data.localShow
      }
    }))) : createCommentVNode("", true),
    createVNode(Transition, {
      name: $props.bgTransition || $props.transition,
      appear: ""
    }, {
      default: withCtx(() => [
        $data.localShow ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["vts-drawer", $props.classes.root, $props.classes.bg, _ctx.$attrs.class])
        }, [
          createVNode(Transition, {
            name: $props.transition,
            appear: ""
          }, {
            default: withCtx(() => [
              $data.localShow ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
                key: 0,
                ref: "content",
                class: normalizeClass([
                  "vts-drawer__content",
                  { "vts-drawer__content--right": !!$props.right },
                  $props.classes.content
                ]),
                style: normalizeStyle({
                  width: $props.width,
                  "inline-size": $props.inlineSize,
                  "max-width": $props.maxWidth,
                  "max-inline-size": $props.maxInlineSize
                }),
                tabindex: "-1"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["class", "style"])) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : createCommentVNode("", true);
}
var VDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$c]]);
var VDropdown_vue_vue_type_style_index_0_lang = "";
const _sfc_main$d = {
  name: "VDrawer",
  props: {
    text: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "bottom",
      validator(value) {
        return ["top", "bottom"].includes(value);
      }
    },
    transition: {
      type: String,
      default: ""
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isHovered: false,
    isFocused: false
  }),
  mounted() {
    document.addEventListener("click", this.onClickout);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickout);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickout);
  },
  methods: {
    onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false;
      }
    },
    onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false;
      }
    }
  }
};
const _hoisted_1$9 = ["aria-expanded"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vts-dropdown", $props.classes.root]),
    onMouseenter: _cache[1] || (_cache[1] = ($event) => _ctx.isHovered = true),
    onMouseleave: _cache[2] || (_cache[2] = ($event) => _ctx.isHovered = false),
    onFocus: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = true),
    onBlur: _cache[4] || (_cache[4] = ($event) => _ctx.isFocused = false),
    onFocusout: _cache[5] || (_cache[5] = (...args) => $options.onFocusout && $options.onFocusout(...args))
  }, [
    createElementVNode("button", {
      "aria-expanded": !!_ctx.isHovered || !!_ctx.isFocused,
      "aria-haspopup": "true",
      class: normalizeClass(["vts-dropdown__trigger", $props.classes.trigger]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isFocused = !_ctx.isFocused)
    }, [
      renderSlot(_ctx.$slots, "trigger", {}, () => [
        createTextVNode(toDisplayString($props.text), 1)
      ])
    ], 10, _hoisted_1$9),
    createVNode(Transition, { name: $props.transition }, {
      default: withCtx(() => [
        !!_ctx.isHovered || !!_ctx.isFocused ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["vts-dropdown__content", [`vts-dropdown__content--${$props.position}`, $props.classes.content]])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["name"])
  ], 34);
}
var VDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$b]]);
var VFile_vue_vue_type_style_index_0_lang = "";
const _sfc_main$c = {
  name: "VFile",
  model: {
    prop: "files",
    event: "update"
  },
  props: {
    label: {
      type: String,
      required: true
    },
    files: {
      type: Array,
      default: () => []
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    localFiles: [],
    droppable: false
  }),
  computed: {
    listeners() {
      {
        return this.$attrs;
      }
    }
  },
  watch: {
    files(files) {
      this.localFiles = files;
    },
    localFiles() {
      this.droppable = false;
    }
  },
  created() {
    this.id = this.$attrs.id || "vts-" + randomString(4);
  },
  methods: {
    onChange(event) {
      const files = Array.from(event.target.files);
      this.localFiles = files;
      this.$emit("update", files);
    },
    onDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      const isMulti = this.$attrs.multiple != null;
      if (!isMulti && files.length > 1) {
        files.length = 1;
      }
      this.localFiles = files;
      this.$emit("update", files);
    }
  }
};
const _hoisted_1$8 = ["for"];
const _hoisted_2$7 = ["id"];
const _hoisted_3$3 = {
  key: 0,
  "aria-hidden": "true"
};
const _hoisted_4$2 = {
  key: 1,
  "aria-hidden": "true"
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    for: _ctx.id,
    class: normalizeClass([
      "vts-file",
      {
        "vts-file--droppable": _ctx.droppable,
        "vts-file--selected": !!_ctx.localFiles.length
      },
      $props.classes.label
    ])
  }, [
    createElementVNode("input", mergeProps({
      id: _ctx.id,
      ref: "input"
    }, _ctx.$attrs, {
      type: "file",
      class: ["vts-visually-hidden", $props.classes.input],
      onChange: _cache[0] || (_cache[0] = (...args) => $options.onChange && $options.onChange(...args))
    }, toHandlers($options.listeners)), null, 16, _hoisted_2$7),
    createElementVNode("span", {
      class: normalizeClass(["vts-file__text", $props.classes.text])
    }, [
      renderSlot(_ctx.$slots, "label", {}, () => [
        createTextVNode(toDisplayString($props.label), 1)
      ])
    ], 2),
    createElementVNode("div", {
      class: normalizeClass(["vts-file__dropzone", $props.classes.dropzone]),
      onDragenter: _cache[5] || (_cache[5] = withModifiers(($event) => _ctx.droppable = true, ["prevent"]))
    }, [
      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ files: _ctx.localFiles, droppable: _ctx.droppable })), () => [
        _ctx.localFiles.length ? (openBlock(), createElementBlock("span", _hoisted_3$3, [
          _ctx.localFiles.length > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(_ctx.localFiles.length) + " files selected ", 1)
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_ctx.localFiles[0].name), 1)
          ], 64))
        ])) : (openBlock(), createElementBlock("span", _hoisted_4$2, " Choose files or drop here "))
      ]),
      _ctx.droppable ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["vts-file__overlay", $props.classes.overlay]),
        onDrop: _cache[1] || (_cache[1] = withModifiers((...args) => $options.onDrop && $options.onDrop(...args), ["prevent"])),
        onDragenter: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.droppable = true, ["stop"])),
        onDragleave: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.droppable = false, ["stop"])),
        onDragover: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        renderSlot(_ctx.$slots, "overlay")
      ], 34)) : createCommentVNode("", true)
    ], 34)
  ], 10, _hoisted_1$8);
}
var VFile = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$a]]);
var VForm_vue_vue_type_style_index_0_lang = "";
const controlTypes = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
const _sfc_main$b = {
  name: "VForm",
  props: {
    lazy: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    preventNavigation: {
      type: Boolean,
      default: false
    },
    honeypot: {
      type: [Boolean, String],
      default: false
    }
  },
  data: () => ({
    dirty: false,
    modified: false,
    localInputs: {}
  }),
  computed: {
    listeners() {
      {
        return this.$attrs;
      }
    },
    event() {
      return this.lazy ? "change" : "input";
    },
    valid() {
      return !Object.values(this.localInputs).find((input) => !input.valid);
    },
    error() {
      return !this.valid && this.dirty;
    },
    inputs() {
      const inputs = {};
      const { localInputs, errors } = this;
      for (const key in localInputs) {
        const input = __spreadProps(__spreadValues({}, localInputs[key]), {
          error: localInputs[key].dirty && !localInputs[key].valid,
          errors: []
        });
        const errorsMap = new Map(Object.entries(errors || {}));
        errorsMap.forEach((value, key2) => {
          if (!input.invalid[key2])
            return;
          const errorHandler = errorsMap.get(key2);
          const attrName = key2.replace("length", "Length");
          const errorMessage = typeof errorHandler === "string" ? errorHandler : errorHandler(input._inputEl[attrName]);
          input.errors.push(errorMessage);
        });
        inputs[key] = input;
      }
      return inputs;
    }
  },
  mounted() {
    this.validate();
    const observer = new MutationObserver(this.validate);
    observer.observe(this.$el, {
      childList: true,
      subtree: true
    });
    this.observer = observer;
    if (this.preventNavigation) {
      window.addEventListener("beforeunload", this.preventNav);
    }
    if (this.listeners.invalid) {
      this.$el.noValidate = true;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.modified)
      next();
    if (window.confirm("Leave without saving?"))
      next();
  },
  beforeDestroy() {
    this.observer.disconnect();
    window.removeEventListener("beforeunload", this.preventNav);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  methods: {
    checkModified({ target }) {
      if (!controlTypes.has(target.tagName))
        return;
      this.modified = true;
    },
    validate() {
      const els = this.$el.querySelectorAll("input, textarea, select");
      const localInputs = {};
      els.forEach((input) => {
        const { name, id, validity } = input;
        const key = name || id;
        if (!key)
          return;
        localInputs[key] = {
          _inputEl: input,
          valid: validity.valid,
          dirty: false,
          invalid: {
            type: validity.typeMismatch,
            required: validity.valueMissing,
            minlength: validity.tooShort,
            maxlength: validity.tooLong,
            min: validity.rangeOverflow,
            max: validity.rangeUnderflow,
            pattern: validity.patternMismatch
          }
        };
        switch (input.type) {
          case "checkbox":
            localInputs[key].value = input.checked;
            break;
          case "radio":
            if (input.checked) {
              localInputs[key].value = input.value;
            }
            break;
          default:
            localInputs[key].value = input.value;
        }
      });
      this.localInputs = localInputs;
    },
    onEvent() {
      this.validate();
    },
    onBlur({ target }) {
      if (!controlTypes.has(target.tagName))
        return;
      this.dirty = true;
      this.localInputs[target.name].dirty = true;
    },
    clear() {
      const els = Array.from(this.$el.querySelectorAll("input, textarea, select"));
      els.forEach((input) => {
        if (["radio", "checkbox"].includes(input.type)) {
          input.checked = false;
        } else {
          input.value = "";
        }
      });
    },
    reset() {
      this.modified = false;
      this.dirty = false;
      this.validate();
    },
    onSubmit(event) {
      if (!event.target.checkValidity()) {
        this.$emit("invalid", event);
        return;
      }
      this.reset();
      this.$emit("valid", event);
    },
    preventNav(event) {
      if (!this.modified)
        return;
      event.preventDefault();
      event.returnValue = "";
    }
  }
};
const _hoisted_1$7 = ["method"];
const _hoisted_2$6 = ["name"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", mergeProps({
    method: _ctx.$attrs.method || "POST",
    class: [
      "vts-form",
      {
        "vts-form--invalid": !$options.valid,
        "vts-form--dirty": _ctx.dirty,
        "vts-form--error": $options.error
      }
    ],
    [toHandlerKey($options.event)]: _cache[0] || (_cache[0] = (...args) => $options.onEvent && $options.onEvent(...args)),
    onKeydown: _cache[1] || (_cache[1] = (...args) => $options.checkModified && $options.checkModified(...args)),
    onChange: _cache[2] || (_cache[2] = (...args) => $options.checkModified && $options.checkModified(...args)),
    onSubmit: _cache[3] || (_cache[3] = (...args) => $options.onSubmit && $options.onSubmit(...args)),
    onBlurCapture: _cache[4] || (_cache[4] = (...args) => $options.onBlur && $options.onBlur(...args))
  }, toHandlers($options.listeners)), [
    $props.honeypot ? (openBlock(), createElementBlock("input", {
      key: 0,
      name: typeof $props.honeypot === "string" ? $props.honeypot : "vts-honeypot",
      class: "visually-hidden",
      tabindex: "-1",
      autocomplete: "off",
      "aria-hidden": "true"
    }, null, 8, _hoisted_2$6)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ valid: $options.valid, dirty: _ctx.dirty, modified: _ctx.modified, error: $options.error, inputs: $options.inputs, clear: $options.clear, validate: $options.validate })))
  ], 16, _hoisted_1$7);
}
var VForm = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$9]]);
var VImg_vue_vue_type_style_index_0_lang = "";
const NAME = "vts-img";
const _sfc_main$a = {
  name: "VImg",
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    srcset: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: ""
    },
    transitionDuration: {
      type: [Number, String],
      default: 300
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    dataUrl: ""
  }),
  computed: {
    listeners() {
      {
        return this.$attrs;
      }
    }
  },
  watch: {
    src: {
      handler: "init"
    },
    srcset: {
      handler: "init"
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    init() {
      this.dataUrl = this.getDataUrl();
      this.observer = new IntersectionObserver(this.handler);
      this.observer.observe(this.$el);
    },
    handler([entry]) {
      const { $el } = this;
      if (entry.isIntersecting) {
        $el.classList.add(`${NAME}--loading`);
        this.loadImg();
        this.observer.disconnect();
      }
    },
    getDataUrl() {
      if (typeof window === "undefined")
        return;
      const { width, height } = this.$attrs;
      if (!width || !height)
        return "";
      const w = 100;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = height / width * w;
      return canvas.toDataURL();
    },
    loadImg() {
      const { src, srcset } = this;
      const { img } = this.$refs;
      img.addEventListener("load", this.onLoad);
      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
    },
    onLoad() {
      const { $el } = this;
      const { img, placeholder: placeholder2 } = this.$refs;
      $el.classList.remove(`${NAME}--loading`);
      $el.classList.add(`${NAME}--loaded`);
      if (placeholder2) {
        img.addEventListener("transitionend", function onTransitionEnd() {
          placeholder2.remove();
          img.removeEventListener("transitionend", onTransitionEnd);
        });
      }
      img.removeEventListener("load", this.onLoad);
    }
  }
};
const _hoisted_1$6 = ["src", "decoding"];
const _hoisted_2$5 = ["src", "alt", "decoding"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("picture", {
    class: normalizeClass(["vts-img", $props.classes.root])
  }, [
    _ctx.dataUrl ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref: "placeholder",
      class: normalizeClass(["vts-img__placeholder", $props.classes.placeholder]),
      style: normalizeStyle({ background: $props.background })
    }, [
      createElementVNode("img", mergeProps({
        src: $props.placeholder || _ctx.dataUrl,
        alt: ""
      }, _ctx.$attrs, {
        decoding: _ctx.$attrs.decoding || "async"
      }), null, 16, _hoisted_1$6)
    ], 6)) : createCommentVNode("", true),
    createElementVNode("img", mergeProps({
      ref: "img",
      src: _ctx.dataUrl,
      class: ["vts-img__img", $props.classes.img],
      alt: _ctx.$attrs.alt || "",
      style: {
        transitionDuration: `${$props.transitionDuration}ms`
      },
      decoding: _ctx.$attrs.decoding || "async"
    }, _ctx.$attrs, toHandlers($options.listeners)), null, 16, _hoisted_2$5)
  ], 2);
}
var VImg = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$8]]);
const valuePropDef = {
  type: [String, Number, Boolean, Array],
  default: void 0
};
function updateLocalValue(value, previousValue) {
  if (value === previousValue)
    return;
  this.localValue = value;
}
const _sfc_main$9 = {
  name: "VInput",
  inheritAttrs: false,
  model: {
    event: "update:modelValue"
  },
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: valuePropDef,
    modelValue: valuePropDef,
    type: {
      type: String,
      default: "text"
    },
    options: {
      type: [Array, Object],
      default: () => []
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localValue: this.modelValue || this.value,
      valid: true,
      anyInvalid: false,
      dirty: false,
      invalid: {}
    };
  },
  computed: {
    bind() {
      const { id, name, valid, dirty, error, errorMessages, classes, $attrs } = this;
      const { class: _, attrs } = $attrs;
      const describedby = [];
      if (error)
        describedby.push(`${id}__description`);
      if (errorMessages.length)
        describedby.push(`${id}__errors`);
      const bindings = __spreadProps(__spreadValues({
        "aria-invalid": !valid,
        "aria-describedby": dirty && describedby.length ? describedby.join(" ") : false
      }, attrs), {
        id: `${id}__input`,
        name,
        class: ["vts-input__input", classes.input]
      });
      return bindings;
    },
    listeners() {
      {
        return this.$attrs;
      }
    },
    slots() {
      return this.$slots;
    },
    computedOptions() {
      const { $attrs, localValue, type } = this;
      let options = this.options;
      if (isType(options, "object")) {
        options = Object.entries(options).map(([key, value]) => ({
          value: key,
          label: value
        }));
      }
      return options.map((item) => {
        item = isType(item, "object") ? item : { value: item };
        Object.assign(item, $attrs, {
          label: item.label || item.value,
          value: item.value
        });
        if (localValue !== void 0) {
          if (type === "checkbox") {
            item.checked = localValue.includes(item.value) || item.checked;
          } else {
            item.checked = item.value === localValue || item.checked;
          }
        }
        return item;
      });
    },
    error() {
      return !this.valid && this.dirty;
    },
    errorMessages() {
      const { invalid, errors, $attrs } = this;
      const errorMessages = [];
      Object.keys(errors || {}).forEach((key) => {
        if (!invalid[key])
          return;
        const errorHandlerOrMessage = errors[key];
        const errorMessage = isType(errorHandlerOrMessage, "function") ? errorHandlerOrMessage($attrs[key]) : errorHandlerOrMessage;
        errorMessages.push(errorMessage);
      });
      return errorMessages;
    }
  },
  watch: {
    modelValue: updateLocalValue,
    value: updateLocalValue,
    localValue(value) {
      this.$emit("update:modelValue", value);
      this.validate();
    }
  },
  created() {
    this.id = this.$attrs.id || "vts-" + randomString(4);
  },
  mounted() {
    this.validate();
  },
  methods: {
    onFieldsetInput(event) {
      const input = event.target;
      const value = input.value;
      if (input.type === "radio") {
        this.localValue = value;
        return;
      }
      const newValue = [...this.localValue || []];
      const index2 = newValue.indexOf(value);
      if (index2 === -1) {
        newValue.push(value);
      } else {
        newValue.splice(index2, 1);
      }
      this.localValue = newValue;
    },
    validate() {
      let input = this.$refs.input;
      if (Array.isArray(input)) {
        if (!input.length)
          return;
        input = input[0];
      }
      const { validity } = input;
      this.anyInvalid = !validity.valid;
      this.valid = validity.valid;
      this.invalid = {
        type: validity.typeMismatch,
        required: validity.valueMissing,
        minlength: validity.tooShort,
        maxlength: validity.tooLong,
        min: validity.rangeUnderflow,
        max: validity.rangeOverflow,
        pattern: validity.patternMismatch
      };
    }
  }
};
const _hoisted_1$5 = ["id", "type"];
const _hoisted_2$4 = ["for"];
const _hoisted_3$2 = ["for"];
const _hoisted_4$1 = ["checked"];
const _hoisted_5 = ["for"];
const _hoisted_6 = ["value"];
const _hoisted_7 = ["type"];
const _hoisted_8 = ["id"];
const _hoisted_9 = ["id"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "vts-input",
      `vts-input--${$props.type}`,
      {
        "vts-input--required": _ctx.$attrs.hasOwnProperty("required"),
        "vts-input--invalid": !$data.valid,
        "vts-input--dirty": $data.dirty,
        "vts-input--error": $options.error
      },
      _ctx.$attrs.class,
      $props.classes.root
    ])
  }, [
    $props.type === "radio" || $props.type === "checkbox" && $options.computedOptions.length ? (openBlock(), createElementBlock("fieldset", {
      key: 0,
      class: normalizeClass(["vts-input__fieldset", $props.classes.fieldset])
    }, [
      $props.label ? (openBlock(), createElementBlock("legend", {
        key: 0,
        class: normalizeClass(["vts-input__legend", $props.classes.text])
      }, toDisplayString($props.label), 3)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["vts-input__fieldset-items", $props.classes.fieldsetItems])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedOptions, (option, index2) => {
          return openBlock(), createElementBlock("div", {
            key: option.value,
            class: normalizeClass(["vts-input__fieldset-item", $props.classes.fieldsetItem])
          }, [
            createElementVNode("input", mergeProps(__spreadValues(__spreadValues({}, $options.bind), option), {
              id: `${_ctx.id}__input-${index2}`,
              ref_for: true,
              ref: "input",
              type: $props.type,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onFieldsetInput && $options.onFieldsetInput(...args)),
              onBlurOnce: _cache[1] || (_cache[1] = ($event) => $data.dirty = true)
            }, toHandlers($options.listeners)), null, 16, _hoisted_1$5),
            createElementVNode("label", {
              for: `${_ctx.id}__input-${index2}`,
              class: normalizeClass(["vts-input__label", $props.classes.label])
            }, toDisplayString(option.label), 11, _hoisted_2$4)
          ], 2);
        }), 128))
      ], 2)
    ], 2)) : $props.type === "checkbox" ? (openBlock(), createElementBlock("label", {
      key: 1,
      for: `${_ctx.id}__input`,
      class: normalizeClass(["vts-input__label", $props.classes.label])
    }, [
      createElementVNode("input", mergeProps({
        ref: "input",
        checked: $data.localValue === void 0 ? _ctx.$attrs.checked : $data.localValue,
        type: "checkbox"
      }, $options.bind, {
        onChange: _cache[2] || (_cache[2] = ($event) => $data.localValue = $event.target.checked),
        onBlurOnce: _cache[3] || (_cache[3] = ($event) => $data.dirty = true)
      }, toHandlers($options.listeners)), null, 16, _hoisted_4$1),
      createElementVNode("span", {
        class: normalizeClass(["vts-input__text", $props.classes.text])
      }, toDisplayString($props.label), 3)
    ], 10, _hoisted_3$2)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
      createElementVNode("label", {
        for: `${_ctx.id}__input`,
        class: normalizeClass(["vts-input__label", $props.classes.label])
      }, toDisplayString($props.label), 11, _hoisted_5),
      $props.type === "select" ? (openBlock(), createElementBlock("select", mergeProps({
        key: 0,
        ref: "input",
        value: $data.localValue
      }, $options.bind, {
        onInput: _cache[4] || (_cache[4] = ($event) => $data.localValue = $event.target.value),
        onChange: _cache[5] || (_cache[5] = ($event) => $data.localValue = $event.target.value),
        onBlurOnce: _cache[6] || (_cache[6] = ($event) => $data.dirty = true)
      }, toHandlers($options.listeners)), [
        renderSlot(_ctx.$slots, "options", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedOptions, (option, i) => {
            return openBlock(), createElementBlock("option", mergeProps({ key: i }, option), toDisplayString(option.label), 17);
          }), 128))
        ])
      ], 16, _hoisted_6)) : $props.type === "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
        key: 1,
        ref: "input",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.localValue = $event)
      }, $options.bind, {
        onBlurOnce: _cache[8] || (_cache[8] = ($event) => $data.dirty = true)
      }, toHandlers($options.listeners)), null, 16)), [
        [vModelText, $data.localValue]
      ]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({
        key: 2,
        ref: "input",
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.localValue = $event),
        type: $props.type
      }, $options.bind, {
        onBlurOnce: _cache[10] || (_cache[10] = ($event) => $data.dirty = true)
      }, toHandlers($options.listeners)), null, 16, _hoisted_7)), [
        [vModelDynamic, $data.localValue]
      ])
    ], 64)),
    $options.slots.description ? (openBlock(), createElementBlock("div", {
      key: 3,
      id: `${_ctx.id}__description`,
      class: normalizeClass(["vts-input__description", $props.classes.description])
    }, [
      renderSlot(_ctx.$slots, "description", normalizeProps(guardReactiveProps({
        valid: $data.valid,
        dirty: $data.dirty,
        error: $options.error,
        invalid: $data.invalid,
        anyInvalid: $data.anyInvalid,
        errors: $options.errorMessages
      })))
    ], 10, _hoisted_8)) : createCommentVNode("", true),
    $data.dirty && $options.errorMessages.length ? (openBlock(), createElementBlock("div", {
      key: 4,
      id: `${_ctx.id}__errors`,
      class: normalizeClass(["vts-input__errors", $props.classes.errors])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.errorMessages, (error) => {
        return openBlock(), createElementBlock("span", {
          key: error,
          class: normalizeClass(["vts-input__error", $props.classes.error])
        }, toDisplayString(error), 3);
      }), 128))
    ], 10, _hoisted_9)) : createCommentVNode("", true)
  ], 2);
}
var VInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$7]]);
const _sfc_main$8 = {
  name: "VIntersect",
  props: {
    threshold: {
      type: [Number, Array],
      default: () => null
    },
    root: {
      type: String,
      default: void 0
    },
    rootMargin: {
      type: String,
      default: void 0
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["enter", "exit", "change"],
  data: () => ({
    entry: {}
  }),
  mounted() {
    let el = this.$el;
    {
      el = this.$el.nextElementSibling;
    }
    const { root, threshold, rootMargin, options, handler } = this;
    const observerOptions = __spreadProps(__spreadValues({}, options), {
      root,
      threshold,
      rootMargin
    });
    this.observer = new IntersectionObserver(handler, observerOptions);
    this.observer.observe(el);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    handler([entry]) {
      this.entry = entry;
      if (entry.isIntersecting) {
        this.$emit("enter", entry);
      } else {
        this.$emit("exit", entry);
      }
      this.$emit("change", entry);
    }
  },
  render() {
    const { entry } = this;
    {
      return this.$slots.default(entry);
    }
  }
};
var VModal_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {
  name: "VModal",
  model: {
    prop: "showing",
    event: "change"
  },
  props: {
    showing: Boolean,
    tag: {
      type: String,
      default: "div"
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: void 0
    },
    maxWidth: {
      type: String,
      default: void 0
    },
    noScroll: Boolean,
    transition: {
      type: String,
      default: void 0
    },
    bgTransition: {
      type: String,
      default: void 0
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    showing: {
      handler(next, prev) {
        if (typeof window !== "undefined") {
          if (next && next != prev) {
            this.noScroll && document.body.style.setProperty("overflow", "hidden");
            this.$nextTick(() => {
              this.$refs.content.focus();
            });
          } else {
            this.noScroll && document.body.style.removeProperty("overflow");
          }
        }
      }
    }
  },
  mounted() {
    console.warn("Vuetensil's VModal is deprecated. Please use VDialog instead.");
  },
  methods: {
    show() {
      this.$emit("show");
      this.$emit("change", true);
    },
    hide() {
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle() {
      const { showing } = this;
      const event = showing ? "hide" : "show";
      this.$emit(event, !showing);
      this.$emit("change", !showing);
    },
    onClick(event) {
      if (event.target.classList.contains("vts-modal") && this.dismissible) {
        this.hide();
      }
    },
    onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.hide();
      }
      if (event.keyCode === keycodes.TAB) {
        const content = this.$refs.content;
        if (!content)
          return;
        const focusable = Array.from(content.querySelectorAll(FOCUSABLE));
        if (!focusable.length) {
          event.preventDefault();
          return;
        }
        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          const focusedItemIndex = focusable.indexOf(document.activeElement);
          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }
          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: $props.bgTransition }, {
    default: withCtx(() => [
      $props.showing ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["vts-modal", $props.classes.root]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
        onKeydown: _cache[1] || (_cache[1] = (...args) => $options.onKeydown && $options.onKeydown(...args))
      }, [
        createVNode(Transition, {
          name: $props.transition,
          appear: ""
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
              ref: "content",
              style: normalizeStyle({ width: $props.width, maxWidth: $props.maxWidth }),
              class: normalizeClass(["vts-modal__content", $props.classes.content]),
              tabindex: "-1",
              role: "dialog"
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["style", "class"]))
          ]),
          _: 3
        }, 8, ["name"])
      ], 34)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["name"]);
}
var VModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
const _sfc_main$6 = {
  name: "VResize",
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  data: () => ({
    observer: void 0,
    width: void 0,
    height: void 0
  }),
  mounted() {
    this.observer = new ResizeObserver(this.updateDimensions);
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    updateDimensions() {
      const el = this.$el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.$emit("resize", arguments);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), { class: "vts-resize" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ width: _ctx.width, height: _ctx.height, inlineSize: _ctx.width, blockSize: _ctx.height })))
    ]),
    _: 3
  });
}
var VResize = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);
var VSkip_vue_vue_type_style_index_0_lang = "";
const _sfc_main$5 = {
  name: "VSkip",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    skipTo(id) {
      if (!id)
        return;
      const target = window.document.getElementById(id.slice(1));
      if (!target)
        return;
      if (!["a", "select", "input", "button", "textarea"].includes(target.tagName.toLowerCase())) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus();
    }
  }
};
const _hoisted_1$4 = ["href"];
const _hoisted_2$3 = /* @__PURE__ */ createTextVNode("Skip to main content");
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", {
    class: "vts-skip",
    href: $props.to,
    onClick: _cache[0] || (_cache[0] = ($event) => $options.skipTo($props.to))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      _hoisted_2$3
    ])
  ], 8, _hoisted_1$4);
}
var VSkip = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);
var VTable_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {
  name: "VTable",
  provide() {
    return {
      $table: this
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    page: {
      type: [Number, String],
      default: 1
    },
    perPage: {
      type: [Number, String],
      default: -1
    },
    sortBy: {
      type: String,
      default: ""
    },
    sortDirection: {
      type: String,
      default: "",
      validator: (direction) => {
        return (/* @__PURE__ */ new Set(["ASC", "DESC", ""])).has(direction.toUpperCase());
      }
    },
    id: {
      type: String,
      default: "vts-" + randomString(4)
    },
    caption: {
      type: String,
      default: ""
    },
    sortable: Boolean,
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localSortBy: this.sortBy,
      localSortDirection: this.sortDirection ? this.sortDirection.toUpperCase() : "",
      localPage: Number(this.page),
      localPerPage: Number(this.perPage)
    };
  },
  computed: {
    computedHeaders() {
      const { headers, sortable, localSortBy, localSortDirection } = this;
      const computedHeaders = [];
      headers.forEach((header) => {
        const computedHeader = __spreadProps(__spreadValues({}, header), {
          bind: {},
          sortBtn: {
            bind: { "aria-label": `toggle sort direction` },
            on: { click: () => this.onSort(header.key) }
          }
        });
        if (computedHeader.sortable === void 0) {
          computedHeader.sortable = !!computedHeader.sort || sortable;
        }
        if (computedHeader.sortable) {
          if (localSortBy === header.key && localSortDirection) {
            if (localSortDirection === "ASC") {
              computedHeader.bind["aria-sort"] = "ascending";
            } else {
              computedHeader.bind["aria-sort"] = "descending";
            }
          }
        }
        computedHeaders.push(computedHeader);
      });
      return computedHeaders;
    },
    computedItems() {
      const {
        computedHeaders,
        items,
        localSortBy,
        localSortDirection,
        localPage,
        localPerPage
      } = this;
      let computedItems = [...items];
      if (localSortBy && localSortDirection) {
        const targetColumn = computedHeaders.find((header) => {
          return header.key === localSortBy;
        });
        let compareFn = this.defaultComparisonFn;
        if (typeof targetColumn.sort === "function") {
          compareFn = targetColumn.sort;
        }
        computedItems = computedItems.sort((a, b) => {
          return compareFn(a, b, localSortDirection === "ASC");
        });
      }
      if (localPerPage > -1) {
        const offset = (Math.max(localPage, 1) - 1) * localPerPage;
        computedItems = computedItems.slice(offset, offset + localPerPage);
      }
      return computedItems;
    },
    lastPage() {
      return Math.ceil(this.items.length / +this.perPage);
    }
  },
  watch: {
    sortBy(value) {
      this.localSortBy = value;
    },
    localSortBy(value) {
      this.$emit("update:sort-by", value);
    },
    sortDirection(value) {
      this.localSortDirection = value && value.toUpperCase() || "";
    },
    localSortDirection(value) {
      this.$emit("update:sort-direction", value);
    },
    page(value) {
      this.localPage = Number(value);
    },
    localPage(value) {
      this.$emit("update:page", value);
    },
    perPage(value) {
      this.localPerPage = Number(value);
    },
    localPerPage(value) {
      this.$emit("update:per-page", value);
    }
  },
  methods: {
    defaultComparisonFn(a, b, isAscending) {
      const { localSortBy } = this;
      const multiplier = isAscending ? 1 : -1;
      const aVal = a[localSortBy];
      const bVal = b[localSortBy];
      const isNumeric = Number.isFinite(aVal) && Number.isFinite(bVal);
      if (isNumeric) {
        return (aVal - bVal) * multiplier;
      }
      if (aVal < bVal)
        return -1 * multiplier;
      if (aVal > bVal)
        return 1 * multiplier;
      return 0;
    },
    onSort(key) {
      const { localSortBy, localSortDirection } = this;
      this.localPage = 1;
      if (key !== localSortBy) {
        this.localSortBy = key;
        this.localSortDirection = "ASC";
        return;
      }
      switch (localSortDirection) {
        case "ASC":
          this.localSortDirection = "DESC";
          break;
        case "DESC":
          this.localSortDirection = "";
          break;
        default:
          this.localSortDirection = "ASC";
      }
    },
    goToPage(page) {
      const { lastPage } = this;
      this.localPage = Math.min(Math.max(1, page), lastPage);
    }
  }
};
const _hoisted_1$3 = ["id"];
const _hoisted_2$2 = ["disabled"];
const _hoisted_3$1 = ["disabled", "aria-label", "onClick"];
const _hoisted_4 = ["disabled"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "container",
    role: "region",
    "aria-labelledby": "caption",
    class: normalizeClass(["vts-table", { "vts-table--sortable": $props.sortable }, $props.classes.root])
  }, [
    createElementVNode("table", {
      class: normalizeClass([$props.classes.table])
    }, [
      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({
        caption: $props.caption,
        headers: $options.computedHeaders,
        items: $options.computedItems,
        sortBy: $data.localSortBy,
        sortDirection: $data.localSortDirection,
        page: $data.localPage,
        perPage: $data.localPerPage
      })), () => [
        $props.caption ? (openBlock(), createElementBlock("caption", {
          key: 0,
          id: `${$props.id}__caption`,
          class: normalizeClass([$props.classes.caption])
        }, toDisplayString($props.caption), 11, _hoisted_1$3)) : createCommentVNode("", true),
        $options.computedHeaders.length ? (openBlock(), createElementBlock("thead", {
          key: 1,
          class: normalizeClass([$props.classes.thead])
        }, [
          createElementVNode("tr", {
            class: normalizeClass([$props.classes.tr])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedHeaders, (header, index2) => {
              return openBlock(), createElementBlock("th", mergeProps({
                key: header.key
              }, header.bind, {
                class: [$props.classes.th]
              }), [
                renderSlot(_ctx.$slots, `header.${header.key}`, normalizeProps(guardReactiveProps({
                  header,
                  index: index2
                })), () => [
                  createTextVNode(toDisplayString(header.text || header.key) + " ", 1),
                  header.sortable ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    header.key === $data.localSortBy && $data.localSortDirection === "ASC" ? renderSlot(_ctx.$slots, "sort-asc", normalizeProps(mergeProps({ key: 0 }, header.sortBtn)), () => [
                      createElementVNode("button", mergeProps({
                        class: [
                          "vts-table__sort-btn",
                          "vts-table__sort-btn--asc",
                          $props.classes.sortBtn
                        ]
                      }, header.sortBtn.bind, toHandlers(header.sortBtn.on)), " \u2191 ", 16)
                    ]) : header.key === $data.localSortBy && $data.localSortDirection === "DESC" ? renderSlot(_ctx.$slots, "sort-desc", normalizeProps(mergeProps({ key: 1 }, header.sortBtn)), () => [
                      createElementVNode("button", mergeProps({
                        class: [
                          "vts-table__sort-btn",
                          "vts-table__sort-btn--desc",
                          $props.classes.sortBtn
                        ]
                      }, header.sortBtn.bind, toHandlers(header.sortBtn.on)), " \u2193 ", 16)
                    ]) : renderSlot(_ctx.$slots, "sort-none", normalizeProps(mergeProps({ key: 2 }, header.sortBtn)), () => [
                      createElementVNode("button", mergeProps({
                        class: ["vts-table__sort-btn", $props.classes.sortBtn]
                      }, header.sortBtn.bind, toHandlers(header.sortBtn.on)), " \u2195 ", 16)
                    ])
                  ], 64)) : createCommentVNode("", true)
                ])
              ], 16);
            }), 128))
          ], 2)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("tbody", {
          class: normalizeClass([$props.classes.tbody])
        }, [
          renderSlot(_ctx.$slots, "body", normalizeProps(guardReactiveProps({
            items: $options.computedItems,
            sortBy: $data.localSortBy,
            sortDirection: $data.localSortDirection,
            page: $data.localPage,
            perPage: $data.localPerPage
          })), () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedItems, (item, index2) => {
              return openBlock(), createElementBlock("tr", {
                key: item.id,
                class: normalizeClass(["vts-table__row", $props.classes.tr])
              }, [
                renderSlot(_ctx.$slots, "row", normalizeProps(guardReactiveProps({ item, index: index2, row: index2 + 1 })), () => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedHeaders, (column) => {
                    return openBlock(), createElementBlock("td", {
                      key: column.key,
                      class: normalizeClass([$props.classes.td])
                    }, [
                      renderSlot(_ctx.$slots, `column.${column.key}`, normalizeProps(guardReactiveProps({
                        item,
                        index: ($data.localPage - 1) * $data.localPerPage + index2,
                        row: index2 + 1,
                        key: column.key,
                        column: column.key,
                        value: item[column.key],
                        cell: item[column.key],
                        data: item[column.key]
                      })), () => [
                        createTextVNode(toDisplayString(item[column.key]), 1)
                      ])
                    ], 2);
                  }), 128))
                ])
              ], 2);
            }), 128))
          ])
        ], 2),
        _ctx.$slots.tfoot ? (openBlock(), createElementBlock("tfoot", {
          key: 2,
          class: normalizeClass([$props.classes.tfoot])
        }, [
          renderSlot(_ctx.$slots, "tfoot")
        ], 2)) : createCommentVNode("", true)
      ])
    ], 2),
    renderSlot(_ctx.$slots, "pagination", normalizeProps(guardReactiveProps({ page: $data.localPage, perPage: $data.localPerPage, lastPage: $options.lastPage, goToPage: $options.goToPage })), () => [
      $options.lastPage > 1 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["vts-table__pagination", $props.classes.pagination])
      }, [
        createElementVNode("button", {
          disabled: $data.localPage === 1,
          "aria-label": "go to previous page",
          class: normalizeClass(["vts-table__prev", $props.classes.previous]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage($data.localPage - 1))
        }, " Prev ", 10, _hoisted_2$2),
        createElementVNode("ul", {
          class: normalizeClass(["vts-table__pages", $props.classes.pageList])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.lastPage, (pageNum) => {
            return openBlock(), createElementBlock("li", {
              key: pageNum,
              class: normalizeClass([
                "vts-table__page-item",
                { "vts-table__page-item--current": pageNum === $data.localPage },
                $props.classes.pageItem
              ])
            }, [
              createElementVNode("button", {
                disabled: pageNum === $data.localPage,
                "aria-label": `go to page ${pageNum}`,
                class: normalizeClass([
                  "vts-table__page",
                  { "vts-table__page--current": pageNum === $data.localPage },
                  $props.classes.page
                ]),
                onClick: ($event) => $options.goToPage(pageNum)
              }, toDisplayString(pageNum), 11, _hoisted_3$1)
            ], 2);
          }), 128))
        ], 2),
        createElementVNode("button", {
          disabled: $data.localPage === $options.lastPage,
          "aria-label": "go to next page",
          class: normalizeClass(["vts-table__next", $props.classes.next]),
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage($data.localPage + 1))
        }, " Next ", 10, _hoisted_4)
      ], 2)) : createCommentVNode("", true)
    ])
  ], 2);
}
var VTable = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
const _sfc_main$3 = {
  name: "VTabs",
  model: {
    prop: "active",
    event: "change"
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: void 0
    },
    orientation: {
      type: String,
      default: "horizontal"
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeIndex: this.active,
      activeTab: this.active
    };
  },
  computed: {
    tabList() {
      return Object.keys(this.$slots).filter((name) => name.startsWith("tab-"));
    },
    panelList() {
      return Object.keys(this.$slots).filter((name) => name.startsWith("panel-"));
    }
  },
  watch: {
    active(next) {
      this.activeIndex = Math.max(0, Math.min(this.tabList.length - 1, next));
    },
    activeIndex(next) {
      this.$emit("change", next);
    }
  },
  created() {
    this.id = this.$attrs.id || `vts-${randomString(4)}`;
  },
  methods: {
    onKeydown(event) {
      const { keyCode } = event;
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
        case keycodes.LEFT:
        case keycodes.RIGHT:
        case keycodes.UP:
        case keycodes.DOWN:
          this.determineOrientation(event);
          break;
      }
    },
    determineOrientation(event) {
      const keyCode = event.keyCode;
      let proceed = false;
      if (this.orientation === "vertical") {
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
    switchTabOnArrowPress(event) {
      const keyCode = event.keyCode;
      const directions = {
        [keycodes.LEFT]: -1,
        [keycodes.UP]: -1,
        [keycodes.RIGHT]: 1,
        [keycodes.DOWN]: 1
      };
      if (!directions[keyCode])
        return;
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
      {
        return $refs[activeTab].focus();
      }
    }
  }
};
const _hoisted_1$2 = ["aria-label", "aria-orientation"];
const _hoisted_2$1 = ["id", "aria-selected", "tabindex", "aria-controls", "onClick"];
const _hoisted_3 = ["id", "aria-labelledby", "hidden"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vts-tabs", $props.classes.root])
  }, [
    createElementVNode("div", {
      role: "tablist",
      "aria-label": $props.label,
      "aria-orientation": $props.orientation,
      class: normalizeClass(["vts-tabs__tablist", $props.classes.tablist])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.tabList, (tab, index2) => {
        return openBlock(), createElementBlock("button", {
          id: `${_ctx.id}-${tab}`,
          key: tab,
          ref_for: true,
          ref: tab,
          "aria-selected": index2 === $data.activeIndex,
          tabindex: index2 === $data.activeIndex ? false : -1,
          "aria-controls": `${_ctx.id}-${tab.replace("tab", "panel")}`,
          class: normalizeClass([
            `vts-tabs__tab vts-tabs__tab--${tab} vts-tabs__tab--${index2}`,
            {
              "vts-tabs__tab--active": index2 === $data.activeIndex,
              [$props.classes.tabActive]: index2 === $data.activeIndex
            },
            $props.classes.tab
          ]),
          role: "tab",
          type: "button",
          onKeydown: _cache[0] || (_cache[0] = (...args) => $options.onKeydown && $options.onKeydown(...args)),
          onClick: ($event) => $data.activeIndex = index2
        }, [
          renderSlot(_ctx.$slots, tab)
        ], 42, _hoisted_2$1);
      }), 128))
    ], 10, _hoisted_1$2),
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.panelList, (tab, index2) => {
      return openBlock(), createElementBlock("div", {
        id: `${_ctx.id}-panel-${index2}`,
        key: tab,
        "aria-labelledby": `${_ctx.id}-tab-${index2}`,
        hidden: index2 !== $data.activeIndex,
        class: normalizeClass([
          `vts-tabs__panel vts-tabs__panel--${index2}`,
          {
            "vts-tabs__panel--active": index2 === $data.activeIndex,
            [$props.classes.panelActive]: index2 === $data.activeIndex
          },
          $props.classes.panel
        ]),
        tabindex: "0",
        role: "tabpanel"
      }, [
        renderSlot(_ctx.$slots, tab)
      ], 10, _hoisted_3);
    }), 128))
  ], 2);
}
var VTabs = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
var VToggle_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  name: "VToggle",
  model: {
    prop: "open",
    event: "update"
  },
  props: {
    open: Boolean,
    label: {
      type: String,
      default: ""
    },
    disabled: Boolean,
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  computed: {
    listeners() {
      {
        return this.$attrs;
      }
    }
  },
  watch: {
    open(next) {
      this.isOpen = next;
    },
    isOpen(isOpen) {
      if (typeof window === "undefined")
        return;
      this.$emit("update", isOpen);
      this.$emit(isOpen ? "open" : "close");
    }
  },
  created() {
    const { id } = this.$attrs;
    this.id = id ? id : `vts-${randomString(4)}`;
  },
  methods: {
    collapse(el) {
      el.style.blockSize = "0";
    },
    expand(el) {
      el.style.overflow = "hidden";
      el.style.blockSize = `${el.scrollHeight}px`;
      el.scrollHeight;
    },
    resetHeight(el) {
      el.style.overflow = "visible";
      el.style.blockSize = "";
    }
  }
};
const _hoisted_1$1 = ["id", "disabled", "aria-controls", "aria-expanded"];
const _hoisted_2 = ["id", "aria-labelledby", "aria-hidden"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vts-toggle", { "vts-toggle--open": $data.isOpen }, $props.classes.root])
  }, [
    createElementVNode("button", mergeProps({
      id: `${_ctx.id}-label`,
      ref: "label",
      type: "button",
      disabled: $props.disabled,
      "aria-controls": `${_ctx.id}-content`,
      "aria-expanded": String($data.isOpen),
      class: ["vts-toggle__label", $props.classes.label],
      onClick: _cache[0] || (_cache[0] = ($event) => $data.isOpen = !$data.isOpen)
    }, toHandlers($options.listeners)), [
      createTextVNode(toDisplayString($props.label) + " ", 1),
      renderSlot(_ctx.$slots, "label", normalizeProps(guardReactiveProps({ isOpen: $data.isOpen })))
    ], 16, _hoisted_1$1),
    createVNode(Transition, {
      onBeforeEnter: $options.collapse,
      onEnter: $options.expand,
      onAfterEnter: $options.resetHeight,
      onBeforeLeave: $options.expand,
      onLeave: $options.collapse
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          id: `${_ctx.id}-content`,
          "aria-labelledby": `${_ctx.id}-label`,
          "aria-hidden": !$data.isOpen,
          role: "region",
          class: normalizeClass(["vts-toggle__content", $props.classes.content])
        }, [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ isOpen: $data.isOpen })))
        ], 10, _hoisted_2), [
          [vShow, $data.isOpen && !$props.disabled]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])
  ], 2);
}
var VToggle = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
var VTooltip_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    id: {
      type: String,
      default: () => `vts-${randomString(4)}`
    },
    focus: Boolean,
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    onMouseenter() {
      if (this.focus)
        return;
      this.show = true;
    },
    onMouseleave() {
      if (this.focus)
        return;
      this.show = false;
    }
  }
};
const _hoisted_1 = ["id", "aria-hidden"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    id: $props.id,
    tabindex: "0",
    "aria-describedby": `${$props.id}__content`,
    class: normalizeClass(["vts-tooltip", $props.classes.toggle]),
    onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.show = true),
    onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.show = false),
    onMouseenter: $options.onMouseenter,
    onMouseleave: $options.onMouseleave
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      createElementVNode("span", {
        id: `${$props.id}__content`,
        role: "tooltip",
        "aria-hidden": !_ctx.show + "",
        class: normalizeClass([
          "vts-tooltip__content",
          {
            "vts-tooltip__content--visible": _ctx.show
          },
          $props.classes.content
        ])
      }, [
        renderSlot(_ctx.$slots, "tooltip")
      ], 10, _hoisted_1)
    ]),
    _: 3
  }, 40, ["id", "aria-describedby", "class", "onMouseenter", "onMouseleave"]);
}
var VTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  name: "VTry",
  props: {
    stopPropagation: Boolean
  },
  data: () => ({
    error: null
  }),
  errorCaptured(error) {
    this.error = error;
    this.$emit("catch", error);
    return !this.stopPropagation;
  },
  render() {
    const { error, $slots } = this;
    let slots = $slots;
    if (error && slots.catch) {
      return slots.catch(error);
    }
    return slots.default(error);
  }
};
var allComponents = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert,
  VAsync: _sfc_main$i,
  VBtn,
  VDate,
  VDialog,
  VDrawer,
  VDropdown,
  VFile,
  VForm,
  VImg,
  VInput,
  VIntersect: _sfc_main$8,
  VModal,
  VResize,
  VSkip,
  VTable,
  VTabs,
  VToggle,
  VTooltip,
  VTry: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
function currency(num, currency2, locale = navigator.language) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency2
  }).format(num);
}
function number(num, locale = navigator.language) {
  return new Intl.NumberFormat(locale).format(num);
}
const placeholder = (str, placeholder2) => str || placeholder2;
function plural(singular, plural2, amount) {
  return amount !== 1 ? plural2 : singular;
}
function truncate(str, length = 100, append = "...") {
  if (str.length > length) {
    return str.substring(0, length - append.length) + append;
  } else {
    return str;
  }
}
var allFilters = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize,
  currency,
  number,
  placeholder,
  plural,
  truncate
}, Symbol.toStringTag, { value: "Module" }));
function usePromise(promise, options = {}) {
  const state = reactive({
    pending: false,
    results: options.placeholder || null,
    error: null
  });
  const watch2 = async function watch3(promise2) {
    promise2 = typeof promise2 === "function" ? promise2() : promise2;
    if (!promise2 || !promise2.then)
      return;
    state.pending = true;
    options.onChange && options.onChange({
      pending: state.pending,
      results: state.results,
      error: state.error
    });
    options.onPending && options.onPending(state.pending);
    try {
      const resolved = await promise2;
      if (resolved !== void 0) {
        state.results = resolved;
      } else if (options.default !== void 0) {
        state.results = options.default;
      } else {
        state.results = null;
      }
      options.onResolve && options.onResolve(state.results);
    } catch (error) {
      if (error instanceof Error) {
        state.error = {
          name: error.name,
          message: error.message
        };
      } else {
        state.error = error;
      }
      console.error(error);
      options.onReject && options.onReject(state.error);
    } finally {
      state.pending = false;
      options.onChange && options.onChange({
        pending: state.pending,
        results: state.results,
        error: state.error
      });
      options.onPending && options.onPending(state.pending);
    }
  };
  if (promise) {
    watch2(promise);
  }
  return Object.assign(state, { watch: watch2 });
}
const useForm = (formRef, options = {}) => {
  const baseState = {
    invalid: false,
    dirty: false,
    error: false,
    inputs: {}
  };
  const state = reactive(baseState);
  const errors = new Map(Object.entries(options.errors || {}));
  const validate = async (form) => {
    if (!form)
      return;
    await nextTick();
    state.invalid = !form.checkValidity();
    const els = form.querySelectorAll("input, textarea, select");
    const inputs = {};
    els.forEach((input) => {
      const { name, id, validity } = input;
      const inputId = name || id;
      if (!inputId)
        return;
      const inputStatus = {
        value: input.value,
        valid: validity.valid,
        dirty: false,
        invalid: {
          type: validity.typeMismatch,
          required: validity.valueMissing,
          minlength: validity.tooShort,
          maxlength: validity.tooLong,
          min: validity.rangeOverflow,
          max: validity.rangeUnderflow,
          pattern: validity.patternMismatch
        },
        errors: []
      };
      errors.forEach((value, key) => {
        if (!inputStatus.invalid[key])
          return;
        const errorHandler = errors.get(key);
        const attrName = key.replace("length", "Length");
        const errorMessage = typeof errorHandler === "string" ? errorHandler : errorHandler(input[attrName]);
        inputStatus.errors.push(errorMessage);
      });
      inputStatus.dirty = state.inputs[inputId] ? state.inputs[inputId].dirty : false;
      inputs[inputId] = inputStatus;
    });
    state.inputs = inputs;
  };
  const onInput = () => validate(formRef.value);
  const onBlur = (event) => {
    validate(formRef.value);
    const input = event.target;
    const inputId = input.name || input.id;
    state.dirty = true;
    if (!inputId)
      return;
    if (!state.inputs[inputId])
      return;
    state.inputs[inputId].dirty = true;
  };
  const observer = new MutationObserver(onInput);
  watch(formRef, async (form, prev, onInvalidate) => {
    if (!form)
      return;
    await nextTick();
    validate(form);
    form.addEventListener("input", onInput);
    form.addEventListener("blur", onBlur, {
      capture: true
    });
    observer.observe(form, {
      childList: true,
      subtree: true
    });
    onInvalidate(() => {
      form.removeEventListener("input", onInput);
      form.removeEventListener("blur", onBlur);
      observer.disconnect();
    });
  });
  state.error = computed(() => state.invalid && state.dirty);
  state.validate = () => validate(formRef.value);
  state.reset = () => {
    state.dirty = false;
    validate(formRef.value);
  };
  state.clear = () => {
    const form = formRef.value;
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.value = "";
    });
  };
  return state;
};
const components = allComponents;
const directives = allDirectives;
const filters = allFilters;
var index = {
  install(Vue, pluginConfig = {}) {
    if (pluginConfig.components) {
      if (Array.isArray(pluginConfig.components)) {
        pluginConfig.components = pluginConfig.components.reduce((config, key) => {
          config[key] = true;
          return config;
        }, {});
      }
      Object.entries(pluginConfig.components).forEach((entry) => {
        const [key, options] = entry;
        const component = allComponents[key];
        const name = typeof options === "boolean" ? options.name || key : key;
        Vue.component(name, component);
      });
    }
    if (pluginConfig.directives) {
      if (Array.isArray(pluginConfig.directives)) {
        pluginConfig.directives = pluginConfig.directives.reduce((config, key) => {
          config[key] = true;
          return config;
        }, {});
      }
      Object.entries(pluginConfig.directives).forEach((entry) => {
        const [key] = entry;
        const directive = allDirectives[key];
        Vue.directive(key, directive);
      });
    }
    if (pluginConfig.filters) {
      if (Array.isArray(pluginConfig.filters)) {
        pluginConfig.filters = pluginConfig.filters.reduce((config, key) => {
          config[key] = true;
          return config;
        }, {});
      }
      Object.entries(pluginConfig.filters).forEach((entry) => {
        const [key] = entry;
        const filter = allFilters[key];
        Vue.filter(key, filter);
      });
    }
  }
};
export { VAlert, _sfc_main$i as VAsync, VBtn, VDate, VDialog, VDrawer, VDropdown, VFile, VForm, VImg, VInput, _sfc_main$8 as VIntersect, VModal, VResize, VSkip, VTable, VTabs, VToggle, VTooltip, _sfc_main as VTry, autofocus, capitalize, clickout, components, copy, currency, index as default, directives, filters, intersect, number, placeholder, plural, truncate, usePromise as useAsync, useForm };
