//

/**
 * A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.
 */
var script = {
  model: {
    prop: "visible",
    event: "update",
  },

  props: {
    /**
     * HTML tag used to wrap the component.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Determines whether the alert is visible. Also binds with `v-model`.
     */
    visible: {
      type: [Boolean, Number],
      default: true,
    },
    /**
     * Allows a user to dismiss this alert.
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Aria-label that is not visibly, but screen readers will read for the dismiss button.
     */
    dismissLabel: {
      type: [String, Boolean],
      default: "Dismiss this alert",
    },
    /**
     * The transition name if you want to add one.
     */
    transition: String,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    dismissed: false,
    timerId: null,
  }); },

  watch: {
    visible: {
      handler: function handler(next) {
        if (!!next) {
          this.dismissed = false;
        }
        if (typeof this.visible === "number") {
          this.clearTimer(); // Clear timers in case this.visible watcher adds multiples
          this.countdown();
        }
      },
      immediate: true,
    },
  },

  methods: {
    dismiss: function dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       * @event dismiss
       * @type { undefined }
       */
      this.$emit("dismiss");
      this.dismissed = true;
      if (typeof this.visible === "number") {
        this.$emit("update", 0);
        this.clearTimer();
      } else {
        this.$emit("update", false);
      }
    },

    countdown: function countdown() {
      var this$1 = this;

      if (this.visible <= 0) { return }

      this.timerId = setTimeout(function () {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         * @event update
         * @type { boolean/number }
         */
        this$1.$emit("update", this$1.visible - 1);
      }, 1000);
    },

    clearTimer: function clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
  },

  beforeDestroy: function beforeDestroy() {
    this.clearTimer();
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[(!_vm.dismissed && !!_vm.visible)?_c(_vm.tag,{tag:"component",class:['vts-alert', _vm.classes.root],attrs:{"role":"alert"}},[_vm._t("default"),_vm._v(" "),(_vm.dismissible)?_c('button',{class:['vts-alert__dismiss', _vm.classes.dismiss],attrs:{"aria-label":_vm.dismissLabel},on:{"click":_vm.dismiss}},[_vm._t("dismiss",[_vm._v("×")])],2):_vm._e()],2):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VAlert = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

function randomString(
  length,
  allowed
) {
  if ( length === void 0 ) length = 10;
  if ( allowed === void 0 ) allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var result = "";
  for (var i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result
}

function safeSlot(h, slot) {
  if (slot && slot.length > 1) {
    return h("div", [slot])
  }
  return slot
}

//
/**
 * A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.
 */
var script$1 = {
  props: {
    /**
     * A promise or function that returns a promise.
     */
    await: {
      type: [Promise, Function],
      default: function () { return Promise.resolve(); },
    },
    /**
     * The default value to provide for the `results`. Useful if the promise resolve value is undefined.
     */
    default: {
      type: undefined,
      default: undefined,
    },
  },

  data: function data() {
    return {
      pending: false,
      results: this.default,
      error: null,
    }
  },

  watch: {
    await: {
      handler: "awaitOn",
      immediate: true,
    },

    pending: {
      handler: function handler(pending) {
        /**
         * Fired whenever the pending status changes.
         * @event pending
         * @type { boolean }
         */
        this.$emit("pending", pending);
      },
      immediate: true,
    },
  },

  methods: {
    awaitOn: function awaitOn(promise) {
      var this$1 = this;

      if (!promise) { return }

      promise = typeof promise === "function" ? promise() : promise;

      if (!promise.then) { return }

      this.pending = true;
      this.results = this.default;
      this.error = null;

      return promise
        .then(function (results) {
          this$1.results = results;
          /**
           * Fired after promise has resolved with the resolved value.
           * @event resolve
           * @type { unknown }
           */
          this$1.$emit("resolve", this$1.results);
        })
        .catch(function (error) {
          this$1.error = error;
          /**
           * Fired after promise has rejected with the rejected error.
           * @event reject
           * @type { error }
           */
          this$1.$emit("reject", error);
        })
        .finally(function () {
          this$1.pending = false;
          /**
           * Fired after promise has fulfilled, regardless of success or failure.
           * @event finally
           * @type { undefined }
           */
          this$1.$emit("finally");
        })
    },
  },

  render: function render(h) {
    var pending = this.pending;

    if (pending && this.$scopedSlots.pending) {
      /** @slot Rendered while the promise is in a pending state */
      var pendingSlot = this.$scopedSlots.pending();
      return safeSlot(h, pendingSlot)
    }

    var error = this.error;

    if (!pending && error && this.$scopedSlots.rejected) {
      /** @slot Rendered when the promise has rejected. Provides the caught error. */
      var rejectSlot = this.$scopedSlots.rejected(error);
      return safeSlot(h, rejectSlot)
    }

    var results = this.results === undefined ? this.default : this.results;

    if (!pending && this.$scopedSlots.resolved) {
      /** @slot Rendered when the promise has resolved. Provides the results. */
      var resolveSlot = this.$scopedSlots.resolved(results);
      return safeSlot(h, resolveSlot)
    }

    if (!this.$scopedSlots.default) { return }

    /** @slot Provides the status of the component for pending state, error, or results. */
    var defaultSlot = this.$scopedSlots.default({
      pending: pending,
      results: results,
      error: error,
    });
    return safeSlot(h, defaultSlot)
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VAsync = normalizeComponent_1(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var keycodes = {
  ENTER: 13,
  SPACE: 32,
  TAB: 9,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var FOCUSABLE = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])'
];

//

var NAME = "vts-drawer";

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
var script$2 = {
  model: {
    prop: "showing",
    event: "update",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    tag: {
      type: String,
      default: "aside",
    },
    /**
     * Flag to place the drawer on the right side.
     */
    right: Boolean,
    /**
     * CSS width value.
     */
    width: String,
    /**
     * CSS max-width value.
     */
    maxWidth: String,
    /**
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: String,
    /**
     * Vue transition name for the background.
     */
    bgTransition: String,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  methods: {
    onBgClick: function onBgClick(e) {
      if (event.target.classList.contains(("" + NAME))) {
        this.hide();
      }
    },

    show: function show() {
      /**
       * @event open
       * @type { undefined }
       */
      this.$emit("open");
      this.$emit("update", true);
    },

    hide: function hide() {
      /**
       * @event close
       * @type { undefined }
       */
      this.$emit("close");
      this.$emit("update", false);
    },

    toggle: function toggle() {
      var event = this.showing ? "close" : "open";
      this.$emit(event, !this.showing);
      /**
       * @event update
       * @type { boolean }
       */
      this.$emit("update", !this.showing);
    },

    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.hide();
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          var focusedItemIndex = focusable.indexOf(document.activeElement);

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
    },
  },

  watch: {
    showing: {
      handler: function(next, prev) {
        var this$1 = this;

        if (next && next != prev) {
          this.noScroll && document.body.style.setProperty("overflow", "hidden");
          this.$nextTick(function () {
            this$1.$refs.content.focus();
          });
        } else {
          this.noScroll && document.body.style.removeProperty("overflow");
        }
      },
    },
  },
};

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.bgTransition,"appear":""}},[(_vm.showing)?_c('div',{class:['vts-drawer', _vm.classes.root],on:{"click":_vm.onBgClick,"keydown":_vm.onKeydown}},[_c('transition',{attrs:{"name":_vm.transition,"appear":""}},[_c(_vm.tag,{ref:"content",tag:"component",class:[
          'vts-drawer__content',
          { 'vts-drawer__content--right': !!_vm.right },
          _vm.classes.content ],style:({ width: _vm.width, maxWidth: _vm.maxWidth }),attrs:{"tabindex":"-1"}},[_vm._t("default")],2)],1)],1):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-c734400c_0", { source: ".vts-drawer{position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.2)}.vts-drawer [tabindex=\"-1\"]:focus{outline:0}.vts-drawer__content{overflow:auto;width:100%;max-width:300px;height:100%;background:#fff}.vts-drawer__content--right{margin-left:auto}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var VDrawer = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
 */
var script$3 = {
  props: {
    /**
     * The toggle button text.
     */
    text: String,
    /**
     * Where the content should be placed in relation to the button.
     *
     * Options: 'bottom', 'top'
     */
    position: {
      type: String,
      default: "bottom",
      validator: function validator(value) {
        return ["top", "bottom"].includes(value)
      },
    },
    /**
     * The transition name.
     */
    transition: String,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    isHovered: false,
    isFocused: false,
  }); },

  methods: {
    onClickout: function onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false;
      }
    },

    onFocusout: function onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false;
      }
    },
  },

  mounted: function mounted() {
    var this$1 = this;

    document.addEventListener("click", this.onClickout);
    this.$once("hook:beforeDestroy", function () {
      document.removeEventListener("click", this$1.onClickout);
    });
  },
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vts-dropdown",on:{"mouseenter":function($event){_vm.isHovered = true;},"mouseleave":function($event){_vm.isHovered = false;},"focusout":_vm.onFocusout}},[_c('button',{class:['vts-dropdown__trigger', _vm.classes.trigger],attrs:{"aria-expanded":!!_vm.isHovered || !!_vm.isFocused,"aria-haspopup":""},on:{"click":function($event){_vm.isFocused = !_vm.isFocused;}}},[_vm._t("trigger",[_vm._v(_vm._s(_vm.text))])],2),_vm._v(" "),_c('transition',{attrs:{"name":_vm.transition}},[(!!_vm.isHovered || !!_vm.isFocused)?_c('div',{staticClass:"vts-dropdown__content",class:[("vts-dropdown__content--" + _vm.position), _vm.classes.content]},[_vm._t("default")],2):_vm._e()])],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-f87e4d62_0", { source: ".vts-dropdown{display:inline-block;position:relative}.vts-dropdown__content{position:absolute;z-index:5;min-width:100%;border:1px solid rgba(0,0,0,.2);background-color:#fff}.vts-dropdown__content--top{top:0;transform:translateY(-100%)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var VDropdown = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

var NAME$1 = "vts-img";

/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 *
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
var script$4 = {
  inheritAttrs: false,
  // functional: true, // TODO

  props: {
    /**
     * Same as the HTML attribute
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Same as the HTML attribute
     */
    srcset: String,
    /**
     * Same as the HTML attribute
     */
    sizes: String,
    /**
     * Same as the HTML attribute
     */
    width: [String, Number],
    /**
     * Same as the HTML attribute
     */
    height: [String, Number],
    /**
     * URL of the blurred placeholder image to use if you need one (ideally a very small image).
     */
    placeholder: String,
    /**
     * CSS background styles for the placeholder in case you just want colors.
     */
    background: String,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  mounted: function mounted() {
    var this$1 = this;

    var timeOut;
    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      var wrapper = entry.target;
      var img = entry.target.querySelector(".vts-img__img");
      var placeholder = entry.target.querySelector(".vts-img__placeholder");

      img.onload = function() {
        delete img.onload;
        wrapper.classList.remove((NAME$1 + "--loading"));
        wrapper.classList.add((NAME$1 + "--loaded"));
        if (placeholder) {
          timeOut = setTimeout(function () {
            placeholder.remove();
          }, 300);
        }
      };
      if (entry.isIntersecting) {
        // Element is in viewport
        wrapper.classList.add((NAME$1 + "--loading"));
        img.src = this$1.src;
        if (!!this$1.srcset) { img.srcset = this$1.srcset; }
        if (!!this$1.alt) { img.alt = this$1.alt; }
        observer.disconnect();
      }
    });

    observer.observe(this.$el);
    this.$once("hook:beforeDestroy", function () {
      observer.disconnect();
      if (timeOut) {
        clearTimeout(timeOut);
      }
    });
  },

  render: function render(h, ctx) {
    var obj;

    // if (this.$parent.$isServer) {
    //   return h(false)
    // }

    var dataUrl = false;
    var hasDimensions = this.width && this.height;
    var placeholder = h(false);

    if (hasDimensions) {
      var w = 100;
      var canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = (this.height / this.width) * w;

      dataUrl = canvas.toDataURL();

      placeholder = h(
        "div",
        {
          class: [(NAME$1 + "__placeholder"), classes.placeholder],
          style: {
            background: this.background || false,
          },
        },
        [
          h("img", {
            attrs: {
              src: this.placeholder || dataUrl,
              width: this.width,
              height: this.height,
              alt: this.$attrs.alt || "",
            },
          }) ]
      );
    }

    var img = h("img", {
      class: [(NAME$1 + "__img"), classes.img],
      attrs: Object.assign({}, this.$attrs,
        {src: dataUrl,
        width: this.width || false,
        height: this.height || false}),
    });

    // TODO: Add this when SSR support is enabled
    // const noscript = h("noscript", [
    //   h("img", {
    //     attrs: {
    //       src: this.src || ''
    //     }
    //   })
    // ])
    return h(
      "div",
      {
        class: [
          NAME$1,
          ( obj = {}, obj[(NAME$1 + "--has-dimensions")] = hasDimensions, obj ),
          classes.root ],
        style: {
          maxWidth: this.width + "px",
        },
      },
      [placeholder, img]
    )
  },
};

