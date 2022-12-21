import { openBlock as r, createBlock as P, Transition as I, withCtx as D, resolveDynamicComponent as B, normalizeClass as d, renderSlot as f, createElementBlock as c, createTextVNode as O, createCommentVNode as m, withModifiers as x, Fragment as S, renderList as M, createElementVNode as h, mergeProps as b, toHandlers as V, resolveDirective as ce, withDirectives as j, normalizeProps as _, guardReactiveProps as E, withKeys as R, toDisplayString as w, vShow as te, createVNode as T, normalizeStyle as U, toHandlerKey as ue, vModelSelect as he, vModelText as fe, vModelDynamic as ve, reactive as se, watch as ye, nextTick as $, computed as be } from "vue";
const k = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [l, a] of s)
    t[l] = a;
  return t;
}, me = {
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
}, ge = ["aria-label"];
function pe(e, s, t, l, a, n) {
  return r(), P(I, { name: t.transition }, {
    default: D(() => [
      !e.dismissed && t.modelValue ? (r(), P(B(t.tag), {
        key: 0,
        role: "alert",
        class: d(["vts-alert", t.classes.root])
      }, {
        default: D(() => [
          f(e.$slots, "default"),
          t.dismissible ? (r(), c("button", {
            key: 0,
            "aria-label": t.dismissLabel,
            class: d(["vts-alert__dismiss", t.classes.dismiss]),
            type: "button",
            onClick: s[0] || (s[0] = (...i) => n.dismiss && n.dismiss(...i))
          }, [
            f(e.$slots, "dismiss", {}, () => [
              O("×")
            ])
          ], 10, ge)) : m("", !0)
        ]),
        _: 3
      }, 8, ["class"])) : m("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const _e = /* @__PURE__ */ k(me, [["render", pe]]), we = {
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
    let a = this.$slots;
    const n = a.pending, i = a.rejected, o = a.resolved, u = a.default;
    if (e && n)
      return n();
    if (l && s && i)
      return i(s);
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
const Se = {
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
}, ke = ["action"], De = ["value", "name"];
function Ee(e, s, t, l, a, n) {
  return t.action && t.data ? (r(), c("form", {
    key: 0,
    action: t.action,
    method: "POST",
    class: "vts-btn__form",
    onSubmit: s[0] || (s[0] = x((i) => e.$emit("submit", i), ["prevent"]))
  }, [
    (r(!0), c(S, null, M(t.data, (i, o) => (r(), c("input", {
      key: o,
      value: i,
      name: String(o),
      type: "hidden",
      hidden: "",
      autocomplete: "off",
      "aria-hidden": "true",
      tabindex: "-1"
    }, null, 8, De))), 128)),
    h("button", b({ type: "submit" }, e.$attrs, { class: "vts-btn" }, V(n.listeners, !0)), [
      f(e.$slots, "default")
    ], 16)
  ], 40, ke)) : (r(), P(B(n.tag), b({
    key: 1,
    class: "vts-btn",
    type: n.type
  }, e.$attrs, V(n.listeners)), {
    default: D(() => [
      f(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["type"]));
}
const Ve = /* @__PURE__ */ k(Se, [["render", Ee]]), v = Object.freeze({
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
}), Oe = {
  inserted: (e) => e.focus()
}, ne = {
  bind(e, s) {
    e._vtsClickout = {
      stop: (t) => t.stopPropagation()
    }, document.body.addEventListener("click", s.value), e.addEventListener("click", e._vtsClickout.stop);
  },
  unbind(e, s) {
    document.body.removeEventListener("click", s.value), e.removeEventListener("click", e._vtsClickout.stop);
  }
};
function G(e) {
  const s = document.activeElement, t = document.createElement("textarea");
  t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", t.style.fontSize = "12pt", document.body.append(t), t.select(), document.execCommand("copy"), t.remove(), s && s.focus();
}
const Me = {
  bind(e, s) {
    e._vtsCopy = () => G(s.value), e.addEventListener("click", e._vtsCopy);
  },
  update(e, s) {
    e.removeEventListener("click", e._vtsCopy), e._vtsCopy = () => G(s.value), e.addEventListener("click", e._vtsCopy);
  },
  unbind(e) {
    e.removeEventListener("click", e._vtsCopy);
  }
};
function J(e) {
  e._vtsIntersect && (e._vtsIntersect.unobserve(e), delete e._vtsIntersect);
}
const Ce = {
  inserted: (e, { value: s, modifiers: t }) => {
    const l = {
      ...s
    }, { enter: a, exit: n, once: i } = t;
    l.root && (l.root = typeof l.root == "string" ? document.querySelector(l.root) : l.root);
    const o = { ...s };
    s instanceof Function && (a && (o.onEnter = s), n && (o.onExit = s), !a && !n && (o.onChange = s));
    const u = new IntersectionObserver(([y]) => {
      const g = Array.isArray(l.threshold), p = {};
      for (const C in y)
        p[C] = y[C];
      p.isIntersecting = g ? l.threshold.includes(y.intersectionRatio) : y.intersectionRatio === l.threshold, p.isIntersecting ? o.onEnter && o.onEnter(p, e) : o.onExit && o.onExit(p, e), o.onChange && o.onChange(p, e), i && J(e);
    }, l);
    u.observe(e), e._vtsIntersect = u;
  },
  unbind: J
}, ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autofocus: Oe,
  clickout: ne,
  copy: Me,
  intersect: Ce
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
function F(e = 10, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let t = "";
  for (let l = 0; l < e; l++)
    t += s.charAt(Math.floor(Math.random() * s.length));
  return t;
}
function W(e, s) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() === s.toLowerCase();
}
function Pe(e, s) {
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
function X(e, s) {
  return e.getFullYear() === s.getFullYear() && e.getMonth() === s.getMonth() && e.getDate() === s.getDate();
}
const Ie = [
  v.UP,
  v.DOWN,
  v.LEFT,
  v.RIGHT,
  v.PAGEUP,
  v.PAGEDOWN,
  v.HOME,
  v.END
], Le = {
  name: "VDate",
  directives: {
    clickout: ne
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
      default: () => `vts-${F(4)}`
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
      const { focusedDate: e, min: s, max: t } = this, l = {}, a = new Date(s), n = new Date(t);
      return s && (l.prevYear = e.getFullYear() <= a.getFullYear(), l.prevMonth = e.getMonth() <= a.getMonth()), t && (l.nextYear = e.getFullYear() >= n.getFullYear(), l.nextMonth = e.getMonth() >= n.getMonth()), l;
    },
    daysByWeeks() {
      const { focusedDate: e, selectedDate: s, min: t, max: l } = this, a = new Date(
        e.getFullYear(),
        e.getMonth(),
        1
      ), n = a.getDay();
      a.setDate(a.getDate() - n);
      const i = new Date(
        e.getFullYear(),
        e.getMonth() + 1,
        0
      ).getDate(), o = new Date(a), u = n + i < 36 ? 5 : 6, y = [];
      for (let g = 0; g < u; g++) {
        y.push([]);
        for (let p = 0; p < 7; p++) {
          const C = new Date(o);
          let A = !1;
          t && (A = C < new Date(t)), l && !A && (A = C > new Date(l)), y[g].push({
            date: C,
            isFocused: X(C, e),
            isSelected: X(C, s),
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
      if (!e.target.classList.contains("vts-date__day") || !Ie.includes(e.keyCode))
        return;
      e.stopPropagation(), e.preventDefault();
      const { focusedDate: s, min: t, max: l } = this, a = new Date(s);
      switch (e.keyCode) {
        case v.ENTER:
        case v.SPACE:
          this.selectedDate = a;
          return;
        case v.RIGHT:
          a.setDate(a.getDate() + 1);
          break;
        case v.LEFT:
          a.setDate(a.getDate() - 1);
          break;
        case v.DOWN:
          a.setDate(a.getDate() + 7);
          break;
        case v.UP:
          a.setDate(a.getDate() - 7);
          break;
        case v.PAGEUP:
          e.shiftKey ? a.setFullYear(s.getFullYear() - 1) : a.setMonth(s.getMonth() - 1);
          break;
        case v.PAGEDOWN:
          e.shiftKey ? a.setFullYear(s.getFullYear() + 1) : a.setMonth(s.getMonth() + 1);
          break;
        case v.HOME:
          a.setDate(a.getDate() - a.getDay());
          break;
        case v.END:
          a.setDate(a.getDate() + (6 - a.getDay()));
          break;
      }
      const n = t && new Date(t), i = l && new Date(l);
      n && a < n || i && a > i || (this.focusedDate = a, this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      }));
    },
    onTab(e) {
      Pe(this.$refs.calendar, e);
    },
    onClickout(e) {
      const { show: s } = this;
      e.preventDefault(), s && (this.show = !1);
    }
  }
}, Te = ["id"], Be = ["aria-label"], Fe = ["aria-labelledby"], Ae = { class: "vts-date__navigation" }, xe = ["aria-label", "disabled"], je = ["aria-label", "disabled"], Ne = ["id"], ze = ["aria-label", "disabled"], Ue = ["aria-label", "disabled"], He = ["aria-labelledby"], Ye = ["abbr"], Ke = ["tabindex", "aria-selected", "value", "disabled"];
function We(e, s, t, l, a, n) {
  const i = ce("clickout");
  return j((r(), c("div", {
    id: t.id,
    class: d(["vtd-date", t.classes.root])
  }, [
    f(e.$slots, "default", _(E(n.toggle)), () => [
      h("button", b(n.toggle.bind, {
        type: "button",
        class: ["vtd-date__toggle", t.classes.toggle]
      }, V(n.toggle.on, !0)), [
        h("span", {
          role: "img",
          "aria-label": t.buttonLabels.showCalendar
        }, " 📅 ", 8, Be)
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
        s[6] || (s[6] = R((...o) => n.onTab && n.onTab(...o), ["tab"])),
        s[7] || (s[7] = R((o) => a.show = !1, ["esc"]))
      ]
    }, [
      h("div", Ae, [
        h("button", {
          class: d(["vtd-date__prev-year", t.classes.prevYear]),
          "aria-label": t.buttonLabels.previousYear,
          type: "button",
          disabled: n.disableNav.prevYear,
          onClick: s[0] || (s[0] = (o) => n.incrementYearBy(-1))
        }, [
          f(e.$slots, "prevYearLabel", {}, () => [
            O("↞")
          ])
        ], 10, xe),
        h("button", {
          class: d(["vtd-date__prev-month", t.classes.prevMonth]),
          "aria-label": t.buttonLabels.previousMonth,
          type: "button",
          disabled: n.disableNav.prevMonth,
          onClick: s[1] || (s[1] = (o) => n.incrementMonthBy(-1))
        }, [
          f(e.$slots, "prevMonthLabel", {}, () => [
            O("←")
          ])
        ], 10, je),
        h("h4", {
          id: `${t.id}-dialog-label`,
          class: d(["vtd-date__title", t.classes.title]),
          "aria-live": "polite"
        }, w(n.monthYear), 11, Ne),
        h("button", {
          class: d(["vtd-date__next-month", t.classes.nextMonth]),
          "aria-label": t.buttonLabels.nextMonth,
          type: "button",
          disabled: n.disableNav.nextMonth,
          onClick: s[2] || (s[2] = (o) => n.incrementMonthBy(1))
        }, [
          f(e.$slots, "nextMonthLabel", {}, () => [
            O("→")
          ])
        ], 10, ze),
        h("button", {
          class: d(["vtd-date__next-year", t.classes.nextYear]),
          "aria-label": t.buttonLabels.nextYear,
          type: "button",
          disabled: n.disableNav.nextYear,
          onClick: s[3] || (s[3] = (o) => n.incrementYearBy(1))
        }, [
          f(e.$slots, "nextYearLabel", {}, () => [
            O("↠")
          ])
        ], 10, Ue)
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
            (r(!0), c(S, null, M(t.daysOfWeek, (o, u) => (r(), c("th", {
              key: u,
              abbr: o,
              scope: "col",
              class: d(["vtd-date__th", t.classes.th])
            }, w(u), 11, Ye))), 128))
          ], 2)
        ], 2),
        h("tbody", {
          class: d(["vtd-date__tbody", t.classes.tbody])
        }, [
          (r(), c(S, null, M(6, (o) => h("tr", {
            key: o,
            class: d(["vtd-date__tr", t.classes.tr])
          }, [
            (r(!0), c(S, null, M(n.daysByWeeks[o - 1], (u) => (r(), c("td", {
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
              }, w(u.date.getDate()), 11, Ke)
            ], 2))), 128))
          ], 2)), 64))
        ], 2)
      ], 10, He)
    ], 42, Fe), [
      [te, a.show]
    ])
  ], 10, Te)), [
    [i, n.onClickout]
  ]);
}
const qe = /* @__PURE__ */ k(Le, [["render", We]]);
const Re = {
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
}, $e = { key: 0 };
function Ge(e, s, t, l, a, n) {
  return a.localShow || n.slots.toggle ? (r(), c("span", $e, [
    n.slots.toggle ? f(e.$slots, "toggle", _(b({ key: 0 }, {
      on: {
        click: () => a.localShow = !a.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + a.localShow
      }
    }))) : m("", !0),
    T(I, {
      name: t.bgTransition || t.transition,
      appear: !0
    }, {
      default: D(() => [
        a.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-dialog", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          T(I, { name: t.contentTransition }, {
            default: D(() => [
              (r(), P(B(t.tag), {
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
                default: D(() => [
                  f(e.$slots, "default", _(E({ close: () => a.localShow = !a.localShow })))
                ]),
                _: 3
              }, 8, ["class", "style"]))
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : m("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : m("", !0);
}
const Je = /* @__PURE__ */ k(Re, [["render", Ge]]);
const Xe = "vts-drawer", Qe = {
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
      e.target.classList.contains(Xe) && (this.localShow = !1);
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
}, Ze = { key: 0 };
function et(e, s, t, l, a, n) {
  return a.localShow || n.slots.toggle ? (r(), c("span", Ze, [
    n.slots.toggle ? f(e.$slots, "toggle", _(b({ key: 0 }, {
      on: {
        click: () => a.localShow = !a.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + a.localShow
      }
    }))) : m("", !0),
    T(I, {
      name: t.bgTransition || t.transition,
      appear: ""
    }, {
      default: D(() => [
        a.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-drawer", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          T(I, {
            name: t.transition,
            appear: ""
          }, {
            default: D(() => [
              a.localShow ? (r(), P(B(t.tag), {
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
                default: D(() => [
                  f(e.$slots, "default", _(E({ close: () => a.localShow = !a.localShow })))
                ]),
                _: 3
              }, 8, ["class", "style"])) : m("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ], 2)) : m("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ])) : m("", !0);
}
const tt = /* @__PURE__ */ k(Qe, [["render", et]]);
const st = {
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
}, nt = ["aria-expanded"];
function at(e, s, t, l, a, n) {
  return r(), c("div", {
    class: d(["vts-dropdown", t.classes.root]),
    onMouseenter: s[1] || (s[1] = (i) => e.isHovered = !0),
    onMouseleave: s[2] || (s[2] = (i) => e.isHovered = !1),
    onFocus: s[3] || (s[3] = (i) => e.isFocused = !0),
    onBlur: s[4] || (s[4] = (i) => e.isFocused = !1),
    onFocusout: s[5] || (s[5] = (...i) => n.onFocusout && n.onFocusout(...i))
  }, [
    h("button", {
      "aria-expanded": !!e.isHovered || !!e.isFocused,
      "aria-haspopup": "true",
      class: d(["vts-dropdown__trigger", t.classes.trigger]),
      type: "button",
      onClick: s[0] || (s[0] = (i) => e.isFocused = !e.isFocused)
    }, [
      f(e.$slots, "trigger", {}, () => [
        O(w(t.text), 1)
      ])
    ], 10, nt),
    T(I, { name: t.transition }, {
      default: D(() => [
        e.isHovered || e.isFocused ? (r(), c("div", {
          key: 0,
          class: d(["vts-dropdown__content", [`vts-dropdown__content--${t.position}`, t.classes.content]])
        }, [
          f(e.$slots, "default")
        ], 2)) : m("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ], 34);
}
const it = /* @__PURE__ */ k(st, [["render", at]]);
const lt = {
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
      default: () => "vts-" + F(4)
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
}, ot = ["for"], rt = ["id"], dt = {
  key: 0,
  "aria-hidden": "true"
}, ct = {
  key: 1,
  "aria-hidden": "true"
};
function ut(e, s, t, l, a, n) {
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
      onChange: s[0] || (s[0] = (...i) => n.onChange && n.onChange(...i))
    }, V(n.listeners, !0)), null, 16, rt),
    h("span", {
      class: d(["vts-file__text", t.classes.text])
    }, [
      f(e.$slots, "label", {}, () => [
        O(w(t.label), 1)
      ])
    ], 2),
    h("div", {
      class: d(["vts-file__dropzone", t.classes.dropzone]),
      onDragenter: s[5] || (s[5] = x((i) => e.droppable = !0, ["prevent"]))
    }, [
      f(e.$slots, "default", _(E({ files: e.localFiles, droppable: e.droppable })), () => [
        e.localFiles.length ? (r(), c("span", dt, [
          e.localFiles.length > 1 ? (r(), c(S, { key: 0 }, [
            O(w(e.localFiles.length) + " files selected ", 1)
          ], 64)) : (r(), c(S, { key: 1 }, [
            O(w(e.localFiles[0].name), 1)
          ], 64))
        ])) : (r(), c("span", ct, " Choose files or drop here "))
      ]),
      e.droppable ? (r(), c("span", {
        key: 0,
        class: d(["vts-file__overlay", t.classes.overlay]),
        onDrop: s[1] || (s[1] = x((...i) => n.onDrop && n.onDrop(...i), ["prevent"])),
        onDragenter: s[2] || (s[2] = x((i) => e.droppable = !0, ["stop"])),
        onDragleave: s[3] || (s[3] = x((i) => e.droppable = !1, ["stop"])),
        onDragover: s[4] || (s[4] = x(() => {
        }, ["prevent"]))
      }, [
        f(e.$slots, "overlay")
      ], 34)) : m("", !0)
    ], 34)
  ], 10, ot);
}
const ht = /* @__PURE__ */ k(lt, [["render", ut]]), Q = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]), ft = {
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
        const a = {
          ...s[l],
          error: s[l].dirty && !s[l].valid,
          errors: []
        }, n = new Map(Object.entries(t || {}));
        n.forEach((i, o) => {
          if (!a.invalid[o])
            return;
          const u = n.get(o), y = o.replace("length", "Length"), g = typeof u == "string" ? u : u(a._inputEl[y]);
          a.errors.push(g);
        }), e[l] = a;
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
      Q.has(e.tagName) && (this.modified = !0);
    },
    validate() {
      const e = this.$el.querySelectorAll("input, textarea, select"), s = {};
      e.forEach((t) => {
        const { name: l, id: a, validity: n } = t, i = l || a;
        if (i)
          switch (s[i] = {
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
              s[i].value = t.checked;
              break;
            case "radio":
              t.checked && (s[i].value = t.value);
              break;
            default:
              s[i].value = t.value;
          }
      }), this.localInputs = s;
    },
    onEvent() {
      this.validate();
    },
    onBlur({ target: e }) {
      Q.has(e.tagName) && (this.dirty = !0, this.localInputs[e.name].dirty = !0);
    },
    clear() {
      Array.from(
        this.$el.querySelectorAll("input, textarea, select")
      ).forEach((s) => {
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
}, vt = ["method"], yt = ["name"];
function bt(e, s, t, l, a, n) {
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
    [ue(n.event)]: s[0] || (s[0] = (...i) => n.onEvent && n.onEvent(...i))
  }, {
    onKeydown: s[1] || (s[1] = (...i) => n.checkModified && n.checkModified(...i)),
    onChange: s[2] || (s[2] = (...i) => n.checkModified && n.checkModified(...i)),
    onSubmit: s[3] || (s[3] = (...i) => n.onSubmit && n.onSubmit(...i)),
    onBlurCapture: s[4] || (s[4] = (...i) => n.onBlur && n.onBlur(...i))
  }, V(n.listeners, !0)), [
    t.honeypot ? (r(), c("input", {
      key: 0,
      name: typeof t.honeypot == "string" ? t.honeypot : "vts-honeypot",
      class: "visually-hidden",
      tabindex: "-1",
      autocomplete: "off",
      "aria-hidden": "true"
    }, null, 8, yt)) : m("", !0),
    f(e.$slots, "default", _(E({ valid: n.valid, dirty: e.dirty, modified: e.modified, error: n.error, inputs: n.inputs, clear: n.clear, validate: n.validate })))
  ], 16, vt);
}
const mt = /* @__PURE__ */ k(ft, [["render", bt]]);
const q = "vts-img", gt = {
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
}, pt = /* @__PURE__ */ h("noscript", null, `
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
    `, -1), _t = ["src", "decoding"], wt = ["src", "alt", "decoding", "role"];
function St(e, s, t, l, a, n) {
  return r(), c("picture", {
    class: d(["vts-img", t.classes.root])
  }, [
    pt,
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
      }), null, 16, _t)
    ], 6)) : m("", !0),
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
    }, e.$attrs, V(n.listeners, !0)), null, 16, wt)
  ], 2);
}
const kt = /* @__PURE__ */ k(gt, [["render", St]]), Z = {
  type: [String, Number, Boolean, Array],
  default: void 0
};
function ee(e, s) {
  e !== s && (this.localValue = e);
}
const Dt = {
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
    value: Z,
    modelValue: Z,
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
      const { id: e, name: s, valid: t, dirty: l, error: a, errorMessages: n, classes: i, $attrs: o } = this, { class: u, ...y } = o, g = [];
      return a && g.push(`${e}__description`), n.length && g.push(`${e}__errors`), {
        "aria-invalid": !t,
        "aria-describedby": l && g.length ? g.join(" ") : null,
        ...y,
        id: `${e}__input`,
        name: s,
        class: ["vts-input__input", i.input]
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
      return W(l, "object") && (l = Object.entries(l).map(([a, n]) => ({
        value: a,
        label: n
      }))), l.map((a) => (a = W(a, "object") ? a : { value: a }, Object.assign(a, e, {
        label: a.label || a.value,
        value: a.value
      }), s !== void 0 && (t === "checkbox" ? a.checked = s.includes(a.value) || a.checked : a.checked = a.value === s || a.checked), a));
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
      return Object.keys(s || {}).forEach((a) => {
        if (!e[a])
          return;
        const n = s[a], i = W(n, "function") ? n(t[a]) : n;
        l.push(i);
      }), l;
    }
  },
  watch: {
    modelValue: ee,
    value: ee,
    localValue(e) {
      this.$emit("update:modelValue", e), this.validate();
    }
  },
  created() {
    this.id = this.$attrs.id || "vts-" + F(4);
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
      const l = [...this.localValue || []], a = l.indexOf(t);
      a === -1 ? l.push(t) : l.splice(a, 1), this.localValue = l;
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
}, Et = ["id", "type"], Vt = ["for"], Ot = ["checked"], Mt = ["for"], Ct = ["for"], Pt = ["type"], It = ["id"], Lt = ["id"];
function Tt(e, s, t, l, a, n) {
  return r(), c("div", {
    class: d([
      "vts-input",
      `vts-input--${t.type}`,
      {
        "vts-input--required": e.$attrs.hasOwnProperty("required"),
        "vts-input--invalid": !a.valid,
        "vts-input--dirty": a.dirty,
        "vts-input--error": n.error
      },
      e.$attrs.class,
      t.classes.root
    ])
  }, [
    t.type === "radio" || t.type === "checkbox" && n.computedOptions.length ? (r(), c("fieldset", {
      key: 0,
      class: d(["vts-input__fieldset", t.classes.fieldset])
    }, [
      t.label ? (r(), c("legend", {
        key: 0,
        class: d(["vts-input__legend", t.classes.legend])
      }, w(t.label), 3)) : m("", !0),
      h("div", {
        class: d(["vts-input__fieldset-items", t.classes.fieldsetItems])
      }, [
        (r(!0), c(S, null, M(n.computedOptions, (i, o) => (r(), c("div", {
          key: i.value,
          class: d(["vts-input__fieldset-item", t.classes.fieldsetItem])
        }, [
          h("input", b({ ...n.bind, ...i }, {
            id: `${e.id}__input-${o}`,
            ref_for: !0,
            ref: "input",
            type: t.type,
            onInput: s[0] || (s[0] = (...u) => n.onFieldsetInput && n.onFieldsetInput(...u)),
            onBlurOnce: s[1] || (s[1] = (u) => a.dirty = !0)
          }, V(n.listeners, !0)), null, 16, Et),
          h("label", {
            for: `${e.id}__input-${o}`,
            class: d(["vts-input__label", t.classes.label])
          }, w(i.label), 11, Vt)
        ], 2))), 128))
      ], 2)
    ], 2)) : t.type === "checkbox" ? (r(), c(S, { key: 1 }, [
      h("input", b({
        ref: "input",
        checked: a.localValue === void 0 ? e.$attrs.checked : a.localValue,
        type: "checkbox"
      }, n.bind, {
        onChange: s[2] || (s[2] = (i) => a.localValue = i.target.checked),
        onBlurOnce: s[3] || (s[3] = (i) => a.dirty = !0)
      }, V(n.listeners, !0)), null, 16, Ot),
      h("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, w(t.label), 11, Mt)
    ], 64)) : (r(), c(S, { key: 2 }, [
      h("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, w(t.label), 11, Ct),
      t.type === "select" ? j((r(), c("select", b({
        key: 0,
        ref: "input",
        "onUpdate:modelValue": s[4] || (s[4] = (i) => a.localValue = i)
      }, n.bind, {
        onInput: s[5] || (s[5] = (...i) => n.onSelect && n.onSelect(...i)),
        onChange: s[6] || (s[6] = (...i) => n.onSelect && n.onSelect(...i)),
        onBlurOnce: s[7] || (s[7] = (i) => a.dirty = !0)
      }, V(n.listeners, !0)), [
        f(e.$slots, "options", {}, () => [
          (r(!0), c(S, null, M(n.computedOptions, (i) => (r(), c("option", b({
            key: i.value
          }, i, { label: null }), w(i.label), 17))), 128))
        ])
      ], 16)), [
        [he, a.localValue]
      ]) : t.type === "textarea" ? j((r(), c("textarea", b({
        key: 1,
        ref: "input",
        "onUpdate:modelValue": s[8] || (s[8] = (i) => a.localValue = i)
      }, n.bind, {
        onBlurOnce: s[9] || (s[9] = (i) => a.dirty = !0)
      }, V(n.listeners, !0)), null, 16)), [
        [fe, a.localValue]
      ]) : j((r(), c("input", b({
        key: 2,
        ref: "input",
        "onUpdate:modelValue": s[10] || (s[10] = (i) => a.localValue = i),
        type: t.type
      }, n.bind, {
        onBlurOnce: s[11] || (s[11] = (i) => a.dirty = !0)
      }, V(n.listeners, !0)), null, 16, Pt)), [
        [ve, a.localValue]
      ])
    ], 64)),
    n.slots.description ? (r(), c("div", {
      key: 3,
      id: `${e.id}__description`,
      class: d(["vts-input__description", t.classes.description])
    }, [
      f(e.$slots, "description", _(E({
        valid: a.valid,
        dirty: a.dirty,
        error: n.error,
        invalid: a.invalid,
        anyInvalid: a.anyInvalid,
        errors: n.errorMessages
      })))
    ], 10, It)) : m("", !0),
    a.dirty && n.errorMessages.length ? (r(), c("div", {
      key: 4,
      id: `${e.id}__errors`,
      class: d(["vts-input__errors", t.classes.errors])
    }, [
      (r(!0), c(S, null, M(n.errorMessages, (i) => (r(), c("span", {
        key: i,
        class: d(["vts-input__error", t.classes.error])
      }, w(i), 3))), 128))
    ], 10, Lt)) : m("", !0)
  ], 2);
}
const Bt = /* @__PURE__ */ k(Dt, [["render", Tt]]), Ft = {
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
    const { root: s, threshold: t, rootMargin: l, options: a, handler: n } = this, i = {
      ...a,
      root: s,
      threshold: t,
      rootMargin: l
    };
    this.observer = new IntersectionObserver(n, i), this.observer.observe(e);
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
const At = {
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
function xt(e, s, t, l, a, n) {
  return r(), P(I, { name: t.bgTransition }, {
    default: D(() => [
      t.showing ? (r(), c("div", {
        key: 0,
        class: d(["vts-modal", t.classes.root]),
        onClick: s[0] || (s[0] = (...i) => n.onClick && n.onClick(...i)),
        onKeydown: s[1] || (s[1] = (...i) => n.onKeydown && n.onKeydown(...i))
      }, [
        T(I, {
          name: t.transition,
          appear: ""
        }, {
          default: D(() => [
            (r(), P(B(t.tag), {
              ref: "content",
              style: U({ width: t.width, maxWidth: t.maxWidth }),
              class: d(["vts-modal__content", t.classes.content]),
              tabindex: "-1",
              role: "dialog"
            }, {
              default: D(() => [
                f(e.$slots, "default")
              ]),
              _: 3
            }, 8, ["style", "class"]))
          ]),
          _: 3
        }, 8, ["name"])
      ], 34)) : m("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const jt = /* @__PURE__ */ k(At, [["render", xt]]), Nt = {
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
function zt(e, s, t, l, a, n) {
  return r(), P(B(t.tag), { class: "vts-resize" }, {
    default: D(() => [
      f(e.$slots, "default", _(E({ width: e.width, height: e.height, inlineSize: e.width, blockSize: e.height })))
    ]),
    _: 3
  });
}
const Ut = /* @__PURE__ */ k(Nt, [["render", zt]]);
const Ht = {
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
}, Yt = ["href"];
function Kt(e, s, t, l, a, n) {
  return r(), c("a", {
    class: "vts-skip",
    href: t.to,
    onClick: s[0] || (s[0] = (i) => n.skipTo(t.to))
  }, [
    f(e.$slots, "default", {}, () => [
      O("Skip to main content")
    ])
  ], 8, Yt);
}
const Wt = /* @__PURE__ */ k(Ht, [["render", Kt]]);
const qt = {
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
      default: "vts-" + F(4)
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
      const { headers: e, sortable: s, localSortBy: t, localSortDirection: l } = this, a = [];
      return e.forEach((n) => {
        const i = {
          ...n,
          bind: {},
          sortBtn: {
            bind: { "aria-label": "toggle sort direction" },
            on: { click: () => this.onSort(n.key) }
          }
        };
        i.sortable === void 0 && (i.sortable = !!i.sort || s), i.sortable && t === n.key && l && (l === "ASC" ? i.bind["aria-sort"] = "ascending" : i.bind["aria-sort"] = "descending"), a.push(i);
      }), a;
    },
    computedItems() {
      const {
        computedHeaders: e,
        items: s,
        localSortBy: t,
        localSortDirection: l,
        localPage: a,
        localPerPage: n
      } = this;
      let i = [...s];
      if (t && l) {
        const o = e.find((y) => y.key === t);
        let u = this.defaultComparisonFn;
        typeof o.sort == "function" && (u = o.sort), i = i.sort((y, g) => u(y, g, l === "ASC"));
      }
      if (n > -1) {
        const o = (Math.max(a, 1) - 1) * n;
        i = i.slice(o, o + n);
      }
      return i;
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
      const { localSortBy: l } = this, a = t ? 1 : -1, n = e[l], i = s[l];
      return Number.isFinite(n) && Number.isFinite(i) ? (n - i) * a : n < i ? -1 * a : n > i ? 1 * a : 0;
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
}, Rt = ["id"], $t = ["disabled"], Gt = ["disabled", "aria-label", "onClick"], Jt = ["disabled"];
function Xt(e, s, t, l, a, n) {
  return r(), c("div", {
    ref: "container",
    role: "region",
    "aria-labelledby": "caption",
    class: d(["vts-table", { "vts-table--sortable": t.sortable }, t.classes.root])
  }, [
    h("table", {
      class: d([t.classes.table])
    }, [
      f(e.$slots, "default", _(E({
        caption: t.caption,
        headers: n.computedHeaders,
        items: n.computedItems,
        sortBy: a.localSortBy,
        sortDirection: a.localSortDirection,
        page: a.localPage,
        perPage: a.localPerPage
      })), () => [
        t.caption ? (r(), c("caption", {
          key: 0,
          id: `${t.id}__caption`,
          class: d([t.classes.caption])
        }, w(t.caption), 11, Rt)) : m("", !0),
        n.computedHeaders.length ? (r(), c("thead", {
          key: 1,
          class: d([t.classes.thead])
        }, [
          h("tr", {
            class: d([t.classes.tr])
          }, [
            (r(!0), c(S, null, M(n.computedHeaders, (i, o) => (r(), c("th", b({
              key: i.key
            }, i.bind, {
              class: [t.classes.th]
            }), [
              f(e.$slots, `header.${i.key}`, _(E({
                header: i,
                index: o
              })), () => [
                O(w(i.text || i.key) + " ", 1),
                i.sortable ? (r(), c(S, { key: 0 }, [
                  i.key === a.localSortBy && a.localSortDirection === "ASC" ? f(e.$slots, "sort-asc", _(b({ key: 0 }, i.sortBtn)), () => [
                    h("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--asc",
                        t.classes.sortBtn
                      ]
                    }, i.sortBtn.bind, { type: "button" }, V(i.sortBtn.on, !0)), " ↑ ", 16)
                  ]) : i.key === a.localSortBy && a.localSortDirection === "DESC" ? f(e.$slots, "sort-desc", _(b({ key: 1 }, i.sortBtn)), () => [
                    h("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--desc",
                        t.classes.sortBtn
                      ]
                    }, i.sortBtn.bind, { type: "button" }, V(i.sortBtn.on, !0)), " ↓ ", 16)
                  ]) : f(e.$slots, "sort-none", _(b({ key: 2 }, i.sortBtn)), () => [
                    h("button", b({
                      class: ["vts-table__sort-btn", t.classes.sortBtn]
                    }, i.sortBtn.bind, { type: "button" }, V(i.sortBtn.on, !0)), " ↕ ", 16)
                  ])
                ], 64)) : m("", !0)
              ])
            ], 16))), 128))
          ], 2)
        ], 2)) : m("", !0),
        h("tbody", {
          class: d([t.classes.tbody])
        }, [
          f(e.$slots, "body", _(E({
            items: n.computedItems,
            sortBy: a.localSortBy,
            sortDirection: a.localSortDirection,
            page: a.localPage,
            perPage: a.localPerPage
          })), () => [
            (r(!0), c(S, null, M(n.computedItems, (i, o) => (r(), c("tr", {
              key: i.id,
              class: d(["vts-table__row", t.classes.tr])
            }, [
              f(e.$slots, "row", _(E({ item: i, index: o, row: o + 1 })), () => [
                (r(!0), c(S, null, M(n.computedHeaders, (u) => (r(), c("td", {
                  key: u.key,
                  class: d([t.classes.td])
                }, [
                  f(e.$slots, `column.${u.key}`, _(E({
                    item: i,
                    index: (a.localPage - 1) * a.localPerPage + o,
                    row: o + 1,
                    key: u.key,
                    column: u.key,
                    value: i[u.key],
                    cell: i[u.key],
                    data: i[u.key]
                  })), () => [
                    O(w(i[u.key]), 1)
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
        ], 2)) : m("", !0)
      ])
    ], 2),
    f(e.$slots, "pagination", _(E({ page: a.localPage, perPage: a.localPerPage, lastPage: n.lastPage, goToPage: n.goToPage })), () => [
      n.lastPage > 1 ? (r(), c("div", {
        key: 0,
        class: d(["vts-table__pagination", t.classes.pagination])
      }, [
        h("button", {
          disabled: a.localPage === 1,
          "aria-label": "go to previous page",
          class: d(["vts-table__prev", t.classes.previous]),
          type: "button",
          onClick: s[0] || (s[0] = (i) => n.goToPage(a.localPage - 1))
        }, " Prev ", 10, $t),
        h("ul", {
          class: d(["vts-table__pages", t.classes.pageList])
        }, [
          (r(!0), c(S, null, M(n.lastPage, (i) => (r(), c("li", {
            key: i,
            class: d([
              "vts-table__page-item",
              { "vts-table__page-item--current": i === a.localPage },
              t.classes.pageItem
            ])
          }, [
            h("button", {
              disabled: i === a.localPage,
              "aria-label": `go to page ${i}`,
              class: d([
                "vts-table__page",
                { "vts-table__page--current": i === a.localPage },
                t.classes.page
              ]),
              type: "button",
              onClick: (o) => n.goToPage(i)
            }, w(i), 11, Gt)
          ], 2))), 128))
        ], 2),
        h("button", {
          disabled: a.localPage === n.lastPage,
          "aria-label": "go to next page",
          class: d(["vts-table__next", t.classes.next]),
          type: "button",
          onClick: s[1] || (s[1] = (i) => n.goToPage(a.localPage + 1))
        }, " Next ", 10, Jt)
      ], 2)) : m("", !0)
    ])
  ], 2);
}
const Qt = /* @__PURE__ */ k(qt, [["render", Xt]]), Zt = {
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
    this.id = this.$attrs.id || `vts-${F(4)}`;
  },
  methods: {
    onKeydown(e) {
      const { keyCode: s } = e;
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
      const l = this.activeIndex, a = this.tabList.length, n = l + t[s];
      n < 0 ? this.activeIndex = a - 1 : n >= a ? this.activeIndex = 0 : this.activeIndex = n;
    },
    setFocus() {
      const { $refs: e, tabList: s, activeIndex: t } = this, l = s[t];
      return e[l][0].focus();
    }
  }
}, es = ["aria-label", "aria-orientation"], ts = ["id", "aria-selected", "tabindex", "aria-controls", "onClick"], ss = ["id", "aria-labelledby", "hidden"];
function ns(e, s, t, l, a, n) {
  return r(), c("div", {
    class: d(["vts-tabs", t.classes.root])
  }, [
    h("div", {
      role: "tablist",
      "aria-label": t.label,
      "aria-orientation": t.orientation,
      class: d(["vts-tabs__tablist", t.classes.tablist])
    }, [
      (r(!0), c(S, null, M(n.tabList, (i, o) => (r(), c("button", {
        id: `${e.id}-${i}`,
        key: i,
        ref_for: !0,
        ref: i,
        "aria-selected": o === a.activeIndex,
        tabindex: o === a.activeIndex ? null : -1,
        "aria-controls": `${e.id}-${i.replace("tab", "panel")}`,
        class: d([
          `vts-tabs__tab vts-tabs__tab--${i} vts-tabs__tab--${o}`,
          {
            "vts-tabs__tab--active": o === a.activeIndex,
            [t.classes.tabActive]: o === a.activeIndex
          },
          t.classes.tab
        ]),
        role: "tab",
        type: "button",
        onKeydown: s[0] || (s[0] = (...u) => n.onKeydown && n.onKeydown(...u)),
        onClick: (u) => a.activeIndex = o
      }, [
        f(e.$slots, i)
      ], 42, ts))), 128))
    ], 10, es),
    (r(!0), c(S, null, M(n.panelList, (i, o) => (r(), c("div", {
      id: `${e.id}-panel-${o}`,
      key: i,
      "aria-labelledby": `${e.id}-tab-${o}`,
      hidden: o !== a.activeIndex,
      class: d([
        `vts-tabs__panel vts-tabs__panel--${o}`,
        {
          "vts-tabs__panel--active": o === a.activeIndex,
          [t.classes.panelActive]: o === a.activeIndex
        },
        t.classes.panel
      ]),
      tabindex: "0",
      role: "tabpanel"
    }, [
      f(e.$slots, i)
    ], 10, ss))), 128))
  ], 2);
}
const as = /* @__PURE__ */ k(Zt, [["render", ns]]);
const is = {
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
    this.id = e || `vts-${F(4)}`;
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
}, ls = ["id", "disabled", "aria-controls", "aria-expanded"], os = ["id", "aria-labelledby", "aria-hidden"];
function rs(e, s, t, l, a, n) {
  return r(), c("div", {
    class: d(["vts-toggle", { "vts-toggle--open": a.isOpen }, t.classes.root])
  }, [
    h("button", b({
      id: `${e.id}-label`,
      ref: "label",
      type: "button",
      disabled: t.disabled,
      "aria-controls": `${e.id}-content`,
      "aria-expanded": a.isOpen,
      class: ["vts-toggle__label", t.classes.label],
      onClick: s[0] || (s[0] = (i) => a.isOpen = !a.isOpen)
    }, V(n.listeners, !0)), [
      O(w(t.label) + " ", 1),
      f(e.$slots, "label", _(E({ isOpen: a.isOpen })))
    ], 16, ls),
    T(I, {
      onBeforeEnter: n.collapse,
      onEnter: n.expand,
      onAfterEnter: n.resetHeight,
      onBeforeLeave: n.expand,
      onLeave: n.collapse
    }, {
      default: D(() => [
        j(h("div", {
          id: `${e.id}-content`,
          "aria-labelledby": `${e.id}-label`,
          "aria-hidden": !a.isOpen,
          role: "region",
          class: d(["vts-toggle__content", t.classes.content])
        }, [
          f(e.$slots, "default", _(E({ isOpen: a.isOpen })))
        ], 10, os), [
          [te, a.isOpen && !t.disabled]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])
  ], 2);
}
const ds = /* @__PURE__ */ k(is, [["render", rs]]);
const cs = {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    id: {
      type: String,
      default: () => `vts-${F(4)}`
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
}, us = ["id", "aria-hidden"];
function hs(e, s, t, l, a, n) {
  return r(), P(B(t.tag), {
    id: t.id,
    tabindex: "0",
    "aria-describedby": `${t.id}__content`,
    class: d(["vts-tooltip", t.classes.toggle]),
    onFocus: s[0] || (s[0] = (i) => e.show = !0),
    onBlur: s[1] || (s[1] = (i) => e.show = !1),
    onMouseenter: n.onMouseenter,
    onMouseleave: n.onMouseleave
  }, {
    default: D(() => [
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
      ], 10, us)
    ]),
    _: 3
  }, 40, ["id", "aria-describedby", "class", "onMouseenter", "onMouseleave"]);
}
const fs = /* @__PURE__ */ k(cs, [["render", hs]]), vs = {
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
}, ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert: _e,
  VAsync: we,
  VBtn: Ve,
  VDate: qe,
  VDialog: Je,
  VDrawer: tt,
  VDropdown: it,
  VFile: ht,
  VForm: mt,
  VImg: kt,
  VInput: Bt,
  VIntersect: Ft,
  VModal: jt,
  VResize: Ut,
  VSkip: Wt,
  VTable: Qt,
  VTabs: as,
  VToggle: ds,
  VTooltip: fs,
  VTry: vs
}, Symbol.toStringTag, { value: "Module" })), ys = (e) => e[0].toUpperCase() + e.slice(1);
function bs(e, s, t = navigator.language) {
  return new Intl.NumberFormat(t, {
    style: "currency",
    currency: s
  }).format(e);
}
function ms(e, s = navigator.language) {
  return new Intl.NumberFormat(s).format(e);
}
const gs = (e, s) => e || s;
function ps(e, s, t) {
  return t !== 1 ? s : e;
}
function _s(e, s = 100, t = "...") {
  return e.length > s ? e.substring(0, s - t.length) + t : e;
}
const le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: ys,
  currency: bs,
  number: ms,
  placeholder: gs,
  plural: ps,
  truncate: _s
}, Symbol.toStringTag, { value: "Module" }));
function ks(e, s = {}) {
  const t = se({
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
        const i = await n;
        i !== void 0 ? t.results = i : s.default !== void 0 ? t.results = s.default : t.results = null, s.onResolve && s.onResolve(t.results);
      } catch (i) {
        i instanceof Error ? t.error = {
          name: i.name,
          message: i.message
        } : t.error = i, console.error(i), s.onReject && s.onReject(t.error);
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
const Ds = (e, s = {}) => {
  const l = se({
    invalid: !1,
    dirty: !1,
    error: !1,
    inputs: {}
  }), a = new Map(Object.entries(s.errors || {})), n = async (y) => {
    if (!y)
      return;
    await $(), l.invalid = !y.checkValidity();
    const g = y.querySelectorAll("input, textarea, select"), p = {};
    g.forEach((C) => {
      const { name: A, id: oe, validity: L } = C, N = A || oe;
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
      a.forEach((ws, Y) => {
        if (!z.invalid[Y])
          return;
        const K = a.get(Y), re = Y.replace("length", "Length"), de = typeof K == "string" ? K : K(C[re]);
        z.errors.push(de);
      }), z.dirty = l.inputs[N] ? l.inputs[N].dirty : !1, p[N] = z;
    }), l.inputs = p;
  }, i = () => n(e.value), o = (y) => {
    n(e.value);
    const g = y.target, p = g.name || g.id;
    l.dirty = !0, p && l.inputs[p] && (l.inputs[p].dirty = !0);
  }, u = new MutationObserver(i);
  return ye(e, async (y, g, p) => {
    y && (await $(), n(y), y.addEventListener("input", i), y.addEventListener("blur", o, {
      capture: !0
    }), u.observe(y, {
      childList: !0,
      subtree: !0
    }), p(() => {
      y.removeEventListener("input", i), y.removeEventListener("blur", o), u.disconnect();
    }));
  }), l.error = be(() => l.invalid && l.dirty), l.validate = () => n(e.value), l.reset = () => {
    l.dirty = !1, n(e.value);
  }, l.clear = () => {
    e.value.querySelectorAll("input, textarea, select").forEach((p) => {
      p.value = "";
    });
  }, l;
}, Es = ie, Vs = ae, Os = le, Ms = {
  install(e, s = {}) {
    s.components && (Array.isArray(s.components) && (s.components = s.components.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.components).forEach((t) => {
      const [l, a] = t, n = ie[l], i = typeof a == "boolean" && a.name || l;
      e.component(i, n);
    })), s.directives && (Array.isArray(s.directives) && (s.directives = s.directives.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.directives).forEach((t) => {
      const [l] = t, a = ae[l];
      e.directive(l, a);
    })), s.filters && (Array.isArray(s.filters) && (s.filters = s.filters.reduce((t, l) => (t[l] = !0, t), {})), Object.entries(s.filters).forEach((t) => {
      const [l] = t, a = le[l];
      e.filter(l, a);
    }));
  }
};
export {
  _e as VAlert,
  we as VAsync,
  Ve as VBtn,
  qe as VDate,
  Je as VDialog,
  tt as VDrawer,
  it as VDropdown,
  ht as VFile,
  mt as VForm,
  kt as VImg,
  Bt as VInput,
  Ft as VIntersect,
  jt as VModal,
  Ut as VResize,
  Wt as VSkip,
  Qt as VTable,
  as as VTabs,
  ds as VToggle,
  fs as VTooltip,
  vs as VTry,
  Oe as autofocus,
  ys as capitalize,
  ne as clickout,
  Es as components,
  Me as copy,
  bs as currency,
  Ms as default,
  Vs as directives,
  Os as filters,
  Ce as intersect,
  ms as number,
  gs as placeholder,
  ps as plural,
  _s as truncate,
  ks as useAsync,
  Ds as useForm
};
