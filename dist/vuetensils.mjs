import { openBlock as r, createBlock as I, Transition as P, withCtx as V, resolveDynamicComponent as F, normalizeClass as d, renderSlot as f, createElementBlock as c, createTextVNode as E, createCommentVNode as g, withModifiers as x, Fragment as k, renderList as M, createElementVNode as h, mergeProps as b, toHandlers as O, resolveDirective as pe, withDirectives as j, normalizeProps as m, guardReactiveProps as w, withKeys as G, toDisplayString as S, vShow as de, createVNode as T, normalizeStyle as U, toHandlerKey as _e, vModelSelect as we, vModelText as Se, vModelDynamic as ke, reactive as ce, watch as De, nextTick as $, computed as Ee } from "vue";
const D = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [l, i] of s)
    t[l] = i;
  return t;
}, Ve = {
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
      default: !0
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
    dismissed: !1,
    timerId: null
  }),
  watch: {
    modelValue: {
      handler(e) {
        e && (this.dismissed = !1), typeof e == "number" && (this.clearTimer(), this.countdown());
      },
      immediate: !0
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
      this.$emit("dismiss"), this.dismissed = !0, typeof this.modelValue == "number" ? (this.$emit("update:modelValue", 0), this.$emit("update", 0), this.clearTimer()) : (this.$emit("update:modelValue", !1), this.$emit("update", !1));
    },
    countdown() {
      const { modelValue: e } = this;
      typeof e != "number" || e <= 0 || (this.timerId = setTimeout(() => {
        this.$emit("update:modelValue", e - 1), this.$emit("update", e - 1);
      }, 1e3));
    },
    clearTimer() {
      const { timerId: e } = this;
      e && (clearInterval(e), this.timerId = null);
    }
  }
}, Oe = ["aria-label"];
function Me(e, s, t, l, i, n) {
  return r(), I(P, { name: t.transition }, {
    default: V(() => [
      !e.dismissed && t.modelValue ? (r(), I(F(t.tag), {
        key: 0,
        role: "alert",
        class: d(["vts-alert", t.classes.root])
      }, {
        default: V(() => [
          f(e.$slots, "default"),
          t.dismissible ? (r(), c("button", {
            key: 0,
            "aria-label": t.dismissLabel,
            class: d(["vts-alert__dismiss", t.classes.dismiss]),
            type: "button",
            onClick: s[0] || (s[0] = (...a) => n.dismiss && n.dismiss(...a))
          }, [
            f(e.$slots, "dismiss", {}, () => [
              E("×")
            ])
          ], 10, Oe)) : g("", !0)
        ]),
        _: 3
      }, 8, ["class"])) : g("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const Ce = /* @__PURE__ */ D(Ve, [["render", Me]]), Ie = {
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
  emits: ["pending", "resolve", "reject", "finally"],
  data() {
    return {
      pending: !1,
      results: this.default,
      error: null,
      done: !1
    };
  },
  watch: {
    await: {
      handler: "awaitOn",
      immediate: !0
    },
    pending: {
      handler(e) {
        this.$emit("pending", e);
      },
      immediate: !0
    }
  },
  methods: {
    awaitOn(e) {
      if (e && (e = typeof e == "function" ? e() : e, !!e.then))
        return this.pending = !0, this.results = this.default, this.error = null, e.then((s) => {
          this.results = typeof s > "u" ? this.default : s, this.$emit("resolve", s);
        }).catch((s) => {
          s instanceof Error && (s = {
            name: s.name,
            message: s.message
          }), this.error = s, this.$emit("reject", s);
        }).finally(() => {
          this.pending = !1, this.done = !0, this.$emit("finally");
        });
    }
  },
  render() {
    const { pending: e, error: s, results: t, done: l } = this;
    let i = this.$slots;
    const n = i.pending, a = i.rejected, o = i.resolved, u = i.default;
    if (e && n)
      return n();
    if (l && s && a)
      return a(s);
    if (l && !s && o)
      return o(t);
    if (u)
      return u({
        pending: e,
        resolved: t,
        rejected: s,
        results: t,
        error: s
      });
  }
};
const Pe = {
  name: "VBtn",
  inheritAttrs: !1,
  props: {
    action: { type: String, default: "" },
    data: { type: Object, default: () => ({}) }
  },
  emits: ["submit"],
  computed: {
    tag() {
      const e = this.$attrs || {};
      return e.to ? "RouterLink" : e.href ? "a" : "button";
    },
    type() {
      if (this.tag === "button")
        return this.$attrs.type || "button";
    },
    listeners() {
      return this.$attrs;
    }
  }
}, Le = ["action"], Te = ["value", "name"];
function Fe(e, s, t, l, i, n) {
  return t.action && t.data ? (r(), c("form", {
    key: 0,
    action: t.action,
    method: "POST",
    class: "vts-btn__form",
    onSubmit: s[0] || (s[0] = x((a) => e.$emit("submit", a), ["prevent"]))
  }, [
    (r(!0), c(k, null, M(t.data, (a, o) => (r(), c("input", {
      key: o,
      value: a,
      name: String(o),
      type: "hidden",
      hidden: "",
      autocomplete: "off",
      "aria-hidden": "true",
      tabindex: "-1"
    }, null, 8, Te))), 128)),
    h("button", b({ type: "submit" }, e.$attrs, { class: "vts-btn" }, O(n.listeners, !0)), [
      f(e.$slots, "default")
    ], 16)
  ], 40, Le)) : (r(), I(F(n.tag), b({
    key: 1,
    class: "vts-btn",
    type: n.type
  }, e.$attrs, O(n.listeners)), {
    default: V(() => [
      f(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["type"]));
}
const Be = /* @__PURE__ */ D(Pe, [["render", Fe]]), v = Object.freeze({
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
}), J = (e) => e.focus(), Ae = {
  mounted: J,
  inserted: J
};
function X(e, s) {
  e._vtsClickout = {
    stop: (t) => t.stopPropagation()
  }, document.body.addEventListener("click", s.value), e.addEventListener("click", e._vtsClickout.stop);
}
function Q(e, s) {
  document.body.removeEventListener("click", s.value), e.removeEventListener("click", e._vtsClickout.stop);
}
const ue = {
  mounted: X,
  unmounted: Q,
  bind: X,
  unbind: Q
};
function he(e) {
  const s = document.activeElement, t = document.createElement("textarea");
  t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", t.style.fontSize = "12pt", document.body.append(t), t.select(), document.execCommand("copy"), t.remove(), s && s.focus();
}
function Z(e, s) {
  e._vtsCopy = () => he(s.value), e.addEventListener("click", e._vtsCopy);
}
function ee(e, s) {
  e.removeEventListener("click", e._vtsCopy), e._vtsCopy = () => he(s.value), e.addEventListener("click", e._vtsCopy);
}
function te(e) {
  e.removeEventListener("click", e._vtsCopy);
}
const xe = {
  mounted: Z,
  updated: ee,
  unmounted: te,
  bind: Z,
  update: ee,
  unbind: te
};
function se(e, s) {
  e._vtsFocusout = () => {
    requestAnimationFrame(() => {
      e.contains(document.activeElement) || s.value();
    });
  }, e.addEventListener("focusout", e._vtsFocusout);
}
function ne(e) {
  e._vtsFocusout && e.removeEventListener("focusout", e._vtsFocusout);
}
const je = {
  mounted: se,
  unmounted: ne,
  bind: se,
  unbind: ne
};
function R(e) {
  e._vtsIntersect && (e._vtsIntersect.unobserve(e), delete e._vtsIntersect);
}
function ie(e, { value: s, modifiers: t }) {
  const l = {
    ...s
  }, { enter: i, exit: n, once: a } = t;
  l.root && (l.root = typeof l.root == "string" ? document.querySelector(l.root) : l.root);
  const o = { ...s };
  s instanceof Function && (i && (o.onEnter = s), n && (o.onExit = s), !i && !n && (o.onChange = s));
  const u = new IntersectionObserver(([y]) => {
    const p = Array.isArray(l.threshold), _ = {};
    for (const C in y)
      _[C] = y[C];
    _.isIntersecting = p ? l.threshold.includes(y.intersectionRatio) : y.intersectionRatio === l.threshold, _.isIntersecting ? o.onEnter && o.onEnter(_, e) : o.onExit && o.onExit(_, e), o.onChange && o.onChange(_, e), a && R(e);
  }, l);
  u.observe(e), e._vtsIntersect = u;
}
const Ne = {
  mounted: ie,
  unmounted: R,
  inserted: ie,
  unbind: R
}, fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autofocus: Ae,
  clickout: ue,
  copy: xe,
  focusout: je,
  intersect: Ne
}, Symbol.toStringTag, { value: "Module" })), H = [
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
function B(e = 10, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let t = "";
  for (let l = 0; l < e; l++)
    t += s.charAt(Math.floor(Math.random() * s.length));
  return t;
}
function W(e, s) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() === s.toLowerCase();
}
function ze(e, s) {
  const t = Array.from(e.querySelectorAll(H));
  if (!t.length) {
    s.preventDefault();
    return;
  }
  if (!e.contains(document.activeElement))
    s.preventDefault(), t[0].focus();
  else {
    const l = t.indexOf(document.activeElement);
    s.shiftKey && l === 0 && (t[t.length - 1].focus(), s.preventDefault()), !s.shiftKey && l === t.length - 1 && (t[0].focus(), s.preventDefault());
  }
}
function ae(e, s) {
  return e.getFullYear() === s.getFullYear() && e.getMonth() === s.getMonth() && e.getDate() === s.getDate();
}
const Ue = [
  v.UP,
  v.DOWN,
  v.LEFT,
  v.RIGHT,
  v.PAGEUP,
  v.PAGEDOWN,
  v.HOME,
  v.END
], He = {
  name: "VDate",
  directives: {
    clickout: ue
  },
  model: {
    prop: "date",
    event: "update"
  },
  props: {
    modelValue: {
      type: [Date, String],
      default: () => new Date()
    },
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
      default: () => `vts-${B(4)}`
    },
    daysOfWeek: {
      type: Object,
      default: () => Object.freeze({
        Su: "Sunday",
        Mo: "Monday",
        Tu: "Tuesday",
        We: "Wednesday",
        Th: "Thursday",
        Fr: "Friday",
        Sa: "Saturday"
      })
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
      default: () => Object.freeze({
        selectDate: "Select Date",
        showCalendar: "show calendar",
        previousMonth: "previous month",
        nextMonth: "next month",
        previousYear: "previous year",
        nextYear: "next year"
      })
    },
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "update:modelValue"],
  data() {
    return {
      show: !1,
      previousActiveEl: null,
      focusedDate: new Date(this.modelValue || this.date),
      selectedDate: new Date(this.modelValue || this.date)
    };
  },
  computed: {
    monthYear() {
      const { monthLabels: e, focusedDate: s } = this;
      return `${e[s.getMonth()]} ${s.getFullYear()}`;
    },
    disableNav() {
      const { focusedDate: e, min: s, max: t } = this, l = {}, i = new Date(s), n = new Date(t);
      return s && (l.prevYear = e.getFullYear() <= i.getFullYear(), l.prevMonth = e.getMonth() <= i.getMonth()), t && (l.nextYear = e.getFullYear() >= n.getFullYear(), l.nextMonth = e.getMonth() >= n.getMonth()), l;
    },
    daysByWeeks() {
      const { focusedDate: e, selectedDate: s, min: t, max: l } = this, i = new Date(
        e.getFullYear(),
        e.getMonth(),
        1
      ), n = i.getDay();
      i.setDate(i.getDate() - n);
      const a = new Date(
        e.getFullYear(),
        e.getMonth() + 1,
        0
      ).getDate(), o = new Date(i), u = n + a < 36 ? 5 : 6, y = [];
      for (let p = 0; p < u; p++) {
        y.push([]);
        for (let _ = 0; _ < 7; _++) {
          const C = new Date(o);
          let A = !1;
          t && (A = C < new Date(t)), l && !A && (A = C > new Date(l)), y[p].push({
            date: C,
            isFocused: ae(C, e),
            isSelected: ae(C, s),
            disabled: A
          }), o.setDate(o.getDate() + 1);
        }
      }
      return y;
    },
    toggle() {
      const { show: e } = this;
      return {
        bind: {
          "aria-label": this.buttonLabels.selectDate,
          "aria-expanded": "" + e
        },
        on: {
          click: () => {
            this.show = !e;
          }
        }
      };
    }
  },
  watch: {
    show(e) {
      const { previousActiveEl: s, date: t } = this;
      e ? (this.previousActiveEl = document.activeElement, this.focusedDate = new Date(t), this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      })) : s && s.focus();
    },
    selectedDate(e) {
      this.$emit("update", e), this.$emit("update:modelValue", e), this.show = !1;
    }
  },
  methods: {
    incrementMonthBy(e) {
      const { focusedDate: s } = this, t = new Date(s);
      t.setMonth(t.getMonth() + e + 1), t.setDate(0);
      const l = new Date(s);
      l.setDate(Math.min(l.getDate(), t.getDate())), l.setMonth(l.getMonth() + e), this.focusedDate = l;
    },
    incrementYearBy(e) {
      const s = new Date(this.focusedDate);
      s.setFullYear(s.getFullYear() + e), this.focusedDate = s;
    },
    onClick({ target: e }) {
      e.classList.contains("vts-date__day") && (this.selectedDate = new Date(e.value));
    },
    onKeydown(e) {
      if (!e.target.classList.contains("vts-date__day") || !Ue.includes(e.keyCode))
        return;
      e.stopPropagation(), e.preventDefault();
      const { focusedDate: s, min: t, max: l } = this, i = new Date(s);
      switch (e.keyCode) {
        case v.ENTER:
        case v.SPACE:
          this.selectedDate = i;
          return;
        case v.RIGHT:
          i.setDate(i.getDate() + 1);
          break;
        case v.LEFT:
          i.setDate(i.getDate() - 1);
          break;
        case v.DOWN:
          i.setDate(i.getDate() + 7);
          break;
        case v.UP:
          i.setDate(i.getDate() - 7);
          break;
        case v.PAGEUP:
          e.shiftKey ? i.setFullYear(s.getFullYear() - 1) : i.setMonth(s.getMonth() - 1);
          break;
        case v.PAGEDOWN:
          e.shiftKey ? i.setFullYear(s.getFullYear() + 1) : i.setMonth(s.getMonth() + 1);
          break;
        case v.HOME:
          i.setDate(i.getDate() - i.getDay());
          break;
        case v.END:
          i.setDate(i.getDate() + (6 - i.getDay()));
          break;
      }
      const n = t && new Date(t), a = l && new Date(l);
      n && i < n || a && i > a || (this.focusedDate = i, this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      }));
    },
    onTab(e) {
      ze(this.$refs.calendar, e);
    },
    onClickout(e) {
      const { show: s } = this;
      e.preventDefault(), s && (this.show = !1);
    }
  }
}, Ye = ["id"], Ke = ["aria-label"], We = ["aria-labelledby"], qe = { class: "vts-date__navigation" }, Re = ["aria-label", "disabled"], Ge = ["aria-label", "disabled"], $e = ["id"], Je = ["aria-label", "disabled"], Xe = ["aria-label", "disabled"], Qe = ["aria-labelledby"], Ze = ["abbr"], et = ["tabindex", "aria-selected", "value", "disabled"];
function tt(e, s, t, l, i, n) {
  const a = pe("clickout");
  return j((r(), c("div", {
    id: t.id,
    class: d(["vtd-date", t.classes.root])
  }, [
    f(e.$slots, "default", m(w(n.toggle)), () => [
      h("button", b(n.toggle.bind, {
        type: "button",
        class: ["vtd-date__toggle", t.classes.toggle]
      }, O(n.toggle.on, !0)), [
        h("span", {
          role: "img",
          "aria-label": t.buttonLabels.showCalendar
        }, " 📅 ", 8, Ke)
      ], 16)
    ]),
    j(h("div", {
      ref: "calendar",
      class: d(["", ["vtd-date__wrapper", t.classes.wrapper]]),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": `${t.id}-dialog-label`,
      onClick: s[4] || (s[4] = (...o) => n.onClick && n.onClick(...o)),
      onKeydown: [
        s[5] || (s[5] = (...o) => n.onKeydown && n.onKeydown(...o)),
        s[6] || (s[6] = G((...o) => n.onTab && n.onTab(...o), ["tab"])),
        s[7] || (s[7] = G((o) => i.show = !1, ["esc"]))
      ]
    }, [
      h("div", qe, [
        h("button", {
          class: d(["vtd-date__prev-year", t.classes.prevYear]),
          "aria-label": t.buttonLabels.previousYear,
          type: "button",
          disabled: n.disableNav.prevYear,
          onClick: s[0] || (s[0] = (o) => n.incrementYearBy(-1))
        }, [
          f(e.$slots, "prevYearLabel", {}, () => [
            E("↞")
          ])
        ], 10, Re),
        h("button", {
          class: d(["vtd-date__prev-month", t.classes.prevMonth]),
          "aria-label": t.buttonLabels.previousMonth,
          type: "button",
          disabled: n.disableNav.prevMonth,
          onClick: s[1] || (s[1] = (o) => n.incrementMonthBy(-1))
        }, [
          f(e.$slots, "prevMonthLabel", {}, () => [
            E("←")
          ])
        ], 10, Ge),
        h("h4", {
          id: `${t.id}-dialog-label`,
          class: d(["vtd-date__title", t.classes.title]),
          "aria-live": "polite"
        }, S(n.monthYear), 11, $e),
        h("button", {
          class: d(["vtd-date__next-month", t.classes.nextMonth]),
          "aria-label": t.buttonLabels.nextMonth,
          type: "button",
          disabled: n.disableNav.nextMonth,
          onClick: s[2] || (s[2] = (o) => n.incrementMonthBy(1))
        }, [
          f(e.$slots, "nextMonthLabel", {}, () => [
            E("→")
          ])
        ], 10, Je),
        h("button", {
          class: d(["vtd-date__next-year", t.classes.nextYear]),
          "aria-label": t.buttonLabels.nextYear,
          type: "button",
          disabled: n.disableNav.nextYear,
          onClick: s[3] || (s[3] = (o) => n.incrementYearBy(1))
        }, [
          f(e.$slots, "nextYearLabel", {}, () => [
            E("↠")
          ])
        ], 10, Xe)
      ]),
      h("table", {
        class: d(["vtd-date__calendar", t.classes.calendar]),
        role: "grid",
        "aria-labelledby": `${t.id}-dialog-label`
      }, [
        h("thead", {
          class: d(["vtd-date__thead", t.classes.thead])
        }, [
          h("tr", {
            class: d(["vtd-date__week", t.classes.week])
          }, [
            (r(!0), c(k, null, M(t.daysOfWeek, (o, u) => (r(), c("th", {
              key: u,
              abbr: o,
              scope: "col",
              class: d(["vtd-date__th", t.classes.th])
            }, S(u), 11, Ze))), 128))
          ], 2)
        ], 2),
        h("tbody", {
          class: d(["vtd-date__tbody", t.classes.tbody])
        }, [
          (r(), c(k, null, M(6, (o) => h("tr", {
            key: o,
            class: d(["vtd-date__tr", t.classes.tr])
          }, [
            (r(!0), c(k, null, M(n.daysByWeeks[o - 1], (u) => (r(), c("td", {
              key: u.date.toString(),
              class: d([
                "vts-date__td",
                { "vts-date__td--focused": u.isFocused },
                { "vts-date__td--selected": u.isSelected },
                t.classes.td,
                { [t.classes.tdFocused]: t.classes.tdFocused && u.isFocused },
                { [t.classes.tdSelected]: t.classes.tdSelected && u.isSelected }
              ])
            }, [
              h("button", {
                class: d([
                  "vts-date__day",
                  { "vts-date__day--focused": u.isFocused },
                  { "vts-date__day--selected": u.isSelected },
                  t.classes.day,
                  { [t.classes.dayFocused]: t.classes.dayFocused && u.isFocused },
                  {
                    [t.classes.daySelected]: t.classes.daySelected && u.isSelected
                  }
                ]),
                tabindex: u.isFocused ? "0" : "-1",
                "aria-selected": u.isFocused,
                value: u.date,
                disabled: u.disabled,
                type: "button"
              }, S(u.date.getDate()), 11, et)
            ], 2))), 128))
          ], 2)), 64))
        ], 2)
      ], 10, Qe)
    ], 42, We), [
      [de, i.show]
    ])
  ], 10, Ye)), [
    [a, n.onClickout]
  ]);
}
const st = /* @__PURE__ */ D(He, [["render", tt]]);
const nt = {
  name: "VDialog",
  inheritAttrs: !1,
  model: {
    prop: "showing",
    event: "update:modelValue"
  },
  props: {
    modelValue: Boolean,
    showing: Boolean,
    tag: {
      type: String,
      default: "div"
    },
    dismissible: {
      type: Boolean,
      default: !0
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
  emits: ["update", "update:modelValue", "open", "close"],
  data() {
    return {
      localShow: this.modelValue || this.showing,
      activeElement: null
    };
  },
  computed: {
    slots() {
      return this.$slots;
    }
  },
  watch: {
    showing(e) {
      this.localShow = e;
    },
    modelValue(e) {
      this.localShow = e;
    },
    localShow: {
      handler(e, s) {
        if (!(typeof window > "u")) {
          if (e && e != s)
            this.activeElement = document.activeElement, this.onOpen();
          else {
            this.onClose();
            const { activeElement: t } = this;
            t && t.focus && this.$nextTick(() => {
              t.focus();
            });
          }
          this.$emit("update", e), this.$emit("update:modelValue", e);
        }
      }
    }
  },
  destroyed() {
    this.onClose();
  },
  methods: {
    onOpen() {
      const { onClick: e, onKeydown: s, noScroll: t } = this;
      window.addEventListener("click", e), window.addEventListener("keydown", s), t && document.body.style.setProperty("overflow", "hidden"), this.$nextTick(() => this.$refs.content.focus()), this.$emit("open");
    },
    onClose() {
      const { onClick: e, onKeydown: s, noScroll: t } = this;
      window.removeEventListener("click", e), window.removeEventListener("keydown", s), t && document.body.style.removeProperty("overflow"), this.$emit("close");
    },
    onClick(e) {
      e.target.classList.contains("vts-dialog") && this.dismissible && (this.localShow = !1);
    },
    onKeydown(e) {
      if (e.keyCode === v.ESC && this.dismissible && (this.localShow = !1), e.keyCode === v.TAB) {
        const s = this.$refs.content;
        if (!s)
          return;
        const t = Array.from(s.querySelectorAll(H));
        if (!t.length) {
          e.preventDefault();
          return;
        }
        if (!s.contains(document.activeElement))
          e.preventDefault(), t[0].focus();
        else {
          const l = t.indexOf(document.activeElement);
          e.shiftKey && l === 0 && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && l === t.length - 1 && (t[0].focus(), e.preventDefault());
        }
      }
    }
  }
}, it = { key: 0 };
function at(e, s, t, l, i, n) {
  return i.localShow || n.slots.toggle ? (r(), c("span", it, [
    n.slots.toggle ? f(e.$slots, "toggle", m(b({ key: 0 }, {
      on: {
        click: () => i.localShow = !i.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + i.localShow
      }
    }))) : g("", !0),
    T(P, {
      name: t.bgTransition || t.transition,
      appear: !0
    }, {
      default: V(() => [
        i.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-dialog", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          T(P, { name: t.contentTransition }, {
            default: V(() => [
              (r(), I(F(t.tag), {
                ref: "content",
                class: d(["vts-dialog__content", t.classes.content]),
                style: U({
                  width: t.width,
                  "inline-size": t.inlineSize,
                  "max-width": t.maxWidth,
                  "max-inline-size": t.maxInlineSize
                }),
                tabindex: "-1",
                role: "dialog",
                "aria-modal": "true"
              }, {
                default: V(() => [
                  f(e.$slots, "default", m(w({ close: () => i.localShow = !i.localShow })))
                ]),
                _: 3
              }, 8, ["class", "style"]))
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : g("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : g("", !0);
}
const lt = /* @__PURE__ */ D(nt, [["render", at]]);
const ot = "vts-drawer", rt = {
  name: "VDrawer",
  model: {
    prop: "showing",
    event: "update:modelValue"
  },
  props: {
    modelValue: Boolean,
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
  emits: ["update", "update:modelValue", "open", "close"],
  data() {
    return {
      localShow: this.modelValue || this.showing,
      activeElement: null
    };
  },
  computed: {
    slots() {
      return this.$slots;
    }
  },
  watch: {
    showing(e) {
      this.localShow = e;
    },
    modelValue(e) {
      this.localShow = e;
    },
    localShow: {
      handler(e, s) {
        if (!(typeof window > "u")) {
          if (e && e != s)
            this.activeElement = document.activeElement, this.onOpen();
          else {
            this.onClose();
            const { activeElement: t } = this;
            t && t.focus && this.$nextTick(() => {
              t.focus();
            });
          }
          this.$emit("update", e), this.$emit("update:modelValue", e);
        }
      }
    }
  },
  destroyed() {
    this.onClose();
  },
  methods: {
    onOpen() {
      const { onClick: e, onKeydown: s, noScroll: t } = this;
      window.addEventListener("click", e), window.addEventListener("keydown", s), t && document.body.style.setProperty("overflow", "hidden"), this.$nextTick(() => this.$refs.content.focus()), this.$emit("open");
    },
    onClose() {
      const { onClick: e, onKeydown: s, noScroll: t } = this;
      window.removeEventListener("click", e), window.removeEventListener("keydown", s), t && document.body.style.removeProperty("overflow"), this.$emit("close");
    },
    onClick(e) {
      e.target.classList.contains(ot) && (this.localShow = !1);
    },
    onKeydown(e) {
      if (e.keyCode === v.ESC && (this.localShow = !1), e.keyCode === v.TAB) {
        const s = this.$refs.content;
        if (!s)
          return;
        const t = Array.from(s.querySelectorAll(H));
        if (!t.length) {
          e.preventDefault();
          return;
        }
        if (!s.contains(document.activeElement))
          e.preventDefault(), t[0].focus();
        else {
          const l = t.indexOf(document.activeElement);
          e.shiftKey && l === 0 && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && l === t.length - 1 && (t[0].focus(), e.preventDefault());
        }
      }
    }
  }
}, dt = { key: 0 };
function ct(e, s, t, l, i, n) {
  return i.localShow || n.slots.toggle ? (r(), c("span", dt, [
    n.slots.toggle ? f(e.$slots, "toggle", m(b({ key: 0 }, {
      on: {
        click: () => i.localShow = !i.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + i.localShow
      }
    }))) : g("", !0),
    T(P, {
      name: t.bgTransition || t.transition,
      appear: ""
    }, {
      default: V(() => [
        i.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-drawer", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          T(P, {
            name: t.transition,
            appear: ""
          }, {
            default: V(() => [
              i.localShow ? (r(), I(F(t.tag), {
                key: 0,
                ref: "content",
                class: d([
                  "vts-drawer__content",
                  { "vts-drawer__content--right": !!t.right },
                  t.classes.content
                ]),
                style: U({
                  width: t.width,
                  "inline-size": t.inlineSize,
                  "max-width": t.maxWidth,
                  "max-inline-size": t.maxInlineSize
                }),
                tabindex: "-1"
              }, {
                default: V(() => [
                  f(e.$slots, "default", m(w({ close: () => i.localShow = !i.localShow })))
                ]),
                _: 3
              }, 8, ["class", "style"])) : g("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : g("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : g("", !0);
}
const ut = /* @__PURE__ */ D(rt, [["render", ct]]);
const ht = {
  name: "VDrawer",
  props: {
    text: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "bottom",
      validator(e) {
        return ["top", "bottom"].includes(e);
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
    isHovered: !1,
    isFocused: !1
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
      this.$el.contains(e.target) || (this.isFocused = !1);
    },
    onFocusout(e) {
      this.$el.contains(e.relatedTarget) || (this.isFocused = !1);
    }
  }
}, ft = ["aria-expanded"];
function vt(e, s, t, l, i, n) {
  return r(), c("div", {
    class: d(["vts-dropdown", t.classes.root]),
    onMouseenter: s[1] || (s[1] = (a) => e.isHovered = !0),
    onMouseleave: s[2] || (s[2] = (a) => e.isHovered = !1),
    onFocus: s[3] || (s[3] = (a) => e.isFocused = !0),
    onBlur: s[4] || (s[4] = (a) => e.isFocused = !1),
    onFocusout: s[5] || (s[5] = (...a) => n.onFocusout && n.onFocusout(...a))
  }, [
    h("button", {
      "aria-expanded": !!e.isHovered || !!e.isFocused,
      "aria-haspopup": "true",
      class: d(["vts-dropdown__trigger", t.classes.trigger]),
      type: "button",
      onClick: s[0] || (s[0] = (a) => e.isFocused = !e.isFocused)
    }, [
      f(e.$slots, "trigger", {}, () => [
        E(S(t.text), 1)
      ])
    ], 10, ft),
    T(P, { name: t.transition }, {
      default: V(() => [
        e.isHovered || e.isFocused ? (r(), c("div", {
          key: 0,
          class: d(["vts-dropdown__content", [`vts-dropdown__content--${t.position}`, t.classes.content]])
        }, [
          f(e.$slots, "default")
        ], 2)) : g("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ], 34);
}
const yt = /* @__PURE__ */ D(ht, [["render", vt]]);
const mt = {
  name: "VFile",
  model: {
    prop: "files",
    event: "update"
  },
  props: {
    label: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      default: () => "vts-" + B(4)
    },
    modelValue: {
      type: Array,
      default: () => []
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
    droppable: !1
  }),
  computed: {
    listeners() {
      return this.$attrs;
    }
  },
  watch: {
    files(e) {
      this.localFiles = e;
    },
    modelValue(e) {
      this.localFiles = e;
    },
    localFiles() {
      this.droppable = !1;
    }
  },
  methods: {
    onChange(e) {
      const s = Array.from(e.target.files);
      this.localFiles = s, this.$emit("update", s), this.$emit("update:modelValue", s);
    },
    onDrop(e) {
      const s = Array.from(e.dataTransfer.files);
      !(this.$attrs.multiple != null) && s.length > 1 && (s.length = 1), this.localFiles = s, this.$emit("update", s), this.$emit("update:modelValue", s);
    }
  }
}, bt = ["for"], gt = ["id"], pt = {
  key: 0,
  "aria-hidden": "true"
}, _t = {
  key: 1,
  "aria-hidden": "true"
};
function wt(e, s, t, l, i, n) {
  return r(), c("label", {
    for: t.id,
    class: d([
      "vts-file",
      {
        "vts-file--droppable": e.droppable,
        "vts-file--selected": !!e.localFiles.length
      },
      t.classes.label
    ])
  }, [
    h("input", b({
      id: t.id,
      ref: "input"
    }, e.$attrs, {
      type: "file",
      class: ["vts-visually-hidden", t.classes.input],
      onChange: s[0] || (s[0] = (...a) => n.onChange && n.onChange(...a))
    }, O(n.listeners, !0)), null, 16, gt),
    h("span", {
      class: d(["vts-file__text", t.classes.text])
    }, [
      f(e.$slots, "label", {}, () => [
        E(S(t.label), 1)
      ])
    ], 2),
    h("div", {
      class: d(["vts-file__dropzone", t.classes.dropzone]),
      onDragenter: s[5] || (s[5] = x((a) => e.droppable = !0, ["prevent"]))
    }, [
      f(e.$slots, "default", m(w({ files: e.localFiles, droppable: e.droppable })), () => [
        e.localFiles.length ? (r(), c("span", pt, [
          e.localFiles.length > 1 ? (r(), c(k, { key: 0 }, [
            E(S(e.localFiles.length) + " files selected ", 1)
          ], 64)) : (r(), c(k, { key: 1 }, [
            E(S(e.localFiles[0].name), 1)
          ], 64))
        ])) : (r(), c("span", _t, " Choose files or drop here "))
      ]),
      e.droppable ? (r(), c("span", {
        key: 0,
        class: d(["vts-file__overlay", t.classes.overlay]),
        onDrop: s[1] || (s[1] = x((...a) => n.onDrop && n.onDrop(...a), ["prevent"])),
        onDragenter: s[2] || (s[2] = x((a) => e.droppable = !0, ["stop"])),
        onDragleave: s[3] || (s[3] = x((a) => e.droppable = !1, ["stop"])),
        onDragover: s[4] || (s[4] = x(() => {
        }, ["prevent"]))
      }, [
        f(e.$slots, "overlay")
      ], 34)) : g("", !0)
    ], 34)
  ], 10, bt);
}
const St = /* @__PURE__ */ D(mt, [["render", wt]]), le = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]), kt = {
  name: "VForm",
  props: {
    lazy: {
      type: Boolean,
      default: !1
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    preventNavigation: {
      type: Boolean,
      default: !1
    },
    honeypot: {
      type: [Boolean, String],
      default: !1
    }
  },
  data: () => ({
    dirty: !1,
    modified: !1,
    localInputs: {}
  }),
  computed: {
    listeners() {
      return this.$attrs;
    },
    event() {
      return this.lazy ? "change" : "input";
    },
    valid() {
      return !Object.values(this.localInputs).find((e) => !e.valid);
    },
    error() {
      return !this.valid && this.dirty;
    },
    inputs() {
      const e = {}, { localInputs: s, errors: t } = this;
      for (const l in s) {
        const i = {
          ...s[l],
          error: s[l].dirty && !s[l].valid,
          errors: []
        }, n = new Map(Object.entries(t || {}));
        n.forEach((a, o) => {
          if (!i.invalid[o])
            return;
          const u = n.get(o), y = o.replace("length", "Length"), p = typeof u == "string" ? u : u(i._inputEl[y]);
          i.errors.push(p);
        }), e[l] = i;
      }
      return e;
    }
  },
  mounted() {
    this.validate();
    const e = new MutationObserver(this.validate);
    e.observe(this.$el, {
      childList: !0,
      subtree: !0
    }), this.observer = e, this.preventNavigation && window.addEventListener("beforeunload", this.preventNav), this.listeners.invalid && (this.$el.noValidate = !0);
  },
  beforeRouteLeave(e, s, t) {
    this.modified || t(), window.confirm("Leave without saving?") && t();
  },
  beforeDestroy() {
    this.observer.disconnect(), window.removeEventListener("beforeunload", this.preventNav);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  methods: {
    checkModified({ target: e }) {
      le.has(e.tagName) && (this.modified = !0);
    },
    validate() {
      const e = this.$el.querySelectorAll("input, textarea, select"), s = {};
      e.forEach((t) => {
        const { name: l, id: i, validity: n } = t, a = l || i;
        if (a)
          switch (s[a] = {
            _inputEl: t,
            valid: n.valid,
            dirty: !1,
            invalid: {
              type: n.typeMismatch,
              required: n.valueMissing,
              minlength: n.tooShort,
              maxlength: n.tooLong,
              min: n.rangeOverflow,
              max: n.rangeUnderflow,
              pattern: n.patternMismatch
            }
          }, t.type) {
            case "checkbox":
              s[a].value = t.checked;
              break;
            case "radio":
              t.checked && (s[a].value = t.value);
              break;
            default:
              s[a].value = t.value;
          }
      }), this.localInputs = s;
    },
    onEvent() {
      this.validate();
    },
    onBlur({ target: e }) {
      le.has(e.tagName) && (this.dirty = !0, this.localInputs[e.name].dirty = !0);
    },
    clear() {
      this.$el.querySelectorAll("input, textarea, select").forEach((s) => {
        ["radio", "checkbox"].includes(s.type) ? s.checked = !1 : s.value = "";
      });
    },
    reset() {
      this.modified = !1, this.dirty = !1, this.validate();
    },
    onSubmit(e) {
      if (!e.target.checkValidity()) {
        this.$emit("invalid", e);
        return;
      }
      this.reset(), this.$emit("valid", e);
    },
    preventNav(e) {
      this.modified && (e.preventDefault(), e.returnValue = "");
    }
  }
}, Dt = ["method"], Et = ["name"];
function Vt(e, s, t, l, i, n) {
  return r(), c("form", b({
    method: e.$attrs.method || "POST",
    class: [
      "vts-form",
      {
        "vts-form--invalid": !n.valid,
        "vts-form--dirty": e.dirty,
        "vts-form--error": n.error
      }
    ]
  }, {
    [_e(n.event)]: s[0] || (s[0] = (...a) => n.onEvent && n.onEvent(...a))
  }, {
    onKeydown: s[1] || (s[1] = (...a) => n.checkModified && n.checkModified(...a)),
    onChange: s[2] || (s[2] = (...a) => n.checkModified && n.checkModified(...a)),
    onSubmit: s[3] || (s[3] = (...a) => n.onSubmit && n.onSubmit(...a)),
    onBlurCapture: s[4] || (s[4] = (...a) => n.onBlur && n.onBlur(...a))
  }, O(n.listeners, !0)), [
    t.honeypot ? (r(), c("input", {
      key: 0,
      name: typeof t.honeypot == "string" ? t.honeypot : "vts-honeypot",
      class: "visually-hidden",
      tabindex: "-1",
      autocomplete: "off",
      "aria-hidden": "true"
    }, null, 8, Et)) : g("", !0),
    f(e.$slots, "default", m(w({ valid: n.valid, dirty: e.dirty, modified: e.modified, error: n.error, inputs: n.inputs, clear: n.clear, validate: n.validate })))
  ], 16, Dt);
}
const Ot = /* @__PURE__ */ D(kt, [["render", Vt]]);
const q = "vts-img", Mt = {
  name: "VImg",
  inheritAttrs: !1,
  props: {
    src: {
      type: String,
      required: !0
    },
    alt: {
      type: String,
      required: !0
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
      return this.$attrs;
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
      this.dataUrl = this.getDataUrl(), this.observer = new IntersectionObserver(this.handler), this.observer.observe(this.$el);
    },
    handler([e]) {
      const { $el: s } = this;
      e.isIntersecting && (s.classList.add(`${q}--loading`), this.loadImg(), this.observer.disconnect());
    },
    getDataUrl() {
      if (typeof window > "u")
        return;
      const { width: e, height: s } = this.$attrs;
      if (!e || !s)
        return "";
      const t = 100, l = document.createElement("canvas");
      return l.width = t, l.height = +s / +e * t, l.toDataURL();
    },
    loadImg() {
      const { src: e, srcset: s } = this, { img: t } = this.$refs;
      t.addEventListener("load", this.onLoad), s && (t.srcset = s), t.src = e;
    },
    onLoad() {
      const { $el: e } = this, { img: s, placeholder: t } = this.$refs;
      e.classList.remove(`${q}--loading`), e.classList.add(`${q}--loaded`), t && s.addEventListener("transitionend", function l() {
        t.remove(), s.removeEventListener("transitionend", l);
      }), s.removeEventListener("load", this.onLoad);
    }
  }
}, Ct = /* @__PURE__ */ h("noscript", null, `
      <img
        :src="dataUrl"
        :class="['vts-img__img', classes.img]"
        :alt="alt"
        :style="{
          transitionDuration: \`\${transitionDuration}ms\`,
        }"
        :decoding="$attrs.decoding || 'async'"
        :role="$attrs.role || alt ? null : 'presentation'"
        v-bind="$attrs"
      />
    `, -1), It = ["src", "decoding"], Pt = ["src", "alt", "decoding", "role"];
function Lt(e, s, t, l, i, n) {
  return r(), c("picture", {
    class: d(["vts-img", t.classes.root])
  }, [
    Ct,
    e.dataUrl ? (r(), c("div", {
      key: 0,
      ref: "placeholder",
      class: d(["vts-img__placeholder", t.classes.placeholder]),
      style: U({ background: t.background })
    }, [
      h("img", b({
        src: t.placeholder || e.dataUrl,
        alt: ""
      }, e.$attrs, {
        decoding: e.$attrs.decoding || "async"
      }), null, 16, It)
    ], 6)) : g("", !0),
    h("img", b({
      ref: "img",
      src: e.dataUrl,
      class: ["vts-img__img", t.classes.img],
      alt: t.alt,
      style: {
        transitionDuration: `${t.transitionDuration}ms`
      },
      decoding: e.$attrs.decoding || "async",
      role: e.$attrs.role || t.alt ? null : "presentation"
    }, e.$attrs, O(n.listeners, !0)), null, 16, Pt)
  ], 2);
}
const Tt = /* @__PURE__ */ D(Mt, [["render", Lt]]), oe = {
  type: [String, Number, Boolean, Array],
  default: void 0
};
function re(e, s) {
  e !== s && (this.localValue = e);
}
const Ft = {
  name: "VInput",
  inheritAttrs: !1,
  model: {
    event: "update:modelValue"
  },
  props: {
    label: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    value: oe,
    modelValue: oe,
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
      valid: !0,
      anyInvalid: !1,
      dirty: !1,
      invalid: {}
    };
  },
  computed: {
    bind() {
      const { id: e, name: s, valid: t, dirty: l, error: i, errorMessages: n, classes: a, $attrs: o } = this, { class: u, ...y } = o, p = [];
      return i && p.push(`${e}__description`), n.length && p.push(`${e}__errors`), {
        "aria-invalid": !t,
        "aria-describedby": l && p.length ? p.join(" ") : null,
        ...y,
        id: `${e}__input`,
        name: s,
        class: ["vts-input__input", a.input]
      };
    },
    listeners() {
      return this.$attrs;
    },
    slots() {
      return this.$slots;
    },
    computedOptions() {
      const { $attrs: e, localValue: s, type: t } = this;
      let l = this.options;
      return W(l, "object") && (l = Object.entries(l).map(([i, n]) => ({
        value: i,
        label: n
      }))), l.map((i) => {
        if (i = W(i, "object") ? i : { value: i }, Object.assign(i, e, {
          label: i.label || i.value,
          value: i.value
        }), t === "checkbox") {
          const n = s || [];
          i.checked = n.includes(i.value) || i.checked;
        } else
          s !== void 0 && typeof s == "string" && (i.checked = i.value === s || i.checked);
        return i;
      });
    },
    isMultiple() {
      const { multiple: e } = this.$attrs;
      return e != null && e != "false";
    },
    error() {
      return !this.valid && this.dirty;
    },
    errorMessages() {
      const { invalid: e, errors: s, $attrs: t } = this, l = [];
      return Object.keys(s || {}).forEach((i) => {
        if (!e[i])
          return;
        const n = s[i], a = W(n, "function") ? n(t[i]) : n;
        l.push(a);
      }), l;
    }
  },
  watch: {
    modelValue: re,
    value: re,
    localValue(e) {
      this.$emit("update:modelValue", e), this.validate();
    }
  },
  created() {
    this.id = this.$attrs.id || "vts-" + B(4);
  },
  mounted() {
    this.validate();
  },
  methods: {
    onSelect(e) {
      const s = e.target;
      if (this.isMultiple) {
        const t = [];
        for (const l of s.selectedOptions)
          t.push(l.value);
        this.localValue = [...t || []];
      } else
        this.localValue = s.value;
    },
    onFieldsetInput(e) {
      const s = e.target, t = s.value;
      if (s.type === "radio") {
        this.localValue = t;
        return;
      }
      const l = [...this.localValue || []], i = l.indexOf(t);
      i === -1 ? l.push(t) : l.splice(i, 1), this.localValue = l;
    },
    validate() {
      let e = this.$refs.input;
      if (Array.isArray(e)) {
        if (!e.length)
          return;
        e = e[0];
      }
      const { validity: s } = e;
      this.anyInvalid = !s.valid, this.valid = s.valid, this.invalid = {
        type: s.typeMismatch,
        required: s.valueMissing,
        minlength: s.tooShort,
        maxlength: s.tooLong,
        min: s.rangeUnderflow,
        max: s.rangeOverflow,
        pattern: s.patternMismatch
      };
    }
  }
}, Bt = ["id", "type"], At = ["for"], xt = ["checked"], jt = ["for"], Nt = ["for"], zt = ["type"], Ut = ["id"], Ht = ["id"];
function Yt(e, s, t, l, i, n) {
  return r(), c("div", {
    class: d([
      "vts-input",
      `vts-input--${t.type}`,
      {
        "vts-input--required": e.$attrs.hasOwnProperty("required"),
        "vts-input--invalid": !i.valid,
        "vts-input--dirty": i.dirty,
        "vts-input--error": n.error
      },
      e.$attrs.class,
      t.classes.root
    ])
  }, [
    ["radio", "checkbox"].includes(t.type) && n.computedOptions.length ? (r(), c("fieldset", {
      key: 0,
      class: d(["vts-input__fieldset", t.classes.fieldset])
    }, [
      t.label ? (r(), c("legend", {
        key: 0,
        class: d(["vts-input__legend", t.classes.legend])
      }, [
        f(e.$slots, "label", m(w({
          valid: i.valid,
          dirty: i.dirty,
          error: n.error,
          invalid: i.invalid,
          anyInvalid: i.anyInvalid,
          errors: n.errorMessages
        })), () => [
          E(S(t.label), 1)
        ])
      ], 2)) : g("", !0),
      h("div", {
        class: d(["vts-input__fieldset-items", t.classes.fieldsetItems])
      }, [
        (r(!0), c(k, null, M(n.computedOptions, (a, o) => (r(), c("div", {
          key: a.value,
          class: d(["vts-input__fieldset-item", t.classes.fieldsetItem])
        }, [
          h("input", b({ ...n.bind, ...a }, {
            id: `${e.id}__input-${o}`,
            ref_for: !0,
            ref: "input",
            type: t.type,
            onInput: s[0] || (s[0] = (...u) => n.onFieldsetInput && n.onFieldsetInput(...u)),
            onBlurOnce: s[1] || (s[1] = (u) => i.dirty = !0)
          }, O(n.listeners, !0)), null, 16, Bt),
          h("label", {
            for: `${e.id}__input-${o}`,
            class: d(["vts-input__label", t.classes.label])
          }, S(a.label), 11, At)
        ], 2))), 128))
      ], 2)
    ], 2)) : t.type === "checkbox" ? (r(), c(k, { key: 1 }, [
      h("input", b({
        ref: "input",
        checked: i.localValue === void 0 ? e.$attrs.checked : i.localValue,
        type: "checkbox"
      }, n.bind, {
        onChange: s[2] || (s[2] = (a) => i.localValue = a.target.checked),
        onBlurOnce: s[3] || (s[3] = (a) => i.dirty = !0)
      }, O(n.listeners, !0)), null, 16, xt),
      h("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, [
        f(e.$slots, "label", m(w({
          valid: i.valid,
          dirty: i.dirty,
          error: n.error,
          invalid: i.invalid,
          anyInvalid: i.anyInvalid,
          errors: n.errorMessages
        })), () => [
          E(S(t.label), 1)
        ])
      ], 10, jt)
    ], 64)) : (r(), c(k, { key: 2 }, [
      h("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, [
        f(e.$slots, "label", m(w({
          valid: i.valid,
          dirty: i.dirty,
          error: n.error,
          invalid: i.invalid,
          anyInvalid: i.anyInvalid,
          errors: n.errorMessages
        })), () => [
          E(S(t.label), 1)
        ])
      ], 10, Nt),
      t.type === "select" ? j((r(), c("select", b({
        key: 0,
        ref: "input",
        "onUpdate:modelValue": s[4] || (s[4] = (a) => i.localValue = a)
      }, n.bind, {
        onInput: s[5] || (s[5] = (...a) => n.onSelect && n.onSelect(...a)),
        onChange: s[6] || (s[6] = (...a) => n.onSelect && n.onSelect(...a)),
        onBlurOnce: s[7] || (s[7] = (a) => i.dirty = !0)
      }, O(n.listeners, !0)), [
        f(e.$slots, "options", {}, () => [
          (r(!0), c(k, null, M(n.computedOptions, (a) => (r(), c("option", b({
            key: a.value
          }, a, { label: null }), S(a.label), 17))), 128))
        ])
      ], 16)), [
        [we, i.localValue]
      ]) : t.type === "textarea" ? j((r(), c("textarea", b({
        key: 1,
        ref: "input",
        "onUpdate:modelValue": s[8] || (s[8] = (a) => i.localValue = a)
      }, n.bind, {
        onBlurOnce: s[9] || (s[9] = (a) => i.dirty = !0)
      }, O(n.listeners, !0)), null, 16)), [
        [Se, i.localValue]
      ]) : j((r(), c("input", b({
        key: 2,
        ref: "input",
        "onUpdate:modelValue": s[10] || (s[10] = (a) => i.localValue = a),
        type: t.type
      }, n.bind, {
        onBlurOnce: s[11] || (s[11] = (a) => i.dirty = !0)
      }, O(n.listeners, !0)), null, 16, zt)), [
        [ke, i.localValue]
      ])
    ], 64)),
    n.slots.description ? (r(), c("div", {
      key: 3,
      id: `${e.id}__description`,
      class: d(["vts-input__description", t.classes.description])
    }, [
      f(e.$slots, "description", m(w({
        valid: i.valid,
        dirty: i.dirty,
        error: n.error,
        invalid: i.invalid,
        anyInvalid: i.anyInvalid,
        errors: n.errorMessages
      })))
    ], 10, Ut)) : g("", !0),
    i.dirty && n.errorMessages.length ? (r(), c("div", {
      key: 4,
      id: `${e.id}__errors`,
      class: d(["vts-input__errors", t.classes.errors])
    }, [
      (r(!0), c(k, null, M(n.errorMessages, (a) => (r(), c("span", {
        key: a,
        class: d(["vts-input__error", t.classes.error])
      }, S(a), 3))), 128))
    ], 10, Ht)) : g("", !0)
  ], 2);
}
const Kt = /* @__PURE__ */ D(Ft, [["render", Yt]]), Wt = {
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
    let e = this.$el;
    e = this.$el.nextElementSibling;
    const { root: s, threshold: t, rootMargin: l, options: i, handler: n } = this, a = {
      ...i,
      root: s,
      threshold: t,
      rootMargin: l
    };
    this.observer = new IntersectionObserver(n, a), this.observer.observe(e);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    handler([e]) {
      this.entry = e, e.isIntersecting ? this.$emit("enter", e) : this.$emit("exit", e), this.$emit("change", e);
    }
  },
  render() {
    const { entry: e } = this;
    return this.$slots.default(e);
  }
};
const qt = {
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
      default: !0
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
      handler(e, s) {
        typeof window < "u" && (e && e != s ? (this.noScroll && document.body.style.setProperty("overflow", "hidden"), this.$nextTick(() => {
          this.$refs.content.focus();
        })) : this.noScroll && document.body.style.removeProperty("overflow"));
      }
    }
  },
  mounted() {
    console.warn(
      "Vuetensil's VModal is deprecated. Please use VDialog instead."
    );
  },
  methods: {
    show() {
      this.$emit("show"), this.$emit("change", !0);
    },
    hide() {
      this.$emit("hide"), this.$emit("change", !1);
    },
    toggle() {
      const { showing: e } = this, s = e ? "hide" : "show";
      this.$emit(s, !e), this.$emit("change", !e);
    },
    onClick(e) {
      e.target.classList.contains("vts-modal") && this.dismissible && this.hide();
    },
    onKeydown(e) {
      if (e.keyCode === v.ESC && this.hide(), e.keyCode === v.TAB) {
        const s = this.$refs.content;
        if (!s)
          return;
        const t = Array.from(s.querySelectorAll(H));
        if (!t.length) {
          e.preventDefault();
          return;
        }
        if (!s.contains(document.activeElement))
          e.preventDefault(), t[0].focus();
        else {
          const l = t.indexOf(document.activeElement);
          e.shiftKey && l === 0 && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && l === t.length - 1 && (t[0].focus(), e.preventDefault());
        }
      }
    }
  }
};
function Rt(e, s, t, l, i, n) {
  return r(), I(P, { name: t.bgTransition }, {
    default: V(() => [
      t.showing ? (r(), c("div", {
        key: 0,
        class: d(["vts-modal", t.classes.root]),
        onClick: s[0] || (s[0] = (...a) => n.onClick && n.onClick(...a)),
        onKeydown: s[1] || (s[1] = (...a) => n.onKeydown && n.onKeydown(...a))
      }, [
        T(P, {
          name: t.transition,
          appear: ""
        }, {
          default: V(() => [
            (r(), I(F(t.tag), {
              ref: "content",
              style: U({ width: t.width, maxWidth: t.maxWidth }),
              class: d(["vts-modal__content", t.classes.content]),
              tabindex: "-1",
              role: "dialog"
            }, {
              default: V(() => [
                f(e.$slots, "default")
              ]),
              _: 3
            }, 8, ["style", "class"]))
          ]),
          _: 3
        }, 8, ["name"])
      ], 34)) : g("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const Gt = /* @__PURE__ */ D(qt, [["render", Rt]]), $t = {
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
    this.observer = new ResizeObserver(this.updateDimensions), this.observer.observe(this.$el);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    updateDimensions() {
      const e = this.$el;
      this.width = e.offsetWidth, this.height = e.offsetHeight, this.$emit("resize", arguments);
    }
  }
};
function Jt(e, s, t, l, i, n) {
  return r(), I(F(t.tag), { class: "vts-resize" }, {
    default: V(() => [
      f(e.$slots, "default", m(w({ width: e.width, height: e.height, inlineSize: e.width, blockSize: e.height })))
    ]),
    _: 3
  });
}
const Xt = /* @__PURE__ */ D($t, [["render", Jt]]);
const Qt = {
  name: "VSkip",
  props: {
    to: {
      type: String,
      required: !0
    }
  },
  methods: {
    skipTo(e) {
      if (!e)
        return;
      const s = window.document.getElementById(e.slice(1));
      s && (["a", "select", "input", "button", "textarea"].includes(
        s.tagName.toLowerCase()
      ) || s.setAttribute("tabindex", "-1"), s.focus());
    }
  }
}, Zt = ["href"];
function es(e, s, t, l, i, n) {
  return r(), c("a", {
    class: "vts-skip",
    href: t.to,
    onClick: s[0] || (s[0] = (a) => n.skipTo(t.to))
  }, [
    f(e.$slots, "default", {}, () => [
      E("Skip to main content")
    ])
  ], 8, Zt);
}
const ts = /* @__PURE__ */ D(Qt, [["render", es]]);
const ss = {
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
      validator: (e) => (/* @__PURE__ */ new Set(["ASC", "DESC", ""])).has(e.toUpperCase())
    },
    id: {
      type: String,
      default: "vts-" + B(4)
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
      const { headers: e, sortable: s, localSortBy: t, localSortDirection: l } = this, i = [];
      return e.forEach((n) => {
        const a = {
          ...n,
          bind: {},
          sortBtn: {
            bind: { "aria-label": "toggle sort direction" },
            on: { click: () => this.onSort(n.key) }
          }
        };
        a.sortable === void 0 && (a.sortable = !!a.sort || s), a.sortable && t === n.key && l && (l === "ASC" ? a.bind["aria-sort"] = "ascending" : a.bind["aria-sort"] = "descending"), i.push(a);
      }), i;
    },
    computedItems() {
      const {
        computedHeaders: e,
        items: s,
        localSortBy: t,
        localSortDirection: l,
        localPage: i,
        localPerPage: n
      } = this;
      let a = [...s];
      if (t && l) {
        const o = e.find((y) => y.key === t);
        let u = this.defaultComparisonFn;
        typeof o.sort == "function" && (u = o.sort), a = a.sort((y, p) => u(y, p, l === "ASC"));
      }
      if (n > -1) {
        const o = (Math.max(i, 1) - 1) * n;
        a = a.slice(o, o + n);
      }
      return a;
    },
    lastPage() {
      return Math.ceil(this.items.length / +this.perPage);
    }
  },
  watch: {
    sortBy(e) {
      this.localSortBy = e;
    },
    localSortBy(e) {
      this.$emit("update:sort-by", e);
    },
    sortDirection(e) {
      this.localSortDirection = e && e.toUpperCase() || "";
    },
    localSortDirection(e) {
      this.$emit("update:sort-direction", e);
    },
    page(e) {
      this.localPage = Number(e);
    },
    localPage(e) {
      this.$emit("update:page", e);
    },
    perPage(e) {
      this.localPerPage = Number(e);
    },
    localPerPage(e) {
      this.$emit("update:per-page", e);
    }
  },
  methods: {
    defaultComparisonFn(e, s, t) {
      const { localSortBy: l } = this, i = t ? 1 : -1, n = e[l], a = s[l];
      return Number.isFinite(n) && Number.isFinite(a) ? (n - a) * i : n < a ? -1 * i : n > a ? 1 * i : 0;
    },
    onSort(e) {
      const { localSortBy: s, localSortDirection: t } = this;
      if (this.localPage = 1, e !== s) {
        this.localSortBy = e, this.localSortDirection = "ASC";
        return;
      }
      switch (t) {
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
    goToPage(e) {
      const { lastPage: s } = this;
      this.localPage = Math.min(Math.max(1, e), s);
    }
  }
}, ns = ["id"], is = ["disabled"], as = ["disabled", "aria-label", "onClick"], ls = ["disabled"];
function os(e, s, t, l, i, n) {
  return r(), c("div", {
    ref: "container",
    role: "region",
    "aria-labelledby": "caption",
    class: d(["vts-table", { "vts-table--sortable": t.sortable }, t.classes.root])
  }, [
    h("table", {
      class: d([t.classes.table])
    }, [
      f(e.$slots, "default", m(w({
        caption: t.caption,
        headers: n.computedHeaders,
        items: n.computedItems,
        sortBy: i.localSortBy,
        sortDirection: i.localSortDirection,
        page: i.localPage,
        perPage: i.localPerPage
      })), () => [
        t.caption ? (r(), c("caption", {
          key: 0,
          id: `${t.id}__caption`,
          class: d([t.classes.caption])
        }, S(t.caption), 11, ns)) : g("", !0),
        n.computedHeaders.length ? (r(), c("thead", {
          key: 1,
          class: d([t.classes.thead])
        }, [
          h("tr", {
            class: d([t.classes.tr])
          }, [
            (r(!0), c(k, null, M(n.computedHeaders, (a, o) => (r(), c("th", b({
              key: a.key
            }, a.bind, {
              class: [t.classes.th]
            }), [
              f(e.$slots, `header.${a.key}`, m(w({
                header: a,
                index: o
              })), () => [
                E(S(a.text || a.key) + " ", 1),
                a.sortable ? (r(), c(k, { key: 0 }, [
                  a.key === i.localSortBy && i.localSortDirection === "ASC" ? f(e.$slots, "sort-asc", m(b({ key: 0 }, a.sortBtn)), () => [
                    h("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--asc",
                        t.classes.sortBtn
                      ]
                    }, a.sortBtn.bind, { type: "button" }, O(a.sortBtn.on, !0)), " ↑ ", 16)
                  ]) : a.key === i.localSortBy && i.localSortDirection === "DESC" ? f(e.$slots, "sort-desc", m(b({ key: 1 }, a.sortBtn)), () => [
                    h("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--desc",
                        t.classes.sortBtn
                      ]
                    }, a.sortBtn.bind, { type: "button" }, O(a.sortBtn.on, !0)), " ↓ ", 16)
                  ]) : f(e.$slots, "sort-none", m(b({ key: 2 }, a.sortBtn)), () => [
                    h("button", b({
                      class: ["vts-table__sort-btn", t.classes.sortBtn]
                    }, a.sortBtn.bind, { type: "button" }, O(a.sortBtn.on, !0)), " ↕ ", 16)
                  ])
                ], 64)) : g("", !0)
              ])
            ], 16))), 128))
          ], 2)
        ], 2)) : g("", !0),
        h("tbody", {
          class: d([t.classes.tbody])
        }, [
          f(e.$slots, "body", m(w({
            items: n.computedItems,
            sortBy: i.localSortBy,
            sortDirection: i.localSortDirection,
            page: i.localPage,
            perPage: i.localPerPage
          })), () => [
            (r(!0), c(k, null, M(n.computedItems, (a, o) => (r(), c("tr", {
              key: a.id,
              class: d(["vts-table__row", t.classes.tr])
            }, [
              f(e.$slots, "row", m(w({ item: a, index: o, row: o + 1 })), () => [
                (r(!0), c(k, null, M(n.computedHeaders, (u) => (r(), c("td", {
                  key: u.key,
                  class: d([t.classes.td])
                }, [
                  f(e.$slots, `column.${u.key}`, m(w({
                    item: a,
                    index: (i.localPage - 1) * i.localPerPage + o,
                    row: o + 1,
                    key: u.key,
                    column: u.key,
                    value: a[u.key],
                    cell: a[u.key],
                    data: a[u.key]
                  })), () => [
                    E(S(a[u.key]), 1)
                  ])
                ], 2))), 128))
              ])
            ], 2))), 128))
          ])
        ], 2),
        e.$slots.tfoot ? (r(), c("tfoot", {
          key: 2,
          class: d([t.classes.tfoot])
        }, [
          f(e.$slots, "tfoot")
        ], 2)) : g("", !0)
      ])
    ], 2),
    f(e.$slots, "pagination", m(w({ page: i.localPage, perPage: i.localPerPage, lastPage: n.lastPage, goToPage: n.goToPage })), () => [
      n.lastPage > 1 ? (r(), c("div", {
        key: 0,
        class: d(["vts-table__pagination", t.classes.pagination])
      }, [
        h("button", {
          disabled: i.localPage === 1,
          "aria-label": "go to previous page",
          class: d(["vts-table__prev", t.classes.previous]),
          type: "button",
          onClick: s[0] || (s[0] = (a) => n.goToPage(i.localPage - 1))
        }, " Prev ", 10, is),
        h("ul", {
          class: d(["vts-table__pages", t.classes.pageList])
        }, [
          (r(!0), c(k, null, M(n.lastPage, (a) => (r(), c("li", {
            key: a,
            class: d([
              "vts-table__page-item",
              { "vts-table__page-item--current": a === i.localPage },
              t.classes.pageItem
            ])
          }, [
            h("button", {
              disabled: a === i.localPage,
              "aria-label": `go to page ${a}`,
              class: d([
                "vts-table__page",
                { "vts-table__page--current": a === i.localPage },
                t.classes.page
              ]),
              type: "button",
              onClick: (o) => n.goToPage(a)
            }, S(a), 11, as)
          ], 2))), 128))
        ], 2),
        h("button", {
          disabled: i.localPage === n.lastPage,
          "aria-label": "go to next page",
          class: d(["vts-table__next", t.classes.next]),
          type: "button",
          onClick: s[1] || (s[1] = (a) => n.goToPage(i.localPage + 1))
        }, " Next ", 10, ls)
      ], 2)) : g("", !0)
    ])
  ], 2);
}
const rs = /* @__PURE__ */ D(ss, [["render", os]]), ds = {
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
      return Object.keys(this.$slots).filter((e) => e.startsWith("tab-"));
    },
    panelList() {
      return Object.keys(this.$slots).filter(
        (e) => e.startsWith("panel-")
      );
    }
  },
  watch: {
    active(e) {
      this.activeIndex = Math.max(0, Math.min(this.tabList.length - 1, e));
    },
    activeIndex(e) {
      this.$emit("change", e);
    }
  },
  created() {
    this.id = this.$attrs.id || `vts-${B(4)}`;
  },
  methods: {
    onClick(e, s, t) {
      this.activeIndex !== t && this.$nextTick(() => this.$emit("tabChange", { event: e, tab: s, index: t })), this.activeIndex = t;
    },
    onKeydown(e) {
      const { keyCode: s } = e, t = this.activeIndex;
      switch (s) {
        case v.END:
          e.preventDefault(), this.activeIndex = this.tabList.length - 1, this.setFocus();
          break;
        case v.HOME:
          e.preventDefault(), this.activeIndex = 0, this.setFocus();
          break;
        case v.LEFT:
        case v.RIGHT:
        case v.UP:
        case v.DOWN:
          this.determineOrientation(e);
          break;
      }
      t !== this.activeIndex && this.$nextTick(
        () => this.$emit("tabChange", {
          event: e,
          tab: this.tablist[this.activeIndex],
          index: this.activeIndex
        })
      );
    },
    determineOrientation(e) {
      const s = e.keyCode;
      let t = !1;
      this.orientation === "vertical" ? (s === v.UP || s === v.DOWN) && (e.preventDefault(), t = !0) : (s === v.LEFT || s === v.RIGHT) && (e.preventDefault(), t = !0), t && (this.switchTabOnArrowPress(e), this.setFocus());
    },
    switchTabOnArrowPress(e) {
      const s = e.keyCode, t = {
        [v.LEFT]: -1,
        [v.UP]: -1,
        [v.RIGHT]: 1,
        [v.DOWN]: 1
      };
      if (!t[s])
        return;
      const l = this.activeIndex, i = this.tabList.length, n = l + t[s];
      n < 0 ? this.activeIndex = i - 1 : n >= i ? this.activeIndex = 0 : this.activeIndex = n;
    },
    setFocus() {
      const { $refs: e, tabList: s, activeIndex: t } = this, l = s[t];
      return e[l][0].focus();
    }
  }
}, cs = ["aria-label", "aria-orientation"], us = ["id", "aria-selected", "tabindex", "aria-controls", "onClick"], hs = ["id", "aria-labelledby", "hidden"];
function fs(e, s, t, l, i, n) {
  return r(), c("div", {
    class: d(["vts-tabs", t.classes.root])
  }, [
    h("div", {
      role: "tablist",
      "aria-label": t.label,
      "aria-orientation": t.orientation,
      class: d(["vts-tabs__tablist", t.classes.tablist])
    }, [
      (r(!0), c(k, null, M(n.tabList, (a, o) => (r(), c("button", {
        id: `${e.id}-${a}`,
        key: a,
        ref_for: !0,
        ref: a,
        "aria-selected": o === i.activeIndex,
        tabindex: o === i.activeIndex ? null : -1,
        "aria-controls": `${e.id}-${a.replace("tab", "panel")}`,
        class: d([
          `vts-tabs__tab vts-tabs__tab--${a} vts-tabs__tab--${o}`,
          {
            "vts-tabs__tab--active": o === i.activeIndex,
            [t.classes.tabActive]: o === i.activeIndex
          },
          t.classes.tab
        ]),
        role: "tab",
        type: "button",
        onKeydown: s[0] || (s[0] = (...u) => n.onKeydown && n.onKeydown(...u)),
        onClick: (u) => n.onClick(u, a, o)
      }, [
        f(e.$slots, a)
      ], 42, us))), 128))
    ], 10, cs),
    (r(!0), c(k, null, M(n.panelList, (a, o) => (r(), c("div", {
      id: `${e.id}-panel-${o}`,
      key: a,
      "aria-labelledby": `${e.id}-tab-${o}`,
      hidden: o !== i.activeIndex,
      class: d([
        `vts-tabs__panel vts-tabs__panel--${o}`,
        {
          "vts-tabs__panel--active": o === i.activeIndex,
          [t.classes.panelActive]: o === i.activeIndex
        },
        t.classes.panel
      ]),
      tabindex: "0",
      role: "tabpanel"
    }, [
      f(e.$slots, a)
    ], 10, hs))), 128))
  ], 2);
}
const vs = /* @__PURE__ */ D(ds, [["render", fs]]);
const ys = {
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
      return this.$attrs;
    }
  },
  watch: {
    open(e) {
      this.isOpen = e;
    },
    isOpen(e) {
      typeof window > "u" || (this.$emit("update", e), this.$emit(e ? "open" : "close"));
    }
  },
  created() {
    const { id: e } = this.$attrs;
    this.id = e || `vts-${B(4)}`;
  },
  methods: {
    collapse(e) {
      e.style.blockSize = "0";
    },
    expand(e) {
      e.style.overflow = "hidden", e.style.blockSize = `${e.scrollHeight}px`, e.scrollHeight;
    },
    resetHeight(e) {
      e.style.overflow = "visible", e.style.blockSize = "";
    }
  }
}, ms = ["id", "disabled", "aria-controls", "aria-expanded"], bs = ["id", "aria-labelledby", "aria-hidden"];
function gs(e, s, t, l, i, n) {
  return r(), c("div", {
    class: d(["vts-toggle", { "vts-toggle--open": i.isOpen }, t.classes.root])
  }, [
    h("button", b({
      id: `${e.id}-label`,
      ref: "label",
      type: "button",
      disabled: t.disabled,
      "aria-controls": `${e.id}-content`,
      "aria-expanded": i.isOpen,
      class: ["vts-toggle__label", t.classes.label],
      onClick: s[0] || (s[0] = (a) => i.isOpen = !i.isOpen)
    }, O(n.listeners, !0)), [
      E(S(t.label) + " ", 1),
      f(e.$slots, "label", m(w({ isOpen: i.isOpen })))
    ], 16, ms),
    T(P, {
      onBeforeEnter: n.collapse,
      onEnter: n.expand,
      onAfterEnter: n.resetHeight,
      onBeforeLeave: n.expand,
      onLeave: n.collapse
    }, {
      default: V(() => [
        j(h("div", {
          id: `${e.id}-content`,
          "aria-labelledby": `${e.id}-label`,
          "aria-hidden": !i.isOpen,
          role: "region",
          class: d(["vts-toggle__content", t.classes.content])
        }, [
          f(e.$slots, "default", m(w({ isOpen: i.isOpen })))
        ], 10, bs), [
          [de, i.isOpen && !t.disabled]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])
  ], 2);
}
const ps = /* @__PURE__ */ D(ys, [["render", gs]]);
const _s = {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    id: {
      type: String,
      default: () => `vts-${B(4)}`
    },
    focus: Boolean,
    classes: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    show: !1
  }),
  methods: {
    onMouseenter() {
      this.focus || (this.show = !0);
    },
    onMouseleave() {
      this.focus || (this.show = !1);
    }
  }
}, ws = ["id", "aria-hidden"];
function Ss(e, s, t, l, i, n) {
  return r(), I(F(t.tag), {
    id: t.id,
    tabindex: "0",
    "aria-describedby": `${t.id}__content`,
    class: d(["vts-tooltip", t.classes.toggle]),
    onFocus: s[0] || (s[0] = (a) => e.show = !0),
    onBlur: s[1] || (s[1] = (a) => e.show = !1),
    onMouseenter: n.onMouseenter,
    onMouseleave: n.onMouseleave
  }, {
    default: V(() => [
      f(e.$slots, "default"),
      h("span", {
        id: `${t.id}__content`,
        role: "tooltip",
        "aria-hidden": !e.show,
        class: d([
          "vts-tooltip__content",
          {
            "vts-tooltip__content--visible": e.show
          },
          t.classes.content
        ])
      }, [
        f(e.$slots, "tooltip")
      ], 10, ws)
    ]),
    _: 3
  }, 40, ["id", "aria-describedby", "class", "onMouseenter", "onMouseleave"]);
}
const ks = /* @__PURE__ */ D(_s, [["render", Ss]]), Ds = {
  name: "VTry",
  props: {
    propagate: Boolean
  },
  data: () => ({
    error: null
  }),
  errorCaptured(e) {
    return this.error = e, this.$emit("catch", e), this.propagate;
  },
  render() {
    const { error: e, $slots: s } = this;
    let t = s;
    return e && t.catch ? t.catch(e) : t.default(e);
  }
}, ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert: Ce,
  VAsync: Ie,
  VBtn: Be,
  VDate: st,
  VDialog: lt,
  VDrawer: ut,
  VDropdown: yt,
  VFile: St,
  VForm: Ot,
  VImg: Tt,
  VInput: Kt,
  VIntersect: Wt,
  VModal: Gt,
  VResize: Xt,
  VSkip: ts,
  VTable: rs,
  VTabs: vs,
  VToggle: ps,
  VTooltip: ks,
  VTry: Ds
}, Symbol.toStringTag, { value: "Module" })), Es = (e) => e[0].toUpperCase() + e.slice(1);
function Vs(e, s, t = navigator.language) {
  return new Intl.NumberFormat(t, {
    style: "currency",
    currency: s
  }).format(e);
}
function Os(e, s = navigator.language) {
  return new Intl.NumberFormat(s).format(e);
}
const Ms = (e, s) => e || s;
function Cs(e, s, t) {
  return t !== 1 ? s : e;
}
function Is(e, s = 100, t = "...") {
  return e.length > s ? e.substring(0, s - t.length) + t : e;
}
const ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Es,
  currency: Vs,
  number: Os,
  placeholder: Ms,
  plural: Cs,
  truncate: Is
}, Symbol.toStringTag, { value: "Module" }));
function Ts(e, s = {}) {
  const t = ce({
    pending: !1,
    results: s.placeholder || null,
    error: null
  }), l = async function(n) {
    if (n = typeof n == "function" ? n() : n, !(!n || !n.then)) {
      t.pending = !0, s.onChange && s.onChange({
        pending: t.pending,
        results: t.results,
        error: t.error
      }), s.onPending && s.onPending(t.pending);
      try {
        const a = await n;
        a !== void 0 ? t.results = a : s.default !== void 0 ? t.results = s.default : t.results = null, s.onResolve && s.onResolve(t.results);
      } catch (a) {
        a instanceof Error ? t.error = {
          name: a.name,
          message: a.message
        } : t.error = a, console.error(a), s.onReject && s.onReject(t.error);
      } finally {
        t.pending = !1, s.onChange && s.onChange({
          pending: t.pending,
          results: t.results,
          error: t.error
        }), s.onPending && s.onPending(t.pending);
      }
    }
  };
  return e && l(e), Object.assign(t, { watch: l });
}
const Fs = (e, s = {}) => {
  const l = ce({
    invalid: !1,
    dirty: !1,
    error: !1,
    inputs: {}
  }), i = new Map(Object.entries(s.errors || {})), n = async (y) => {
    if (!y)
      return;
    await $(), l.invalid = !y.checkValidity();
    const p = y.querySelectorAll("input, textarea, select"), _ = {};
    p.forEach((C) => {
      const { name: A, id: me, validity: L } = C, N = A || me;
      if (!N)
        return;
      const z = {
        value: C.value,
        valid: L.valid,
        dirty: !1,
        invalid: {
          type: L.typeMismatch,
          required: L.valueMissing,
          minlength: L.tooShort,
          maxlength: L.tooLong,
          min: L.rangeOverflow,
          max: L.rangeUnderflow,
          pattern: L.patternMismatch
        },
        errors: []
      };
      i.forEach((Ps, Y) => {
        if (!z.invalid[Y])
          return;
        const K = i.get(Y), be = Y.replace("length", "Length"), ge = typeof K == "string" ? K : K(C[be]);
        z.errors.push(ge);
      }), z.dirty = l.inputs[N] ? l.inputs[N].dirty : !1, _[N] = z;
    }), l.inputs = _;
  }, a = () => n(e.value), o = (y) => {
    n(e.value);
    const p = y.target, _ = p.name || p.id;
    l.dirty = !0, _ && l.inputs[_] && (l.inputs[_].dirty = !0);
  }, u = new MutationObserver(a);
  return De(e, async (y, p, _) => {
    y && (await $(), n(y), y.addEventListener("input", a), y.addEventListener("blur", o, {
      capture: !0
    }), u.observe(y, {
      childList: !0,
      subtree: !0
    }), _(() => {
      y.removeEventListener("input", a), y.removeEventListener("blur", o), u.disconnect();
    }));
  }), l.error = Ee(() => l.invalid && l.dirty), l.validate = () => n(e.value), l.reset = () => {
    l.dirty = !1, n(e.value);
  }, l.clear = () => {
    e.value.querySelectorAll("input, textarea, select").forEach((_) => {
      _.value = "";
    });
  }, l;
}, Bs = ve, As = fe, xs = ye, js = {
  install(e, s = {}) {
    s.components && (Array.isArray(s.components) && (s.components = s.components.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.components).forEach((t) => {
      const [l, i] = t, n = ve[l], a = typeof i == "boolean" && i.name || l;
      e.component(a, n);
    })), s.directives && (Array.isArray(s.directives) && (s.directives = s.directives.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.directives).forEach((t) => {
      const [l] = t, i = fe[l];
      e.directive(l, i);
    })), s.filters && (Array.isArray(s.filters) && (s.filters = s.filters.reduce((t, l) => (t[l] = !0, t), {})), Object.entries(s.filters).forEach((t) => {
      const [l] = t, i = ye[l];
      e.filter(l, i);
    }));
  }
};
export {
  Ce as VAlert,
  Ie as VAsync,
  Be as VBtn,
  st as VDate,
  lt as VDialog,
  ut as VDrawer,
  yt as VDropdown,
  St as VFile,
  Ot as VForm,
  Tt as VImg,
  Kt as VInput,
  Wt as VIntersect,
  Gt as VModal,
  Xt as VResize,
  ts as VSkip,
  rs as VTable,
  vs as VTabs,
  ps as VToggle,
  ks as VTooltip,
  Ds as VTry,
  Ae as autofocus,
  Es as capitalize,
  ue as clickout,
  Bs as components,
  xe as copy,
  Vs as currency,
  js as default,
  As as directives,
  xs as filters,
  je as focusout,
  Ne as intersect,
  Os as number,
  Ms as placeholder,
  Cs as plural,
  Is as truncate,
  Ts as useAsync,
  Fs as useForm
};