/* script */
var __vue_script__$4 = script$4;

/* template */

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-18f38ea6_0", { source: ".vts-img{display:inline-block;position:relative;width:100%}.vts-img img{vertical-align:top}.vts-img__img{position:relative;opacity:0;transition:opacity .3s ease}.vts-img__placeholder{position:absolute;top:0;overflow:hidden}.vts-img__placeholder img{transform:scale(1.05);filter:blur(10px)}.vts-img--loaded .vts-img__img{opacity:1}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = undefined;
  /* style inject SSR */
  

  
  var VImg = normalizeComponent_1(
    {},
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

//

/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
var script$5 = {
  inheritAttrs: false,

  model: {
    event: "update",
  },

  props: {
    /**
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    label: {
      type: String,
    },

    /**
     * The input value. Works for all inputs except type `radio`. See `options` prop.
     */
    value: {
      type: [String, Number, Boolean],
      default: "",
    },

    /**
     * An array of options used for inputs of type `radio` or type `select`
     */
    options: {
      type: Array,
      default: function () { return []; },
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    dirty: false,
    anyInvalid: false,
    invalid: {},
  }); },

  computed: {
    tag: function tag() {
      var type = this.$attrs.type || "text";
      if (type === "textarea") {
        return "textarea"
      }
      if (type === "select") {
        return "select"
      }
      return "input"
    },

    id: function id() {
      return this.$attrs.id || "vts-" + randomString(6)
    },

    computedOptions: function computedOptions() {
      var this$1 = this;

      return this.options.map(function (item) {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === "object" ? item : { value: item };
        Object.assign(item, this$1.$attrs);
        item.label = item.label || item.value;
        item.name = item.name || this$1.id;
        item.required = true;
        return item
      })
    },
  },

  watch: {
    value: {
      handler: "validate",
    },
  },

  mounted: function mounted() {
    this.validate();
  },

  methods: {
    onInput: function onInput(ref) {
      var target = ref.target;

      var value =
        this.$attrs.type === "checkbox" ? target.checked : target.value;
      /**
       * @event update
       * @type { any }
       */
      this.$emit("update", value);
    },

    onBlur: function onBlur() {
      this.dirty = true;
    },

    validate: function validate() {
      var input = this.$refs.input;
      if (Array.isArray(input)) { return }

      var validity = input.validity;

      this.anyInvalid = !validity.valid;
      this.invalid = {
        required: validity.valueMissing,
        minLength: validity.tooShort,
        maxLength: validity.tooLong,
        min: validity.rangeOverflow,
        max: validity.rangeUnderflow,
        type: validity.typeMismatch,
        pattern: validity.patternMismatch,
      };
    },
  },
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'vts-input',
    ("vts-input--" + (_vm.$attrs.type || 'text')),
    {
      'vts-input--invalid': _vm.invalid.anyInvalid,
      'vts-input--required': _vm.$attrs.hasOwnProperty('required'),
    },
    _vm.classes.root ]},[(_vm.$attrs.type === 'radio')?_c('fieldset',{class:['vts-input__fieldset', _vm.classes.fieldset]},[(_vm.label)?_c('legend',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.computedOptions),function(option){return _c('label',{key:option.value,class:['vts-input__label', _vm.classes.label]},[_c('input',_vm._g({ref:"input",refInFor:true,staticClass:"vts-input__input",attrs:{"type":_vm.$attrs.type,"name":option.name,"aria-describedby":_vm.invalid.anyInvalid && (_vm.id + "__description")},domProps:{"checked":_vm.value === option.value},on:{"input":function($event){return _vm.$emit('update', option.value)},"blur":_vm.onBlur}},_vm.$listeners)),_vm._v(" "),_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n        "+_vm._s(option.label)+"\n      ")])])})],2):_c('label',{class:['vts-input__label', _vm.classes.label]},[(_vm.$attrs.type !== 'checkbox')?_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e(),_vm._v(" "),_c(_vm.tag,_vm._g(_vm._b({ref:"input",tag:"component",class:['vts-input__input', _vm.classes.input],attrs:{"id":(_vm.id + "__input"),"aria-describedby":_vm.invalid.anyInvalid && (_vm.id + "__description")},domProps:{"value":_vm.value},on:{"input":_vm.onInput,"blur":_vm.onBlur}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.tag === 'textarea')?[_vm._v("\n        "+_vm._s(_vm.value)+"\n      ")]:_vm._e(),_vm._v(" "),_vm._l((_vm.computedOptions),function(option,i){return _c('option',_vm._b({key:i,domProps:{"selected":option.value == _vm.value}},'option',option,false),[_vm._v("\n        "+_vm._s(option.label)+"\n      ")])})],2),_vm._v(" "),(_vm.$attrs.type === 'checkbox')?_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e()],1),_vm._v(" "),(_vm.$scopedSlots.description)?_c('div',{class:['vts-input__description', _vm.classes.description],attrs:{"id":(_vm.id + "__description"),"role":"alert"}},[_vm._t("description",null,null,{ dirty: _vm.dirty, anyInvalid: _vm.anyInvalid, invalid: _vm.invalid })],2):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VInput = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
var script$6 = {
  props: {
    /**
     * The IntersectionObserver threshold value.
     */
    threshold: {
      type: Array,
      default: function () { return [0, 0.2]; }
    },
    /**
     * The IntersectionObserver root value.
     */
    root: String,
    /**
     * The IntersectionObserver rootMargin value.
     */
    rootMargin: String,
    /**
     * The HTML tag used to wrap this component
     */
    tag: {
      type: String,
      default: "div"
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          /**
           * Fired when the observed element enters the screen.
           * @event enter
           * @type { IntersectionObserverEntry }
           */
          this$1.$emit("enter", [entries[0]]);
        } else {
          /**
           * Fired when the observed element exits the screen.
           * @event exit
           * @type { IntersectionObserverEntry }
           */
          this$1.$emit("exit", [entries[0]]);
        }
        /**
         * Fired when the observed element enters or exits the screen.
         * @event change
         * @type { IntersectionObserverEntry }
         */
        this$1.$emit("change", [entries[0]]);
      },
      {
        threshold: this.threshold,
        root: this.root,
        rootMargin: this.rootMargin
      }
    );
    this.observer.observe(this.$el);
    this.$once("hook:beforeDestroy", function () {
      this$1.observer.disconnect();
    });
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"vts-intersection"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VIntersect = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//

/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.
 */
var script$7 = {
  model: {
    prop: "showing",
    event: "change",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the modal content.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Flag to enable/prevent the modal from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the modal to.
     */
    width: String,
    /**
     * CSS max-width to set the modal to.
     */
    maxWidth: String,
    /**
     * Prevents the page from being scrolled while the modal is open.
     */
    noScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * Transition name to apply to the modal.
     */
    transition: String,
    /**
     * Transition name to apply to the background.
     */
    bgTransition: String,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  watch: {
    showing: {
      handler: function handler(next, prev) {
        var this$1 = this;

        if (typeof window !== "undefined") {
          if (next && next != prev) {
            this.noScroll &&
              document.body.style.setProperty("overflow", "hidden");
            this.$nextTick(function () {
              this$1.$refs.content.focus();
            });
          } else {
            this.noScroll && document.body.style.removeProperty("overflow");
          }
        }
      },
    },
  },

  methods: {
    show: function show() {
      /**
       * Fired when the modal opens.
       * @event show
       * @type { boolean }
       */
      this.$emit("show");
      this.$emit("change", true);
    },
    hide: function hide() {
      /**
       * Fired when the modal closes.
       * @event hide
       * @type { boolean }
       */
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle: function toggle() {
      var event = this.showing ? "hide" : "show";
      this.$emit(event, !this.showing);
      /**
       * Fired whenever the modal opens or closes.
       * @event change
       * @type { boolean }
       */
      this.$emit("change", !this.showing);
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains("vts-modal") && this.dismissible) {
        this.hide();
      }
    },

    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.hide();
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          var focusedItemIndex = focusable.indexOf(document.activeElement);

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
    },
  },
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.bgTransition}},[(_vm.showing)?_c('div',{class:['vts-modal', _vm.classes.root],on:{"click":_vm.onClick,"keydown":_vm.onKeydown}},[_c('transition',{attrs:{"name":_vm.transition,"appear":""}},[_c(_vm.tag,{ref:"content",tag:"component",class:['vts-modal__content', _vm.classes.content],style:({ width: _vm.width, maxWidth: _vm.maxWidth }),attrs:{"tabindex":"-1","role":"dialog"}},[_vm._t("default")],2)],1)],1):_vm._e()])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-944cc660_0", { source: ".vts-modal{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.2)}.vts-modal [tabindex=\"-1\"]:focus{outline:0}.vts-modal__content{overflow:auto;max-width:70vw;max-height:80vh;background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  

  
  var VModal = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    browser,
    undefined
  );

//

/**
 * Show and hide content based on which tabs are selected.
 *
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 *
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
var script$8 = {
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
      default: "horizontal",
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    activeIndex: 0,
  }); },

  computed: {
    tablist: function tablist() {
      return Object.keys(this.$slots)
    },

    id: function id() {
      if (this.$attrs.id) { return this.$attrs.id }
      return Array(6)
        .fill()
        .map(function () { return Math.floor(36 * Math.random()).toString(36); })
        .join("")
    },
  },

  methods: {
    onKeydown: function onKeydown(event) {
      var keyCode = event.keyCode;
      switch (keyCode) {
        case keycodes.END:
          event.preventDefault();
          this.activeIndex = this.tablist.length - 1;
          this.setFocus();
          break
        case keycodes.HOME:
          event.preventDefault();
          this.activeIndex = 0;
          this.setFocus();
          break
        // Up and down are in keydown because we need to prevent page scroll >:)
        case keycodes.LEFT:
        case keycodes.RIGHT:
        case keycodes.UP:
        case keycodes.DOWN:
          this.determineOrientation(event);
          break
      }
    },

    // When a tablist's aria-orientation is set to vertical, only up and down arrow should function. In all other cases only left and right arrow function.
    determineOrientation: function determineOrientation(event) {
      var keyCode = event.keyCode;
      var proceed = false;
      if (this.orientation === "vertical") {
        if (keyCode === keycodes.UP || keyCode === keycodes.DOWN) {
          event.preventDefault();
          proceed = true;
        }
      } else {
        if (keyCode === keycodes.LEFT || keyCode === keycodes.RIGHT) {
          proceed = true;
        }
      }
      if (proceed) {
        this.switchTabOnArrowPress(event);
        this.setFocus();
      }
    },

    // Either focus the next, previous, first, or last tab depening on key pressed
    switchTabOnArrowPress: function switchTabOnArrowPress(event) {
      var keyCode = event.keyCode;
      var directions = {};
      directions[keycodes.LEFT] = -1;
      directions[keycodes.UP] = -1;
      directions[keycodes.RIGHT] = 1;
      directions[keycodes.DOWN] = 1;

      /* istanbul ignore next */
      if (!directions[keyCode]) { return }
      var nextIndex = this.activeIndex + directions[keyCode];
      if (nextIndex < 0) {
        this.activeIndex = this.$refs.tab.length - 1;
      } else if (nextIndex >= this.$refs.tab.length) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = nextIndex;
      }
    },

    setFocus: function setFocus() {
      this.$refs.tab[this.activeIndex].focus();
    },
  },
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.tablist.length)?_c('div',{class:['vts-tabs', _vm.classes.root]},[_c('div',{class:['vts-tabs__tablist', _vm.classes.tablist],attrs:{"role":"tablist","aria-label":_vm.label,"aria-orientation":_vm.orientation}},_vm._l((_vm.tablist),function(tab,index){return _c('button',{key:tab,ref:"tab",refInFor:true,class:[("vts-tabs__tab vts-tabs__tab--" + index), _vm.classes.tab],attrs:{"aria-selected":index === _vm.activeIndex,"tabindex":index === _vm.activeIndex ? false : -1,"id":(_vm.id + "-tab-" + index),"aria-controls":(_vm.id + "-panel-" + index),"role":"tab"},on:{"keydown":_vm.onKeydown,"click":function($event){_vm.activeIndex = index;}}},[_vm._v("\n      "+_vm._s(tab)+"\n    ")])}),0),_vm._v(" "),_vm._l((_vm.tablist),function(tab,index){return _c('div',{key:tab,class:[("vts-tabs__panel vts-tabs__panel--" + index), _vm.classes.panel],attrs:{"id":(_vm.id + "-panel-" + index),"aria-labelledby":(_vm.id + "-tab-" + index),"hidden":index !== _vm.activeIndex,"tabindex":"0","role":"tabpanel"}},[_vm._t(tab)],2)})],2):_vm._e()};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VTabs = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
var script$9 = {
  props: {
    /**
     * The content inside the toggle button
     */
    label: {
      type: String,
      required: true,
    },

    disabled: Boolean,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      isOpen: !!this.isOpen,
    }
  },

  computed: {
    id: function id() {
      if (this.$attrs.id) { return this.$attrs.id }

      return (
        "vts-toggle-" +
        Array(6)
          .fill()
          .map(function () { return Math.floor(36 * Math.random()).toString(36); })
          .join("")
      )
    },
  },

  methods: {
    collapse: function collapse(el) {
      el.style.height = 0;
    },

    expand: function expand(el) {
      el.style.overflow = "hidden";
      el.style.height = (el.scrollHeight) + "px";
      // Force repaint to make sure the animation is triggered correctly.
      el.scrollHeight;
    },

    resetHeight: function resetHeight(el) {
      el.style.overflow = "visible";
      el.style.height = "";
    },
  },
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-toggle', { 'vts-toggle--open': _vm.isOpen }, _vm.classes.root]},[_c('button',{ref:"label",class:['vts-toggle__label', _vm.classes.label],attrs:{"id":(_vm.id + "-label"),"disabled":_vm.disabled,"aria-controls":(_vm.id + "-content"),"aria-expanded":_vm.isOpen},on:{"click":function($event){_vm.isOpen = !_vm.isOpen;}}},[_vm._t("label")],2),_vm._v(" "),_c('transition',{on:{"before-enter":_vm.collapse,"enter":_vm.expand,"after-enter":_vm.resetHeight,"before-leave":_vm.expand,"leave":_vm.collapse}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen && !_vm.disabled),expression:"isOpen && !disabled"}],class:['vts-toggle__content', _vm.classes.content],attrs:{"id":(_vm.id + "-content"),"aria-labelledby":(_vm.id + "-label"),"aria-hidden":!_vm.isOpen,"role":"region"}},[_vm._t("default")],2)])],1)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-7974b5ac_0", { source: ".vts-toggle__content{transition:height .3s ease}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  

  
  var VToggle = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    browser,
    undefined
  );

export { VAlert, VAsync, VDrawer, VDropdown, VImg, VInput, VIntersect, VModal, VTabs, VToggle };
