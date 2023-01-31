import { openBlock as r, createBlock as L, Transition as T, withCtx as I, resolveDynamicComponent as j, normalizeClass as d, renderSlot as h, createElementBlock as c, createTextVNode as D, createCommentVNode as g, withModifiers as A, Fragment as k, renderList as O, createElementVNode as f, mergeProps as b, toHandlers as V, resolveDirective as _e, withDirectives as N, normalizeProps as y, guardReactiveProps as S, withKeys as J, toDisplayString as w, vShow as ue, createVNode as F, normalizeStyle as R, toHandlerKey as we, vModelSelect as ke, vModelText as Se, vModelDynamic as De, reactive as G, TransitionGroup as Ee, watch as Ve, nextTick as X, computed as Oe } from "vue";
const E = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [l, n] of s)
    t[l] = n;
  return t;
}, Ie = {
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
}, Me = ["aria-label"];
function Ce(e, s, t, l, n, i) {
  return r(), L(T, { name: t.transition }, {
    default: I(() => [
      !e.dismissed && t.modelValue ? (r(), L(j(t.tag), {
        key: 0,
        role: "alert",
        class: d(["vts-alert", t.classes.root])
      }, {
        default: I(() => [
          h(e.$slots, "default"),
          t.dismissible ? (r(), c("button", {
            key: 0,
            "aria-label": t.dismissLabel || null,
            class: d(["vts-alert__dismiss", t.classes.dismiss]),
            type: "button",
            onClick: s[0] || (s[0] = (...a) => i.dismiss && i.dismiss(...a))
          }, [
            h(e.$slots, "dismiss", {}, () => [
              D("×")
            ])
          ], 10, Me)) : g("", !0)
        ]),
        _: 3
      }, 8, ["class"])) : g("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const Pe = /* @__PURE__ */ E(Ie, [["render", Ce]]), Le = {
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
    let n = this.$slots;
    const i = n.pending, a = n.rejected, o = n.resolved, u = n.default;
    if (e && i)
      return i();
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
const Te = {
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
}, Fe = ["action"], Be = ["value", "name"];
function Ae(e, s, t, l, n, i) {
  return t.action && t.data ? (r(), c("form", {
    key: 0,
    action: t.action,
    method: "POST",
    class: "vts-btn__form",
    onSubmit: s[0] || (s[0] = A((a) => e.$emit("submit", a), ["prevent"]))
  }, [
    (r(!0), c(k, null, O(t.data, (a, o) => (r(), c("input", {
      key: o,
      value: a,
      name: String(o),
      type: "hidden",
      hidden: "",
      autocomplete: "off",
      "aria-hidden": "true",
      tabindex: "-1"
    }, null, 8, Be))), 128)),
    f("button", b({ type: "submit" }, e.$attrs, { class: "vts-btn" }, V(i.listeners, !0)), [
      h(e.$slots, "default")
    ], 16)
  ], 40, Fe)) : (r(), L(j(i.tag), b({
    key: 1,
    class: "vts-btn",
    type: i.type
  }, e.$attrs, V(i.listeners)), {
    default: I(() => [
      h(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["type"]));
}
const xe = /* @__PURE__ */ E(Te, [["render", Ae]]), v = Object.freeze({
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
}), Q = (e) => e.focus(), Ne = {
  mounted: Q,
  inserted: Q
};
function Z(e, s) {
  e._vtsClickout = {
    stop: (t) => t.stopPropagation()
  }, document.body.addEventListener("click", s.value), e.addEventListener("click", e._vtsClickout.stop);
}
function ee(e, s) {
  document.body.removeEventListener("click", s.value), e.removeEventListener("click", e._vtsClickout.stop);
}
const fe = {
  mounted: Z,
  unmounted: ee,
  bind: Z,
  unbind: ee
};
function he(e) {
  const s = document.activeElement, t = document.createElement("textarea");
  t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", t.style.fontSize = "12pt", document.body.append(t), t.select(), document.execCommand("copy"), t.remove(), s && s.focus();
}
function te(e, s) {
  e._vtsCopy = () => he(s.value), e.addEventListener("click", e._vtsCopy);
}
function se(e, s) {
  e.removeEventListener("click", e._vtsCopy), e._vtsCopy = () => he(s.value), e.addEventListener("click", e._vtsCopy);
}
function ne(e) {
  e.removeEventListener("click", e._vtsCopy);
}
const je = {
  mounted: te,
  updated: se,
  unmounted: ne,
  bind: te,
  update: se,
  unbind: ne
};
function ie(e, s) {
  e._vtsFocusout = () => {
    requestAnimationFrame(() => {
      e.contains(document.activeElement) || s.value();
    });
  }, e.addEventListener("focusout", e._vtsFocusout);
}
function ae(e) {
  e._vtsFocusout && e.removeEventListener("focusout", e._vtsFocusout);
}
const ze = {
  mounted: ie,
  unmounted: ae,
  bind: ie,
  unbind: ae
};
function q(e) {
  e._vtsIntersect && (e._vtsIntersect.unobserve(e), delete e._vtsIntersect);
}
function le(e, { value: s, modifiers: t }) {
  const l = {
    ...s
  }, { enter: n, exit: i, once: a } = t;
  l.root && (l.root = typeof l.root == "string" ? document.querySelector(l.root) : l.root);
  const o = { ...s };
  s instanceof Function && (n && (o.onEnter = s), i && (o.onExit = s), !n && !i && (o.onChange = s));
  const u = new IntersectionObserver(([m]) => {
    const p = Array.isArray(l.threshold), _ = {};
    for (const M in m)
      _[M] = m[M];
    _.isIntersecting = p ? l.threshold.includes(m.intersectionRatio) : m.intersectionRatio === l.threshold, _.isIntersecting ? o.onEnter && o.onEnter(_, e) : o.onExit && o.onExit(_, e), o.onChange && o.onChange(_, e), a && q(e);
  }, l);
  u.observe(e), e._vtsIntersect = u;
}
const Ue = {
  mounted: le,
  unmounted: q,
  inserted: le,
  unbind: q
}, ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autofocus: Ne,
  clickout: fe,
  copy: je,
  focusout: ze,
  intersect: Ue
}, Symbol.toStringTag, { value: "Module" })), $ = [
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
function P(e = 10, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let t = "";
  for (let l = 0; l < e; l++)
    t += s.charAt(Math.floor(Math.random() * s.length));
  return t;
}
function K(e, s) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() === s.toLowerCase();
}
function He(e, s) {
  const t = Array.from(e.querySelectorAll($));
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
function oe(e, s) {
  return e.getFullYear() === s.getFullYear() && e.getMonth() === s.getMonth() && e.getDate() === s.getDate();
}
const Ye = [
  v.UP,
  v.DOWN,
  v.LEFT,
  v.RIGHT,
  v.PAGEUP,
  v.PAGEDOWN,
  v.HOME,
  v.END
], Ke = {
  selectDate: "Select Date",
  showCalendar: "show calendar",
  previousMonth: "previous month",
  nextMonth: "next month",
  previousYear: "previous year",
  nextYear: "next year"
}, We = {
  name: "VDate",
  directives: {
    clickout: fe
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
      default: () => `vts-${P(4)}`
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
      default: () => Object.freeze(Ke)
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
      const { focusedDate: e, min: s, max: t } = this, l = {}, n = new Date(s), i = new Date(t);
      return s && (l.prevYear = e.getFullYear() <= n.getFullYear(), l.prevMonth = e.getMonth() <= n.getMonth()), t && (l.nextYear = e.getFullYear() >= i.getFullYear(), l.nextMonth = e.getMonth() >= i.getMonth()), l;
    },
    daysByWeeks() {
      const { focusedDate: e, selectedDate: s, min: t, max: l } = this, n = new Date(
        e.getFullYear(),
        e.getMonth(),
        1
      ), i = n.getDay();
      n.setDate(n.getDate() - i);
      const a = new Date(
        e.getFullYear(),
        e.getMonth() + 1,
        0
      ).getDate(), o = new Date(n), u = i + a < 36 ? 5 : 6, m = [];
      for (let p = 0; p < u; p++) {
        m.push([]);
        for (let _ = 0; _ < 7; _++) {
          const M = new Date(o);
          let B = !1;
          t && (B = M < new Date(t)), l && !B && (B = M > new Date(l)), m[p].push({
            date: M,
            isFocused: oe(M, e),
            isSelected: oe(M, s),
            disabled: B
          }), o.setDate(o.getDate() + 1);
        }
      }
      return m;
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
      if (!e.target.classList.contains("vts-date__day") || !Ye.includes(e.keyCode))
        return;
      e.stopPropagation(), e.preventDefault();
      const { focusedDate: s, min: t, max: l } = this, n = new Date(s);
      switch (e.keyCode) {
        case v.ENTER:
        case v.SPACE:
          this.selectedDate = n;
          return;
        case v.RIGHT:
          n.setDate(n.getDate() + 1);
          break;
        case v.LEFT:
          n.setDate(n.getDate() - 1);
          break;
        case v.DOWN:
          n.setDate(n.getDate() + 7);
          break;
        case v.UP:
          n.setDate(n.getDate() - 7);
          break;
        case v.PAGEUP:
          e.shiftKey ? n.setFullYear(s.getFullYear() - 1) : n.setMonth(s.getMonth() - 1);
          break;
        case v.PAGEDOWN:
          e.shiftKey ? n.setFullYear(s.getFullYear() + 1) : n.setMonth(s.getMonth() + 1);
          break;
        case v.HOME:
          n.setDate(n.getDate() - n.getDay());
          break;
        case v.END:
          n.setDate(n.getDate() + (6 - n.getDay()));
          break;
      }
      const i = t && new Date(t), a = l && new Date(l);
      i && n < i || a && n > a || (this.focusedDate = n, this.$nextTick(() => {
        this.$el.querySelector('button[aria-selected="true"]').focus();
      }));
    },
    onTab(e) {
      const s = this.$refs.calendar;
      He(s, e);
    },
    onClickout(e) {
      const { show: s } = this;
      e.preventDefault(), s && (this.show = !1);
    }
  }
}, qe = ["id"], Re = ["aria-label", "aria-expanded"], Ge = ["aria-label"], $e = ["aria-labelledby"], Je = { class: "vts-date__navigation" }, Xe = ["aria-label", "disabled"], Qe = ["aria-label", "disabled"], Ze = ["id"], et = ["aria-label", "disabled"], tt = ["aria-label", "disabled"], st = ["aria-labelledby"], nt = ["abbr"], it = ["tabindex", "aria-selected", "value", "disabled"];
function at(e, s, t, l, n, i) {
  const a = _e("clickout");
  return N((r(), c("div", {
    id: t.id,
    class: d(["vtd-date", t.classes.root])
  }, [
    h(e.$slots, "default", y(S(i.toggle)), () => [
      f("button", {
        "aria-label": t.buttonLabels.selectDate,
        "aria-expanded": n.show ? "true" : "false",
        type: "button",
        class: d(["vtd-date__toggle", t.classes.toggle]),
        onClick: s[0] || (s[0] = (o) => n.show = !n.show)
      }, [
        f("span", {
          role: "img",
          "aria-label": t.buttonLabels.showCalendar
        }, " 📅 ", 8, Ge)
      ], 10, Re)
    ]),
    N(f("div", {
      ref: "calendar",
      class: d(["", ["vtd-date__wrapper", t.classes.wrapper]]),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": `${t.id}-dialog-label`,
      onClick: s[5] || (s[5] = (...o) => i.onClick && i.onClick(...o)),
      onKeydown: [
        s[6] || (s[6] = (...o) => i.onKeydown && i.onKeydown(...o)),
        s[7] || (s[7] = J((...o) => i.onTab && i.onTab(...o), ["tab"])),
        s[8] || (s[8] = J((o) => n.show = !1, ["esc"]))
      ]
    }, [
      f("div", Je, [
        f("button", {
          class: d(["vtd-date__prev-year", t.classes.prevYear]),
          "aria-label": t.buttonLabels.previousYear,
          type: "button",
          disabled: i.disableNav.prevYear,
          onClick: s[1] || (s[1] = (o) => i.incrementYearBy(-1))
        }, [
          h(e.$slots, "prevYearLabel", {}, () => [
            D("↞")
          ])
        ], 10, Xe),
        f("button", {
          class: d(["vtd-date__prev-month", t.classes.prevMonth]),
          "aria-label": t.buttonLabels.previousMonth,
          type: "button",
          disabled: i.disableNav.prevMonth,
          onClick: s[2] || (s[2] = (o) => i.incrementMonthBy(-1))
        }, [
          h(e.$slots, "prevMonthLabel", {}, () => [
            D("←")
          ])
        ], 10, Qe),
        f("h4", {
          id: `${t.id}-dialog-label`,
          class: d(["vtd-date__title", t.classes.title]),
          "aria-live": "polite"
        }, w(i.monthYear), 11, Ze),
        f("button", {
          class: d(["vtd-date__next-month", t.classes.nextMonth]),
          "aria-label": t.buttonLabels.nextMonth,
          type: "button",
          disabled: i.disableNav.nextMonth,
          onClick: s[3] || (s[3] = (o) => i.incrementMonthBy(1))
        }, [
          h(e.$slots, "nextMonthLabel", {}, () => [
            D("→")
          ])
        ], 10, et),
        f("button", {
          class: d(["vtd-date__next-year", t.classes.nextYear]),
          "aria-label": t.buttonLabels.nextYear,
          type: "button",
          disabled: i.disableNav.nextYear,
          onClick: s[4] || (s[4] = (o) => i.incrementYearBy(1))
        }, [
          h(e.$slots, "nextYearLabel", {}, () => [
            D("↠")
          ])
        ], 10, tt)
      ]),
      f("table", {
        class: d(["vtd-date__calendar", t.classes.calendar]),
        role: "grid",
        "aria-labelledby": `${t.id}-dialog-label`
      }, [
        f("thead", {
          class: d(["vtd-date__thead", t.classes.thead])
        }, [
          f("tr", {
            class: d(["vtd-date__week", t.classes.week])
          }, [
            (r(!0), c(k, null, O(t.daysOfWeek, (o, u) => (r(), c("th", {
              key: u,
              abbr: o,
              scope: "col",
              class: d(["vtd-date__th", t.classes.th])
            }, w(u), 11, nt))), 128))
          ], 2)
        ], 2),
        f("tbody", {
          class: d(["vtd-date__tbody", t.classes.tbody])
        }, [
          (r(), c(k, null, O(6, (o) => f("tr", {
            key: o,
            class: d(["vtd-date__tr", t.classes.tr])
          }, [
            (r(!0), c(k, null, O(i.daysByWeeks[o - 1], (u) => (r(), c("td", {
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
              f("button", {
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
              }, w(u.date.getDate()), 11, it)
            ], 2))), 128))
          ], 2)), 64))
        ], 2)
      ], 10, st)
    ], 42, $e), [
      [ue, n.show]
    ])
  ], 10, qe)), [
    [a, i.onClickout]
  ]);
}
const lt = /* @__PURE__ */ E(We, [["render", at]]);
const ot = {
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
      window.addEventListener("click", e), window.addEventListener("keydown", s), t && document.body.style.setProperty("overflow", "hidden"), this.$nextTick(() => {
        var l;
        return (l = this.$refs.content) == null ? void 0 : l.focus();
      }), this.$emit("open");
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
        const t = Array.from(
          s.querySelectorAll($.join(","))
        );
        if (!t.length) {
          e.preventDefault();
          return;
        }
        if (!s.contains(document.activeElement))
          e.preventDefault(), t[0].focus();
        else {
          const l = t.indexOf(
            document.activeElement
          );
          e.shiftKey && l === 0 && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && l === t.length - 1 && (t[0].focus(), e.preventDefault());
        }
      }
    }
  }
}, rt = { key: 0 };
function dt(e, s, t, l, n, i) {
  return n.localShow || i.slots.toggle ? (r(), c("span", rt, [
    i.slots.toggle ? h(e.$slots, "toggle", y(b({ key: 0 }, {
      on: {
        click: () => n.localShow = !n.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + n.localShow
      }
    }))) : g("", !0),
    F(T, {
      name: t.bgTransition || t.transition,
      appear: !0
    }, {
      default: I(() => [
        n.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-dialog", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          F(T, { name: t.contentTransition }, {
            default: I(() => [
              (r(), L(j(t.tag), {
                ref: "content",
                class: d(["vts-dialog__content", t.classes.content]),
                style: R({
                  width: t.width,
                  "inline-size": t.inlineSize,
                  "max-width": t.maxWidth,
                  "max-inline-size": t.maxInlineSize
                }),
                tabindex: "-1",
                role: "dialog",
                "aria-modal": "true"
              }, {
                default: I(() => [
                  h(e.$slots, "default", y(S({ close: () => n.localShow = !n.localShow })))
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
const ct = /* @__PURE__ */ E(ot, [["render", dt]]);
const ut = "vts-drawer", ft = {
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
      e.target.classList.contains(ut) && (this.localShow = !1);
    },
    onKeydown(e) {
      if (e.keyCode === v.ESC && (this.localShow = !1), e.keyCode === v.TAB) {
        const s = this.$refs.content;
        if (!s)
          return;
        const t = Array.from(
          s.querySelectorAll($.join(","))
        );
        if (!t.length) {
          e.preventDefault();
          return;
        }
        if (!s.contains(document.activeElement))
          e.preventDefault(), t[0].focus();
        else {
          const l = t.indexOf(
            document.activeElement
          );
          e.shiftKey && l === 0 && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && l === t.length - 1 && (t[0].focus(), e.preventDefault());
        }
      }
    }
  }
}, ht = { key: 0 };
function vt(e, s, t, l, n, i) {
  return n.localShow || i.slots.toggle ? (r(), c("span", ht, [
    i.slots.toggle ? h(e.$slots, "toggle", y(b({ key: 0 }, {
      on: {
        click: () => n.localShow = !n.localShow
      },
      bind: {
        type: "button",
        role: "button",
        "aria-haspopup": !0,
        "aria-expanded": "" + n.localShow
      }
    }))) : g("", !0),
    F(T, {
      name: t.bgTransition || t.transition,
      appear: ""
    }, {
      default: I(() => [
        n.localShow ? (r(), c("div", {
          key: 0,
          class: d(["vts-drawer", t.classes.root, t.classes.bg, e.$attrs.class])
        }, [
          F(T, {
            name: t.transition,
            appear: ""
          }, {
            default: I(() => [
              n.localShow ? (r(), L(j(t.tag), {
                key: 0,
                ref: "content",
                class: d([
                  "vts-drawer__content",
                  { "vts-drawer__content--right": !!t.right },
                  t.classes.content
                ]),
                style: R({
                  width: t.width,
                  "inline-size": t.inlineSize,
                  "max-width": t.maxWidth,
                  "max-inline-size": t.maxInlineSize
                }),
                tabindex: "-1"
              }, {
                default: I(() => [
                  h(e.$slots, "default", y(S({ close: () => n.localShow = !n.localShow })))
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
const mt = /* @__PURE__ */ E(ft, [["render", vt]]);
const yt = {
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
}, bt = ["aria-expanded"];
function gt(e, s, t, l, n, i) {
  return r(), c("div", {
    class: d(["vts-dropdown", t.classes.root]),
    onMouseenter: s[1] || (s[1] = (a) => e.isHovered = !0),
    onMouseleave: s[2] || (s[2] = (a) => e.isHovered = !1),
    onFocus: s[3] || (s[3] = (a) => e.isFocused = !0),
    onBlur: s[4] || (s[4] = (a) => e.isFocused = !1),
    onFocusout: s[5] || (s[5] = (...a) => i.onFocusout && i.onFocusout(...a))
  }, [
    f("button", {
      "aria-expanded": !!e.isHovered || !!e.isFocused,
      "aria-haspopup": "true",
      class: d(["vts-dropdown__trigger", t.classes.trigger]),
      type: "button",
      onClick: s[0] || (s[0] = (a) => e.isFocused = !e.isFocused)
    }, [
      h(e.$slots, "trigger", {}, () => [
        D(w(t.text), 1)
      ])
    ], 10, bt),
    F(T, { name: t.transition }, {
      default: I(() => [
        e.isHovered || e.isFocused ? (r(), c("div", {
          key: 0,
          class: d(["vts-dropdown__content", [`vts-dropdown__content--${t.position}`, t.classes.content]])
        }, [
          h(e.$slots, "default")
        ], 2)) : g("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ], 34);
}
const pt = /* @__PURE__ */ E(yt, [["render", gt]]);
const _t = {
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
      default: () => "vts-" + P(4)
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
}, wt = ["for"], kt = ["id"], St = {
  key: 0,
  "aria-hidden": "true"
}, Dt = {
  key: 1,
  "aria-hidden": "true"
};
function Et(e, s, t, l, n, i) {
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
    f("input", b({
      id: t.id,
      ref: "input"
    }, e.$attrs, {
      type: "file",
      class: ["vts-visually-hidden", t.classes.input],
      onChange: s[0] || (s[0] = (...a) => i.onChange && i.onChange(...a))
    }, V(i.listeners, !0)), null, 16, kt),
    f("span", {
      class: d(["vts-file__text", t.classes.text])
    }, [
      h(e.$slots, "label", {}, () => [
        D(w(t.label), 1)
      ])
    ], 2),
    f("div", {
      class: d(["vts-file__dropzone", t.classes.dropzone]),
      onDragenter: s[5] || (s[5] = A((a) => e.droppable = !0, ["prevent"]))
    }, [
      h(e.$slots, "default", y(S({ files: e.localFiles, droppable: e.droppable })), () => [
        e.localFiles.length ? (r(), c("span", St, [
          e.localFiles.length > 1 ? (r(), c(k, { key: 0 }, [
            D(w(e.localFiles.length) + " files selected ", 1)
          ], 64)) : (r(), c(k, { key: 1 }, [
            D(w(e.localFiles[0].name), 1)
          ], 64))
        ])) : (r(), c("span", Dt, " Choose files or drop here "))
      ]),
      e.droppable ? (r(), c("span", {
        key: 0,
        class: d(["vts-file__overlay", t.classes.overlay]),
        onDrop: s[1] || (s[1] = A((...a) => i.onDrop && i.onDrop(...a), ["prevent"])),
        onDragenter: s[2] || (s[2] = A((a) => e.droppable = !0, ["stop"])),
        onDragleave: s[3] || (s[3] = A((a) => e.droppable = !1, ["stop"])),
        onDragover: s[4] || (s[4] = A(() => {
        }, ["prevent"]))
      }, [
        h(e.$slots, "overlay")
      ], 34)) : g("", !0)
    ], 34)
  ], 10, wt);
}
const Vt = /* @__PURE__ */ E(_t, [["render", Et]]), re = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]), Ot = {
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
        const n = {
          ...s[l],
          error: s[l].dirty && !s[l].valid,
          errors: []
        }, i = new Map(Object.entries(t || {}));
        i.forEach((a, o) => {
          if (!n.invalid[o])
            return;
          const u = i.get(o), m = o.replace("length", "Length"), p = typeof u == "string" ? u : u(n._inputEl[m]);
          n.errors.push(p);
        }), e[l] = n;
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
      re.has(e.tagName) && (this.modified = !0);
    },
    validate() {
      const e = this.$el.querySelectorAll("input, textarea, select"), s = {};
      e.forEach((t) => {
        const { name: l, id: n, validity: i } = t, a = l || n;
        if (a)
          switch (s[a] = {
            _inputEl: t,
            valid: i.valid,
            dirty: !1,
            invalid: {
              type: i.typeMismatch,
              required: i.valueMissing,
              minlength: i.tooShort,
              maxlength: i.tooLong,
              min: i.rangeOverflow,
              max: i.rangeUnderflow,
              pattern: i.patternMismatch
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
      re.has(e.tagName) && (this.dirty = !0, this.localInputs[e.name].dirty = !0);
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
}, It = ["method"], Mt = ["name"];
function Ct(e, s, t, l, n, i) {
  return r(), c("form", b({
    method: e.$attrs.method || "POST",
    class: [
      "vts-form",
      {
        "vts-form--invalid": !i.valid,
        "vts-form--dirty": e.dirty,
        "vts-form--error": i.error
      }
    ]
  }, {
    [we(i.event)]: s[0] || (s[0] = (...a) => i.onEvent && i.onEvent(...a))
  }, {
    onKeydown: s[1] || (s[1] = (...a) => i.checkModified && i.checkModified(...a)),
    onChange: s[2] || (s[2] = (...a) => i.checkModified && i.checkModified(...a)),
    onSubmit: s[3] || (s[3] = (...a) => i.onSubmit && i.onSubmit(...a)),
    onBlurCapture: s[4] || (s[4] = (...a) => i.onBlur && i.onBlur(...a))
  }, V(i.listeners, !0)), [
    t.honeypot ? (r(), c("input", {
      key: 0,
      name: typeof t.honeypot == "string" ? t.honeypot : "vts-honeypot",
      class: "visually-hidden",
      tabindex: "-1",
      autocomplete: "off",
      "aria-hidden": "true"
    }, null, 8, Mt)) : g("", !0),
    h(e.$slots, "default", y(S({ valid: i.valid, dirty: e.dirty, modified: e.modified, error: i.error, inputs: i.inputs, clear: i.clear, validate: i.validate })))
  ], 16, It);
}
const Pt = /* @__PURE__ */ E(Ot, [["render", Ct]]);
const W = "vts-img", Lt = {
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
      e.isIntersecting && (s.classList.add(`${W}--loading`), this.loadImg(), this.observer.disconnect());
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
      e.classList.remove(`${W}--loading`), e.classList.add(`${W}--loaded`), t && s.addEventListener("transitionend", function l() {
        t.remove(), s.removeEventListener("transitionend", l);
      }), s.removeEventListener("load", this.onLoad);
    }
  }
}, Tt = /* @__PURE__ */ f("noscript", null, `
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
    `, -1), Ft = ["src", "decoding"], Bt = ["src", "alt", "decoding", "role"];
function At(e, s, t, l, n, i) {
  return r(), c("picture", {
    class: d(["vts-img", t.classes.root])
  }, [
    Tt,
    e.dataUrl ? (r(), c("div", {
      key: 0,
      ref: "placeholder",
      class: d(["vts-img__placeholder", t.classes.placeholder]),
      style: R({ background: t.background })
    }, [
      f("img", b({
        src: t.placeholder || e.dataUrl,
        alt: ""
      }, e.$attrs, {
        decoding: e.$attrs.decoding || "async"
      }), null, 16, Ft)
    ], 6)) : g("", !0),
    f("img", b({
      ref: "img",
      src: e.dataUrl,
      class: ["vts-img__img", t.classes.img],
      alt: t.alt,
      style: {
        transitionDuration: `${t.transitionDuration}ms`
      },
      decoding: e.$attrs.decoding || "async",
      role: e.$attrs.role || t.alt ? null : "presentation"
    }, e.$attrs, V(i.listeners, !0)), null, 16, Bt)
  ], 2);
}
const xt = /* @__PURE__ */ E(Lt, [["render", At]]), de = {
  type: [String, Number, Boolean, Array],
  default: void 0
};
function ce(e, s) {
  e !== s && (this.localValue = e);
}
const Nt = {
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
    value: de,
    modelValue: de,
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
      const { id: e, name: s, valid: t, dirty: l, error: n, errorMessages: i, classes: a, $attrs: o } = this, { class: u, ...m } = o, p = [];
      return n && p.push(`${e}__description`), i.length && p.push(`${e}__errors`), {
        "aria-invalid": !t,
        "aria-describedby": l && p.length ? p.join(" ") : null,
        ...m,
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
      return K(l, "object") && (l = Object.entries(l).map(([n, i]) => ({
        value: n,
        label: i
      }))), l.map((n) => {
        if (n = K(n, "object") ? n : { value: n }, Object.assign(n, e, {
          label: n.label || n.value,
          value: n.value
        }), t === "checkbox") {
          const i = s || [];
          n.checked = i.includes(n.value) || n.checked;
        } else
          s !== void 0 && typeof s == "string" && (n.checked = n.value === s || n.checked);
        return n;
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
      return Object.keys(s || {}).forEach((n) => {
        if (!e[n])
          return;
        const i = s[n], a = K(i, "function") ? i(t[n]) : i;
        l.push(a);
      }), l;
    }
  },
  watch: {
    modelValue: ce,
    value: ce,
    localValue(e) {
      this.$emit("update:modelValue", e), this.validate();
    }
  },
  created() {
    this.id = this.$attrs.id || "vts-" + P(4);
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
      const n = [...this.localValue || []], i = n.indexOf(t);
      i === -1 ? n.push(t) : n.splice(i, 1), this.localValue = n;
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
}, jt = ["id", "type"], zt = ["for"], Ut = ["checked"], Ht = ["for"], Yt = ["for"], Kt = ["type"], Wt = ["id"], qt = ["id"];
function Rt(e, s, t, l, n, i) {
  return r(), c("div", {
    class: d([
      "vts-input",
      `vts-input--${t.type}`,
      {
        "vts-input--required": e.$attrs.hasOwnProperty("required"),
        "vts-input--invalid": !n.valid,
        "vts-input--dirty": n.dirty,
        "vts-input--error": i.error
      },
      e.$attrs.class,
      t.classes.root
    ])
  }, [
    ["radio", "checkbox"].includes(t.type) && i.computedOptions.length ? (r(), c("fieldset", {
      key: 0,
      class: d(["vts-input__fieldset", t.classes.fieldset])
    }, [
      t.label ? (r(), c("legend", {
        key: 0,
        class: d(["vts-input__legend", t.classes.legend])
      }, [
        h(e.$slots, "label", y(S({
          valid: n.valid,
          dirty: n.dirty,
          error: i.error,
          invalid: n.invalid,
          anyInvalid: n.anyInvalid,
          errors: i.errorMessages
        })), () => [
          D(w(t.label), 1)
        ])
      ], 2)) : g("", !0),
      f("div", {
        class: d(["vts-input__fieldset-items", t.classes.fieldsetItems])
      }, [
        (r(!0), c(k, null, O(i.computedOptions, (a, o) => (r(), c("div", {
          key: a.value,
          class: d(["vts-input__fieldset-item", t.classes.fieldsetItem])
        }, [
          f("input", b({ ...i.bind, ...a }, {
            id: `${e.id}__input-${o}`,
            ref_for: !0,
            ref: "input",
            type: t.type,
            onInput: s[0] || (s[0] = (...u) => i.onFieldsetInput && i.onFieldsetInput(...u)),
            onBlurOnce: s[1] || (s[1] = (u) => n.dirty = !0)
          }, V(i.listeners, !0)), null, 16, jt),
          f("label", {
            for: `${e.id}__input-${o}`,
            class: d(["vts-input__label", t.classes.label])
          }, w(a.label), 11, zt)
        ], 2))), 128))
      ], 2)
    ], 2)) : t.type === "checkbox" ? (r(), c(k, { key: 1 }, [
      f("input", b({
        ref: "input",
        checked: n.localValue === void 0 ? e.$attrs.checked : n.localValue,
        type: "checkbox"
      }, i.bind, {
        onChange: s[2] || (s[2] = (a) => n.localValue = a.target.checked),
        onBlurOnce: s[3] || (s[3] = (a) => n.dirty = !0)
      }, V(i.listeners, !0)), null, 16, Ut),
      f("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, [
        h(e.$slots, "label", y(S({
          valid: n.valid,
          dirty: n.dirty,
          error: i.error,
          invalid: n.invalid,
          anyInvalid: n.anyInvalid,
          errors: i.errorMessages
        })), () => [
          D(w(t.label), 1)
        ])
      ], 10, Ht)
    ], 64)) : (r(), c(k, { key: 2 }, [
      f("label", {
        for: `${e.id}__input`,
        class: d(["vts-input__label", t.classes.label])
      }, [
        h(e.$slots, "label", y(S({
          valid: n.valid,
          dirty: n.dirty,
          error: i.error,
          invalid: n.invalid,
          anyInvalid: n.anyInvalid,
          errors: i.errorMessages
        })), () => [
          D(w(t.label), 1)
        ])
      ], 10, Yt),
      t.type === "select" ? N((r(), c("select", b({
        key: 0,
        ref: "input",
        "onUpdate:modelValue": s[4] || (s[4] = (a) => n.localValue = a)
      }, i.bind, {
        onInput: s[5] || (s[5] = (...a) => i.onSelect && i.onSelect(...a)),
        onChange: s[6] || (s[6] = (...a) => i.onSelect && i.onSelect(...a)),
        onBlurOnce: s[7] || (s[7] = (a) => n.dirty = !0)
      }, V(i.listeners, !0)), [
        h(e.$slots, "options", {}, () => [
          (r(!0), c(k, null, O(i.computedOptions, (a) => (r(), c("option", b({
            key: a.value
          }, a, { label: null }), w(a.label), 17))), 128))
        ])
      ], 16)), [
        [ke, n.localValue]
      ]) : t.type === "textarea" ? N((r(), c("textarea", b({
        key: 1,
        ref: "input",
        "onUpdate:modelValue": s[8] || (s[8] = (a) => n.localValue = a)
      }, i.bind, {
        onBlurOnce: s[9] || (s[9] = (a) => n.dirty = !0)
      }, V(i.listeners, !0)), null, 16)), [
        [Se, n.localValue]
      ]) : N((r(), c("input", b({
        key: 2,
        ref: "input",
        "onUpdate:modelValue": s[10] || (s[10] = (a) => n.localValue = a),
        type: t.type
      }, i.bind, {
        onBlurOnce: s[11] || (s[11] = (a) => n.dirty = !0)
      }, V(i.listeners, !0)), null, 16, Kt)), [
        [De, n.localValue]
      ])
    ], 64)),
    i.slots.description ? (r(), c("div", {
      key: 3,
      id: `${e.id}__description`,
      class: d(["vts-input__description", t.classes.description])
    }, [
      h(e.$slots, "description", y(S({
        valid: n.valid,
        dirty: n.dirty,
        error: i.error,
        invalid: n.invalid,
        anyInvalid: n.anyInvalid,
        errors: i.errorMessages
      })))
    ], 10, Wt)) : g("", !0),
    n.dirty && i.errorMessages.length ? (r(), c("div", {
      key: 4,
      id: `${e.id}__errors`,
      class: d(["vts-input__errors", t.classes.errors])
    }, [
      (r(!0), c(k, null, O(i.errorMessages, (a) => (r(), c("span", {
        key: a,
        class: d(["vts-input__error", t.classes.error])
      }, w(a), 3))), 128))
    ], 10, qt)) : g("", !0)
  ], 2);
}
const Gt = /* @__PURE__ */ E(Nt, [["render", Rt]]), $t = {
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
    const { root: s, threshold: t, rootMargin: l, options: n, handler: i } = this, a = {
      ...n,
      root: s,
      threshold: t,
      rootMargin: l
    };
    this.observer = new IntersectionObserver(i, a), this.observer.observe(e);
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
const x = G({
  notifications: []
});
function Jt(e) {
  typeof e == "string" && (e = {
    text: e
  }), e = {
    id: `vts_${P(4)}`,
    persistent: void 0,
    timeout: void 0,
    ...e
  }, x.notifications.push(e);
}
const Xt = {
  props: {
    timeout: {
      type: [String, Number],
      default: 0
    },
    persistent: {
      type: Boolean,
      default: !1
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
  computed: {
    notifications() {
      const { persistent: e } = this;
      return x.notifications.map((s) => (s.persistent == null && (s.persistent = e), s));
    }
  },
  watch: {
    "notifications.length": {
      handler(e, s) {
        if (s > e)
          return;
        const t = x.notifications[e - 1];
        let l = Number(this.timeout);
        t.timeout != null && (l = Number(t.timeout)), l && (t.timeoutId = setTimeout(() => {
          this.remove(t);
        }, l));
      }
    }
  },
  unmounted() {
    for (const e of x.notifications)
      e.timeoutId && clearTimeout(e.timeoutId);
  },
  methods: {
    remove: (e) => {
      const s = x.notifications.findIndex(
        (t) => t.id === e.id
      );
      x.notifications.splice(s, 1);
    }
  }
}, Qt = ["onClick"], Zt = /* @__PURE__ */ f("span", { class: "vts-visually-hidden" }, "Remove notification", -1);
function es(e, s, t, l, n, i) {
  return r(), c("ul", {
    class: d(["vts-notifications", t.classes.root])
  }, [
    F(Ee, { name: t.transition }, {
      default: I(() => [
        (r(!0), c(k, null, O(i.notifications, (a) => (r(), c("li", {
          key: a.id,
          class: d(["vts-notification", t.classes.notification])
        }, [
          f("span", {
            role: "alert",
            class: d(["vts-notification__text", t.classes.text])
          }, w(a.text), 3),
          a.persistent ? g("", !0) : (r(), c("button", {
            key: 0,
            class: d(["vts-notification__dismiss", t.classes.dismiss]),
            onClick: (o) => i.remove(a)
          }, [
            D(" × "),
            Zt
          ], 10, Qt))
        ], 2))), 128))
      ]),
      _: 1
    }, 8, ["name"])
  ], 2);
}
const ts = /* @__PURE__ */ E(Xt, [["render", es]]), ss = {
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
function ns(e, s, t, l, n, i) {
  return r(), L(j(t.tag), { class: "vts-resize" }, {
    default: I(() => [
      h(e.$slots, "default", y(S({ width: e.width, height: e.height, inlineSize: e.width, blockSize: e.height })))
    ]),
    _: 3
  });
}
const is = /* @__PURE__ */ E(ss, [["render", ns]]);
const as = {
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
}, ls = ["href"];
function os(e, s, t, l, n, i) {
  return r(), c("a", {
    class: "vts-skip",
    href: t.to,
    onClick: s[0] || (s[0] = (a) => i.skipTo(t.to))
  }, [
    h(e.$slots, "default", {}, () => [
      D("Skip to main content")
    ])
  ], 8, ls);
}
const rs = /* @__PURE__ */ E(as, [["render", os]]);
const ds = {
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
      default: "vts-" + P(4)
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
      const { headers: e, sortable: s, localSortBy: t, localSortDirection: l } = this, n = [];
      return e.forEach((i) => {
        const a = {
          ...i,
          bind: {},
          sortBtn: {
            bind: { "aria-label": "toggle sort direction" },
            on: { click: () => this.onSort(i.key) }
          }
        };
        a.sortable === void 0 && (a.sortable = !!a.sort || s), a.sortable && t === i.key && l && (l === "ASC" ? a.bind["aria-sort"] = "ascending" : a.bind["aria-sort"] = "descending"), n.push(a);
      }), n;
    },
    computedItems() {
      const {
        computedHeaders: e,
        items: s,
        localSortBy: t,
        localSortDirection: l,
        localPage: n,
        localPerPage: i
      } = this;
      let a = [...s];
      if (t && l) {
        const o = e.find((m) => m.key === t);
        let u = this.defaultComparisonFn;
        typeof o.sort == "function" && (u = o.sort), a = a.sort((m, p) => u(m, p, l === "ASC"));
      }
      if (i > -1) {
        const o = (Math.max(n, 1) - 1) * i;
        a = a.slice(o, o + i);
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
      const { localSortBy: l } = this, n = t ? 1 : -1, i = e[l], a = s[l];
      return Number.isFinite(i) && Number.isFinite(a) ? (i - a) * n : i < a ? -1 * n : i > a ? 1 * n : 0;
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
}, cs = ["id"], us = ["disabled"], fs = ["disabled", "aria-label", "onClick"], hs = ["disabled"];
function vs(e, s, t, l, n, i) {
  return r(), c("div", {
    ref: "container",
    role: "region",
    "aria-labelledby": "caption",
    class: d(["vts-table", { "vts-table--sortable": t.sortable }, t.classes.root])
  }, [
    f("table", {
      class: d([t.classes.table])
    }, [
      h(e.$slots, "default", y(S({
        caption: t.caption,
        headers: i.computedHeaders,
        items: i.computedItems,
        sortBy: n.localSortBy,
        sortDirection: n.localSortDirection,
        page: n.localPage,
        perPage: n.localPerPage
      })), () => [
        t.caption ? (r(), c("caption", {
          key: 0,
          id: `${t.id}__caption`,
          class: d([t.classes.caption])
        }, w(t.caption), 11, cs)) : g("", !0),
        i.computedHeaders.length ? (r(), c("thead", {
          key: 1,
          class: d([t.classes.thead])
        }, [
          f("tr", {
            class: d([t.classes.tr])
          }, [
            (r(!0), c(k, null, O(i.computedHeaders, (a, o) => (r(), c("th", b({
              key: a.key
            }, a.bind, {
              class: [t.classes.th]
            }), [
              h(e.$slots, `header.${a.key}`, y(S({
                header: a,
                index: o
              })), () => [
                D(w(a.text || a.key) + " ", 1),
                a.sortable ? (r(), c(k, { key: 0 }, [
                  a.key === n.localSortBy && n.localSortDirection === "ASC" ? h(e.$slots, "sort-asc", y(b({ key: 0 }, a.sortBtn)), () => [
                    f("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--asc",
                        t.classes.sortBtn
                      ]
                    }, a.sortBtn.bind, { type: "button" }, V(a.sortBtn.on, !0)), " ↑ ", 16)
                  ]) : a.key === n.localSortBy && n.localSortDirection === "DESC" ? h(e.$slots, "sort-desc", y(b({ key: 1 }, a.sortBtn)), () => [
                    f("button", b({
                      class: [
                        "vts-table__sort-btn",
                        "vts-table__sort-btn--desc",
                        t.classes.sortBtn
                      ]
                    }, a.sortBtn.bind, { type: "button" }, V(a.sortBtn.on, !0)), " ↓ ", 16)
                  ]) : h(e.$slots, "sort-none", y(b({ key: 2 }, a.sortBtn)), () => [
                    f("button", b({
                      class: ["vts-table__sort-btn", t.classes.sortBtn]
                    }, a.sortBtn.bind, { type: "button" }, V(a.sortBtn.on, !0)), " ↕ ", 16)
                  ])
                ], 64)) : g("", !0)
              ])
            ], 16))), 128))
          ], 2)
        ], 2)) : g("", !0),
        f("tbody", {
          class: d([t.classes.tbody])
        }, [
          h(e.$slots, "body", y(S({
            items: i.computedItems,
            sortBy: n.localSortBy,
            sortDirection: n.localSortDirection,
            page: n.localPage,
            perPage: n.localPerPage
          })), () => [
            (r(!0), c(k, null, O(i.computedItems, (a, o) => (r(), c("tr", {
              key: a.id,
              class: d(["vts-table__row", t.classes.tr])
            }, [
              h(e.$slots, "row", y(S({ item: a, index: o, row: o + 1 })), () => [
                (r(!0), c(k, null, O(i.computedHeaders, (u) => (r(), c("td", {
                  key: u.key,
                  class: d([t.classes.td])
                }, [
                  h(e.$slots, `column.${u.key}`, y(S({
                    item: a,
                    index: (n.localPage - 1) * n.localPerPage + o,
                    row: o + 1,
                    key: u.key,
                    column: u.key,
                    value: a[u.key],
                    cell: a[u.key],
                    data: a[u.key]
                  })), () => [
                    D(w(a[u.key]), 1)
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
          h(e.$slots, "tfoot")
        ], 2)) : g("", !0)
      ])
    ], 2),
    h(e.$slots, "pagination", y(S({ page: n.localPage, perPage: n.localPerPage, lastPage: i.lastPage, goToPage: i.goToPage })), () => [
      i.lastPage > 1 ? (r(), c("div", {
        key: 0,
        class: d(["vts-table__pagination", t.classes.pagination])
      }, [
        f("button", {
          disabled: n.localPage === 1,
          "aria-label": "go to previous page",
          class: d(["vts-table__prev", t.classes.previous]),
          type: "button",
          onClick: s[0] || (s[0] = (a) => i.goToPage(n.localPage - 1))
        }, " Prev ", 10, us),
        f("ul", {
          class: d(["vts-table__pages", t.classes.pageList])
        }, [
          (r(!0), c(k, null, O(i.lastPage, (a) => (r(), c("li", {
            key: a,
            class: d([
              "vts-table__page-item",
              { "vts-table__page-item--current": a === n.localPage },
              t.classes.pageItem
            ])
          }, [
            f("button", {
              disabled: a === n.localPage,
              "aria-label": `go to page ${a}`,
              class: d([
                "vts-table__page",
                { "vts-table__page--current": a === n.localPage },
                t.classes.page
              ]),
              type: "button",
              onClick: (o) => i.goToPage(a)
            }, w(a), 11, fs)
          ], 2))), 128))
        ], 2),
        f("button", {
          disabled: n.localPage === i.lastPage,
          "aria-label": "go to next page",
          class: d(["vts-table__next", t.classes.next]),
          type: "button",
          onClick: s[1] || (s[1] = (a) => i.goToPage(n.localPage + 1))
        }, " Next ", 10, hs)
      ], 2)) : g("", !0)
    ])
  ], 2);
}
const ms = /* @__PURE__ */ E(ds, [["render", vs]]), ys = {
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
    this.id = this.$attrs.id || `vts-${P(4)}`;
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
      const l = this.activeIndex, n = this.tabList.length, i = l + t[s];
      i < 0 ? this.activeIndex = n - 1 : i >= n ? this.activeIndex = 0 : this.activeIndex = i;
    },
    setFocus() {
      const { $refs: e, tabList: s, activeIndex: t } = this, l = s[t];
      return e[l][0].focus();
    }
  }
}, bs = ["aria-label", "aria-orientation"], gs = ["id", "aria-selected", "tabindex", "aria-controls", "onClick"], ps = ["id", "aria-labelledby", "hidden"];
function _s(e, s, t, l, n, i) {
  return r(), c("div", {
    class: d(["vts-tabs", t.classes.root])
  }, [
    f("div", {
      role: "tablist",
      "aria-label": t.label,
      "aria-orientation": t.orientation,
      class: d(["vts-tabs__tablist", t.classes.tablist])
    }, [
      (r(!0), c(k, null, O(i.tabList, (a, o) => (r(), c("button", {
        id: `${e.id}-${a}`,
        key: a,
        ref_for: !0,
        ref: a,
        "aria-selected": o === n.activeIndex,
        tabindex: o === n.activeIndex ? null : -1,
        "aria-controls": `${e.id}-${a.replace("tab", "panel")}`,
        class: d([
          `vts-tabs__tab vts-tabs__tab--${a} vts-tabs__tab--${o}`,
          {
            "vts-tabs__tab--active": o === n.activeIndex,
            [t.classes.tabActive]: o === n.activeIndex
          },
          t.classes.tab
        ]),
        role: "tab",
        type: "button",
        onKeydown: s[0] || (s[0] = (...u) => i.onKeydown && i.onKeydown(...u)),
        onClick: (u) => i.onClick(u, a, o)
      }, [
        h(e.$slots, a)
      ], 42, gs))), 128))
    ], 10, bs),
    (r(!0), c(k, null, O(i.panelList, (a, o) => (r(), c("div", {
      id: `${e.id}-panel-${o}`,
      key: a,
      "aria-labelledby": `${e.id}-tab-${o}`,
      hidden: o !== n.activeIndex,
      class: d([
        `vts-tabs__panel vts-tabs__panel--${o}`,
        {
          "vts-tabs__panel--active": o === n.activeIndex,
          [t.classes.panelActive]: o === n.activeIndex
        },
        t.classes.panel
      ]),
      tabindex: "0",
      role: "tabpanel"
    }, [
      h(e.$slots, a)
    ], 10, ps))), 128))
  ], 2);
}
const ws = /* @__PURE__ */ E(ys, [["render", _s]]);
const ks = {
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
    this.id = e || `vts-${P(4)}`;
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
}, Ss = ["id", "disabled", "aria-controls", "aria-expanded"], Ds = ["id", "aria-labelledby", "aria-hidden"];
function Es(e, s, t, l, n, i) {
  return r(), c("div", {
    class: d(["vts-toggle", { "vts-toggle--open": n.isOpen }, t.classes.root])
  }, [
    f("button", b({
      id: `${e.id}-label`,
      ref: "label",
      type: "button",
      disabled: t.disabled,
      "aria-controls": `${e.id}-content`,
      "aria-expanded": n.isOpen,
      class: ["vts-toggle__label", t.classes.label],
      onClick: s[0] || (s[0] = (a) => n.isOpen = !n.isOpen)
    }, V(i.listeners, !0)), [
      D(w(t.label) + " ", 1),
      h(e.$slots, "label", y(S({ isOpen: n.isOpen })))
    ], 16, Ss),
    F(T, {
      onBeforeEnter: i.collapse,
      onEnter: i.expand,
      onAfterEnter: i.resetHeight,
      onBeforeLeave: i.expand,
      onLeave: i.collapse
    }, {
      default: I(() => [
        N(f("div", {
          id: `${e.id}-content`,
          "aria-labelledby": `${e.id}-label`,
          "aria-hidden": !n.isOpen,
          role: "region",
          class: d(["vts-toggle__content", t.classes.content])
        }, [
          h(e.$slots, "default", y(S({ isOpen: n.isOpen })))
        ], 10, Ds), [
          [ue, n.isOpen && !t.disabled]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])
  ], 2);
}
const Vs = /* @__PURE__ */ E(ks, [["render", Es]]);
const Os = {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    id: {
      type: String,
      default: () => `vts-${P(4)}`
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
}, Is = ["id", "aria-hidden"];
function Ms(e, s, t, l, n, i) {
  return r(), L(j(t.tag), {
    id: t.id,
    tabindex: "0",
    "aria-describedby": `${t.id}__content`,
    class: d(["vts-tooltip", t.classes.toggle]),
    onFocus: s[0] || (s[0] = (a) => e.show = !0),
    onBlur: s[1] || (s[1] = (a) => e.show = !1),
    onMouseenter: i.onMouseenter,
    onMouseleave: i.onMouseleave
  }, {
    default: I(() => [
      h(e.$slots, "default"),
      f("span", {
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
        h(e.$slots, "tooltip")
      ], 10, Is)
    ]),
    _: 3
  }, 40, ["id", "aria-describedby", "class", "onMouseenter", "onMouseleave"]);
}
const Cs = /* @__PURE__ */ E(Os, [["render", Ms]]), Ps = {
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
}, me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert: Pe,
  VAsync: Le,
  VBtn: xe,
  VDate: lt,
  VDialog: ct,
  VDrawer: mt,
  VDropdown: pt,
  VFile: Vt,
  VForm: Pt,
  VImg: xt,
  VInput: Gt,
  VIntersect: $t,
  VNotifications: ts,
  VResize: is,
  VSkip: rs,
  VTable: ms,
  VTabs: ws,
  VToggle: Vs,
  VTooltip: Cs,
  VTry: Ps
}, Symbol.toStringTag, { value: "Module" })), Ls = (e) => e[0].toUpperCase() + e.slice(1);
function Ts(e, s, t = navigator.language) {
  return new Intl.NumberFormat(t, {
    style: "currency",
    currency: s
  }).format(e);
}
function Fs(e, s = navigator.language) {
  return new Intl.NumberFormat(s).format(e);
}
const Bs = (e, s) => e || s;
function As(e, s, t) {
  return t !== 1 ? s : e;
}
function xs(e, s = 100, t = "...") {
  return e.length > s ? e.substring(0, s - t.length) + t : e;
}
const ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ls,
  currency: Ts,
  number: Fs,
  placeholder: Bs,
  plural: As,
  truncate: xs
}, Symbol.toStringTag, { value: "Module" }));
function zs(e, s = {}) {
  const t = G({
    pending: !1,
    results: s.placeholder || null,
    error: null
  }), l = async function(i) {
    if (i = typeof i == "function" ? i() : i, !(!i || !i.then)) {
      t.pending = !0, s.onChange && s.onChange({
        pending: t.pending,
        results: t.results,
        error: t.error
      }), s.onPending && s.onPending(t.pending);
      try {
        const a = await i;
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
const Us = (e, s = {}) => {
  const l = G({
    invalid: !1,
    dirty: !1,
    error: !1,
    inputs: {}
  }), n = new Map(Object.entries(s.errors || {})), i = async (m) => {
    if (!m)
      return;
    await X(), l.invalid = !m.checkValidity();
    const p = m.querySelectorAll("input, textarea, select"), _ = {};
    p.forEach((M) => {
      const { name: B, id: be, validity: C } = M, z = B || be;
      if (!z)
        return;
      const U = {
        value: M.value,
        valid: C.valid,
        dirty: !1,
        invalid: {
          type: C.typeMismatch,
          required: C.valueMissing,
          minlength: C.tooShort,
          maxlength: C.tooLong,
          min: C.rangeOverflow,
          max: C.rangeUnderflow,
          pattern: C.patternMismatch
        },
        errors: []
      };
      n.forEach((Ns, H) => {
        if (!U.invalid[H])
          return;
        const Y = n.get(H), ge = H.replace("length", "Length"), pe = typeof Y == "string" ? Y : Y(M[ge]);
        U.errors.push(pe);
      }), U.dirty = l.inputs[z] ? l.inputs[z].dirty : !1, _[z] = U;
    }), l.inputs = _;
  }, a = () => i(e.value), o = (m) => {
    i(e.value);
    const p = m.target, _ = p.name || p.id;
    l.dirty = !0, _ && l.inputs[_] && (l.inputs[_].dirty = !0);
  }, u = new MutationObserver(a);
  return Ve(e, async (m, p, _) => {
    m && (await X(), i(m), m.addEventListener("input", a), m.addEventListener("blur", o, {
      capture: !0
    }), u.observe(m, {
      childList: !0,
      subtree: !0
    }), _(() => {
      m.removeEventListener("input", a), m.removeEventListener("blur", o), u.disconnect();
    }));
  }), l.error = Oe(() => l.invalid && l.dirty), l.validate = () => i(e.value), l.reset = () => {
    l.dirty = !1, i(e.value);
  }, l.clear = () => {
    e.value.querySelectorAll("input, textarea, select").forEach((_) => {
      _.value = "";
    });
  }, l;
}, Hs = me, Ys = ve, Ks = ye, Ws = {
  install(e, s = {}) {
    s.components && (Array.isArray(s.components) && (s.components = s.components.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.components).forEach((t) => {
      const [l, n] = t, i = me[l], a = typeof n == "boolean" && n.name || l;
      e.component(a, i), l === "VNotifications" && (e.config.globalProperties.$vnotify = Jt);
    })), s.directives && (Array.isArray(s.directives) && (s.directives = s.directives.reduce(
      (t, l) => (t[l] = !0, t),
      {}
    )), Object.entries(s.directives).forEach((t) => {
      const [l] = t, n = ve[l];
      e.directive(l, n);
    })), s.filters && (Array.isArray(s.filters) && (s.filters = s.filters.reduce((t, l) => (t[l] = !0, t), {})), Object.entries(s.filters).forEach((t) => {
      const [l] = t, n = ye[l];
      e.filter(l, n);
    }));
  }
};
export {
  Pe as VAlert,
  Le as VAsync,
  xe as VBtn,
  lt as VDate,
  ct as VDialog,
  mt as VDrawer,
  pt as VDropdown,
  Vt as VFile,
  Pt as VForm,
  xt as VImg,
  Gt as VInput,
  $t as VIntersect,
  ts as VNotifications,
  is as VResize,
  rs as VSkip,
  ms as VTable,
  ws as VTabs,
  Vs as VToggle,
  Cs as VTooltip,
  Ps as VTry,
  Ne as autofocus,
  Ls as capitalize,
  fe as clickout,
  Hs as components,
  je as copy,
  Ts as currency,
  Ws as default,
  Ys as directives,
  Ks as filters,
  ze as focusout,
  Ue as intersect,
  Fs as number,
  Bs as placeholder,
  As as plural,
  xs as truncate,
  zs as useAsync,
  Us as useForm
};
