import { isVue3, reactive, watch, nextTick, computed } from 'vue-demi';

/**
 * Detects if a VDOM element is a <RouterLink>, <a>, or <button>
 *
 * @param  {object} props       props container
 *         {string} props.to    the :to prop for router-link
 * @param  {object} data        data container
 *         {object} data.attrs  attributes container
 * @return {string}             'RouterLink', 'a', or 'button'
 */
function getTag(props, data) {
  if (props && props.to) {
    return 'RouterLink';
  }
  if (data && data.attrs && data.attrs.href) {
    return 'a';
  }
  return 'button';
}

var script$k = {
  name: 'VAction',
  functional: true,
  render: function render(h, ref) {
    var data = ref.data;
    var listeners = ref.listeners;
    var props = ref.props;
    var children = ref.children;

    var tag = getTag(props, data);
    var options = Object.assign({}, data,
      {props: props,
      class: ['vts-action'],
      on: listeners});
    if (tag === 'RouterLink') {
      options.nativeOn = listeners;
    }
    /**
     * Supress Vue warnings of .native modifiers
     * Reference comment and issue #9999 on Vuetify
     * https://github.com/vuetifyjs/vuetify/issues/9999#issuecomment-579434865
     */
    if (tag === 'button') {
      options.nativeOn = null;
    }

    return h(tag, options, children);
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
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
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__$k = script$k;

/* template */

  /* style */
  var __vue_inject_styles__$k = undefined;
  /* scoped */
  var __vue_scope_id__$k = undefined;
  /* module identifier */
  var __vue_module_identifier__$k = undefined;
  /* functional template */
  var __vue_is_functional_template__$k = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$k = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    undefined,
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

/**
 * NOTES Concerning :visible prop.
 * Per W3C specifications:
 * https://www.w3.org/TR/wai-aria-practices/#alert
 * --
 * "It is also important to avoid designing alerts that disappear automatically.
 * An alert that disappears too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3.
 * Another critical design consideration is the frequency of interruption caused by alerts.
 * Frequent interruptions inhibit usability for people with visual and cognitive disabilities,
 * which makes meeting the requirements of WCAG 2.0 success criterion 2.2.4 more difficult."
 */

/**
 * A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.
 */
var script$j = {
  name: 'VAlert',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },

  props: {
    /**
     * HTML tag used to wrap the component.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Determines whether the alert is visible. Also binds with `v-model`.
     */
    modelValue: {
      type: [Boolean, Number],
      default: true,
    },
    /**
     * Allows a user to dismiss this alert.
     */
    dismissible: Boolean,
    /**
     * Aria-label that is not visibly, but screen readers will read for the dismiss button.
     */
    dismissLabel: {
      type: [String, Boolean],
      default: 'Dismiss this alert',
    },
    /**
     * The transition name if you want to add one.
     */
    transition: {
      type: String,
      default: undefined,
    },

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
    modelValue: {
      handler: function handler(visible) {
        if (visible) {
          this.dismissed = false;
        }
        if (typeof visible === 'number') {
          this.clearTimer(); // Clear timers in case this.visible watcher adds multiples
          this.countdown();
        }
      },
      immediate: true,
    },
  },

  beforeUnmount: function beforeUnmount() {
    this.clearTimer();
  },
  /** @deprecated */
  beforeDestroy: function beforeDestroy() {
    this.clearTimer();
  },

  methods: {
    dismiss: function dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       *
       * @event dismiss
       * @type { undefined }
       */
      this.$emit('dismiss');
      this.dismissed = true;
      if (typeof this.modelValue === 'number') {
        this.$emit('update:modelValue', 0);
        /** @deprecated */
        this.$emit('update', 0);
        this.clearTimer();
      } else {
        this.$emit('update:modelValue', false);
        /** @deprecated */
        this.$emit('update', false);
      }
    },

    countdown: function countdown() {
      var this$1$1 = this;

      var ref = this;
      var modelValue = ref.modelValue;
      if (modelValue <= 0) { return; }
      this.timerId = setTimeout(function () {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         *
         * @event update
         * @type { boolean|number }
         */
        this$1$1.$emit('update:modelValue', modelValue - 1);
        /** @deprecated */
        this$1$1.$emit('update', modelValue - 1);
      }, 1000);
    },

    clearTimer: function clearTimer() {
      var ref = this;
      var timerId = ref.timerId;
      if (timerId) {
        clearInterval(timerId);
        this.timerId = null;
      }
    },
  },
};

/* script */
var __vue_script__$j = script$j;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[(!_vm.dismissed && !!_vm.modelValue)?_c(_vm.tag,{tag:"component",class:['vts-alert', _vm.classes.root],attrs:{"role":"alert"}},[_vm._t("default"),_vm._v(" "),(_vm.dismissible)?_c('button',{class:['vts-alert__dismiss', _vm.classes.dismiss],attrs:{"aria-label":_vm.dismissLabel},on:{"click":_vm.dismiss}},[_vm._t("dismiss",function(){return [_vm._v("\n        ×\n      ")]})],2):_vm._e()],2):_vm._e()],1)};
var __vue_staticRenderFns__$g = [];

  /* style */
  var __vue_inject_styles__$j = undefined;
  /* scoped */
  var __vue_scope_id__$j = undefined;
  /* module identifier */
  var __vue_module_identifier__$j = undefined;
  /* functional template */
  var __vue_is_functional_template__$j = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$j = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * A renderless component for awaiting promises to resolve;
 * great for making HTTP requests. Supports showing pending,
 * resolved, or rejected promises.
 */
var script$i = {
  name: 'VAsync',
  props: {
    /**
     * A promise or function that returns a promise.
     */
    await: {
      type: [Promise, Function],
      default: function () { return Promise.resolve(); },
    },
    /**
     * The default value to provide for the `results`.
     * Useful if the promise resolve value is undefined.
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
      done: false,
    };
  },

  watch: {
    await: {
      handler: 'awaitOn',
      immediate: true,
    },

    pending: {
      handler: function handler(pending) {
        /**
         * Fired whenever the pending status changes.
         *
         * @event pending
         * @type {boolean}
         */
        this.$emit('pending', pending);
      },
      immediate: true,
    },
  },

  methods: {
    awaitOn: function awaitOn(promise) {
      var this$1$1 = this;

      if (!promise) { return; }

      promise = typeof promise === 'function' ? promise() : promise;

      if (!promise.then) { return; }

      this.pending = true;
      this.results = this.default;
      this.error = null;

      return promise
        .then(function (results) {
          this$1$1.results =
            typeof results === 'undefined' ? this$1$1.default : results;
          /**
           * Fired after promise has resolved with the resolved value.
           *
           * @event resolve
           * @type {any}
           */
          this$1$1.$emit('resolve', results);
        })
        .catch(function (error) {
          if (error instanceof Error) {
            error = {
              name: error.name,
              message: error.message,
            };
          }
          this$1$1.error = error;
          /**
           * Fired after promise has rejected with the rejected error.
           *
           * @event reject
           * @type {Error}
           */
          this$1$1.$emit('reject', error);
        })
        .finally(function () {
          this$1$1.pending = false;
          this$1$1.done = true;
          /**
           * Fired after promise has fulfilled, regardless of success or failure.
           *
           * @event finally
           * @type {undefined}
           */
          this$1$1.$emit('finally');
        });
    },
  },

  render: function render() {
    var ref = this;
    var pending = ref.pending;
    var error = ref.error;
    var results = ref.results;
    var done = ref.done;
    var slots = this.$slots;

    if (!isVue3) {
      slots = this.$scopedSlots;
    }

    /** @slot Rendered while the promise is in a pending state */
    var pendingSlot = slots.pending;
    /** @slot Rendered when the promise has rejected. Provides the caught error. */
    var rejectedSlot = slots.rejected;
    /** @slot Rendered when the promise has resolved. Provides the results. */
    var resolvedSlot = slots.resolved;
    /** @slot Provides the status of the component for pending state, error, or results. */
    var defaultSlot = slots.default;

    if (pending && pendingSlot) {
      return pendingSlot();
    }

    if (done && error && rejectedSlot) {
      return rejectedSlot(error);
    }

    if (done && !error && resolvedSlot) {
      return resolvedSlot(results);
    }

    if (!defaultSlot) { return; }

    return defaultSlot({
      pending: pending,
      resolved: results,
      rejected: error,
      // TODO: update docs
      results: results,
      error: error,
    });
  },
};

/* script */
var __vue_script__$i = script$i;

/* template */

  /* style */
  var __vue_inject_styles__$i = undefined;
  /* scoped */
  var __vue_scope_id__$i = undefined;
  /* module identifier */
  var __vue_module_identifier__$i = undefined;
  /* functional template */
  var __vue_is_functional_template__$i = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$i = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    undefined,
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

var script$h = {
  name: 'VBtn',
  inheritAttrs: false,
  props: {
    action: { type: String, default: '' },
    data: { type: Object, default: function () { return ({}); } },
  },
  computed: {
    /** @return {'RouterLink' | 'a' | 'button'} */
    tag: function tag() {
      var attrs = this.$attrs || {};
      if (attrs.to) {
        return 'RouterLink';
      }
      if (attrs.href) {
        return 'a';
      }
      return 'button';
    },
    /** @return {string} */
    type: function type() {
      if (this.tag !== 'button') { return; }
      return this.$attrs.type || 'button';
    },
  },
  methods: {
    onSubmit: async function onSubmit(ref) {
      var form = ref.target;

      try {
        var data = new FormData(form);
        var response = await fetch(form.action, {
          method: form.method,
          body: data,
        });
        this.$emit('response', response);
      } catch (error) {
        this.$emit('error', error);
      }
    },
  },
};

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.action && _vm.data)?_c('form',{staticClass:"vts-btn__form",attrs:{"action":_vm.action,"method":"POST"},on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit.apply(null, arguments)}}},[_vm._l((_vm.data),function(key,value){return _c('input',{key:key,attrs:{"name":key,"type":"hidden","hidden":"","autocomplete":"off","aria-hidden":"true","tabindex":"-1"},domProps:{"value":value}})}),_vm._v(" "),_c('button',_vm._g(_vm._b({staticClass:"vts-btn",attrs:{"type":"submit"}},'button',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)],2):_c(_vm.tag,_vm._g(_vm._b({tag:"component",staticClass:"vts-btn",attrs:{"type":_vm.type}},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)};
var __vue_staticRenderFns__$f = [];

  /* style */
  var __vue_inject_styles__$h = function (inject) {
    if (!inject) { return }
    inject("data-v-0604b6d6_0", { source: ".vts-btn__form{display:inline}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$h = undefined;
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    createInjector,
    undefined,
    undefined
  );

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
  DOWN: 40,
});

var autofocus = {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  inserted: function (el) { return el.focus(); },
};

/**
 * @typedef {HTMLElement & {
 * _vtsClickout: { stop: EventListener}
 * }} ClickoutEl
 */
var clickout = {
  /**
   * @param {ClickoutEl} el directive target element
   * @type {import('vue').DirectiveFunction}
   */
  bind: function bind(el, binding) {
    // TODO: add escape handler?
    el._vtsClickout = {
      stop: function (e) { return e.stopPropagation(); },
      // esc: e => e.key === 'Escape' && el.data.event()
    };

    document.body.addEventListener('click', binding.value);
    // document.body.addEventListener('keydown', el._vtsClickout.esc)
    el.addEventListener('click', el._vtsClickout.stop);
  },

  /**
   * @param {ClickoutEl} el directive target element
   * @type {import('vue').DirectiveFunction}
   */
  unbind: function unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
    // document.body.removeEventListener('keydown', el._vtsClickout.esc)
    el.removeEventListener('click', el._vtsClickout.stop);
  },
};

/**
 * Copies a string of text to the user's clipboard
 *
 * @param {string} content The content within the downloaded file
 */
function copyToClipboard(content) {
  /** @type {Element & { focus?: function }} */
  var activeEl = document.activeElement;

  var textarea = document.createElement('textarea');
  textarea.value = content;

  textarea.setAttribute('readonly', ''); // Prevent keyboard from showing on mobile
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  textarea.style.fontSize = '12pt'; // Prevent zooming on iOS

  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  activeEl && activeEl.focus();
}

/**
 * @typedef {HTMLElement & { _vtsCopy?: EventListenerOrEventListenerObject }} CopyEl
 */

var copy = {
  /**
   * @type {import('vue').DirectiveFunction}
   */
  bind: function bind(/** @type {CopyEl} */ el, binding) {
    el._vtsCopy = function () { return copyToClipboard(binding.value); };
    el.addEventListener('click', el._vtsCopy);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  update: function update(/** @type {CopyEl} */ el, binding) {
    el.removeEventListener('click', el._vtsCopy);
    el._vtsCopy = function () { return copyToClipboard(binding.value); };
    el.addEventListener('click', el._vtsCopy);
  },
  /**
   * @type {import('vue').DirectiveFunction}
   */
  unbind: function unbind(/** @type {CopyEl} */ el) {
    el.removeEventListener('click', el._vtsCopy);
  },
};

/**
 * @typedef {HTMLElement & { _vtsIntersect?: IntersectionObserver}} IntersectEl
 * @param {IntersectEl} el
 */
function unbind(el) {
  if (!el._vtsIntersect) { return; }
  el._vtsIntersect.unobserve(el);
  delete el._vtsIntersect;
}

var intersect = {
  /**
   * @param {IntersectEl} el
   * @type {import('vue').DirectiveFunction}
   */
  inserted: function (el, ref) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    var options = Object.assign({}, value);
    var enter = modifiers.enter;
    var exit = modifiers.exit;
    var once = modifiers.once;

    if (options.root) {
      options.root =
        typeof options.root === 'string'
          ? document.querySelector(options.root)
          : options.root;
    }

    var listeners = Object.assign({}, value);

    // Support passing direct function
    if (value instanceof Function) {
      if (enter) { listeners.onEnter = value; }
      if (exit) { listeners.onExit = value; }
      if (!enter && !exit) { listeners.onChange = value; }
    }

    var observer = new IntersectionObserver(function (ref) {
      var entry = ref[0];

      // Firefox doesn't properly handle the isIntersecting prop
      var isThresholdArray = Array.isArray(options.threshold);
      var clone = {};
      for (var key in entry) {
        clone[key] = entry[key];
      }
      clone.isIntersecting = isThresholdArray
        ? options.threshold.includes(entry.intersectionRatio)
        : entry.intersectionRatio === options.threshold;

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

  unbind: unbind,
};

var allDirectives = /*#__PURE__*/Object.freeze({
  __proto__: null,
  autofocus: autofocus,
  clickout: clickout,
  copy: copy,
  intersect: intersect
});

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
  '[tabindex]:not([tabindex^="-"])' ];

/**
 * Generates a random string of defined length based on
 * a string of allowed characters.
 *
 * @param  {number} length  How many random characters will be in the returned string. Defaults to 10
 * @param  {string} allowed Which characters can be used when creating the random string. Defaults to A-Z,a-z,0-9
 * @returns {string}         A string of random characters
 */
function randomString(
  length,
  allowed
) {
  if ( length === void 0 ) length = 10;
  if ( allowed === void 0 ) allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var result = '';
  for (var i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result;
}

/**
 * [applyFocusTrap description]
 *
 * @param  {HTMLElement} el    [description]
 * @param  {Event}       event [description]
 * @returns {undefined}         [description]
 */
function applyFocusTrap(el, event) {
  var focusable = Array.from(el.querySelectorAll(FOCUSABLE));

  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  if (!el.contains(document.activeElement)) {
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

//

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

var keysUsed = [
  keycodes.UP,
  keycodes.DOWN,
  keycodes.LEFT,
  keycodes.RIGHT,
  keycodes.PAGEUP,
  keycodes.PAGEDOWN,
  keycodes.HOME,
  keycodes.END ];

// Based on https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
var script$g = {
  name: 'VDate',
  directives: {
    clickout: clickout,
  },

  model: {
    prop: 'date',
    event: 'update',
  },

  props: {
    // TODO: include, exclude
    date: {
      type: [Date, String],
      default: function () { return new Date(); },
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
      default: function () { return ("vts-" + (randomString(4))); },
    },

    daysOfWeek: {
      type: Object,
      default: function () {
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
      default: function () { return [
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
        'December' ]; },
    },

    buttonLabels: {
      type: Object,
      default: function () {
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
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      show: false,
      previousActiveEl: null,
      focusedDate: new Date(this.date),
      selectedDate: new Date(this.date),
    };
  },

  computed: {
    monthYear: function monthYear() {
      var ref = this;
      var monthLabels = ref.monthLabels;
      var focusedDate = ref.focusedDate;
      return ((monthLabels[focusedDate.getMonth()]) + " " + (focusedDate.getFullYear()));
    },

    disableNav: function disableNav() {
      var ref = this;
      var focusedDate = ref.focusedDate;
      var min = ref.min;
      var max = ref.max;
      var disableNav = {};
      var minDate = new Date(min);
      var maxDate = new Date(max);

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

    daysByWeeks: function daysByWeeks() {
      var ref = this;
      var focusedDate = ref.focusedDate;
      var selectedDate = ref.selectedDate;
      var min = ref.min;
      var max = ref.max;
      var firstDayOfMonth = new Date(
        focusedDate.getFullYear(),
        focusedDate.getMonth(),
        1
      );
      var dayOfWeek = firstDayOfMonth.getDay();
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      var daysInMonth = new Date(
        focusedDate.getFullYear(),
        focusedDate.getMonth() + 1,
        0
      ).getDate();

      var d = new Date(firstDayOfMonth);
      var maxWeeks = dayOfWeek + daysInMonth < 36 ? 5 : 6;
      var weeks = [];

      for (var i = 0; i < maxWeeks; i++) {
        weeks.push([]);

        for (var j = 0; j < 7; j++) {
          var date = new Date(d);
          var disabled = false;
          if (min) {
            disabled = date < new Date(min);
          }
          if (max && !disabled) {
            disabled = date > new Date(max);
          }

          weeks[i].push({
            date: date,
            isFocused: sameDays(date, focusedDate),
            isSelected: sameDays(date, selectedDate),
            disabled: disabled,
          });
          d.setDate(d.getDate() + 1);
        }
      }

      return weeks;
    },

    toggle: function toggle() {
      var this$1$1 = this;

      var ref = this;
      var show = ref.show;
      return {
        bind: {
          'aria-label': this.buttonLabels.selectDate,
          'aria-expanded': '' + show,
        },
        on: {
          click: function () {
            this$1$1.show = !show;
          },
        },
      };
    },
  },

  watch: {
    show: function show(isShow) {
      var this$1$1 = this;

      var ref = this;
      var previousActiveEl = ref.previousActiveEl;
      var date = ref.date;
      if (isShow) {
        this.previousActiveEl = document.activeElement;
        this.focusedDate = new Date(date);
        this.$nextTick(function () {
          this$1$1.$el.querySelector('button[aria-selected="true"]').focus();
        });
      } else if (previousActiveEl) {
        previousActiveEl.focus();
      }
    },

    selectedDate: function selectedDate(date) {
      this.$emit('update', date);
      this.show = false;
    },
  },

  methods: {
    incrementMonthBy: function incrementMonthBy(inc) {
      var ref = this;
      var focusedDate = ref.focusedDate;
      // get last day of prev/next month
      var last = new Date(focusedDate);
      last.setMonth(last.getMonth() + inc + 1);
      last.setDate(0);

      var fd = new Date(focusedDate);
      fd.setDate(Math.min(fd.getDate(), last.getDate())); // Must happen before month change`
      fd.setMonth(fd.getMonth() + inc);

      this.focusedDate = fd;
    },

    incrementYearBy: function incrementYearBy(inc) {
      var d = new Date(this.focusedDate);
      d.setFullYear(d.getFullYear() + inc);
      this.focusedDate = d;
    },

    onClick: function onClick(ref) {
      var target = ref.target;

      if (!target.classList.contains('vts-date__day')) { return; }
      this.selectedDate = new Date(target.value);
    },

    onKeydown: function onKeydown(event) {
      var this$1$1 = this;

      // Use event delegation on parent so we dont have 42 event listeners on buttons
      if (!event.target.classList.contains('vts-date__day')) { return; }
      if (!keysUsed.includes(event.keyCode)) { return; }

      event.stopPropagation();
      event.preventDefault();

      var ref = this;
      var focusedDate = ref.focusedDate;
      var min = ref.min;
      var max = ref.max;
      var d = new Date(focusedDate);

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

      var minDate = min && new Date(min);
      var maxDate = max && new Date(max);

      if ((minDate && d < minDate) || (maxDate && d > maxDate)) { return; }

      this.focusedDate = d;

      this.$nextTick(function () {
        this$1$1.$el.querySelector('button[aria-selected="true"]').focus();
      });
    },

    onTab: function onTab(event) {
      applyFocusTrap(this.$refs.calendar, event);
    },

    onClickout: function onClickout(event) {
      var ref = this;
      var show = ref.show;
      event.preventDefault();
      if (show) {
        this.show = false;
      }
    },
  },
};

/* script */
var __vue_script__$g = script$g;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"clickout",rawName:"v-clickout",value:(_vm.onClickout),expression:"onClickout"}],class:['vtd-date', _vm.classes.root],attrs:{"id":_vm.id}},[_vm._t("default",function(){return [_c('button',_vm._g(_vm._b({class:['vtd-date__toggle', _vm.classes.toggle],attrs:{"type":"button"}},'button',_vm.toggle.bind,false),_vm.toggle.on),[_c('span',{attrs:{"role":"img","aria-label":_vm.buttonLabels.showCalendar}},[_vm._v("\n        📅\n      ")])])]},null,_vm.toggle),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],ref:"calendar",class:['vtd-date__wrapper', _vm.classes.wrapper],attrs:{"role":"dialog","aria-modal":"true","aria-labelledby":(_vm.id + "-dialog-label")},on:{"click":_vm.onClick,"keydown":[_vm.onKeydown,function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onTab.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }_vm.show = false;}]}},[_c('div',{staticClass:"vts-date__navigation"},[_c('button',{class:['vtd-date__prev-year', _vm.classes.prevYear],attrs:{"aria-label":_vm.buttonLabels.previousYear,"type":"button","disabled":_vm.disableNav.prevYear},on:{"click":function($event){return _vm.incrementYearBy(-1)}}},[_vm._t("prevYearLabel",function(){return [_vm._v("↞")]})],2),_vm._v(" "),_c('button',{class:['vtd-date__prev-month', _vm.classes.prevMonth],attrs:{"aria-label":_vm.buttonLabels.previousMonth,"type":"button","disabled":_vm.disableNav.prevMonth},on:{"click":function($event){return _vm.incrementMonthBy(-1)}}},[_vm._t("prevMonthLabel",function(){return [_vm._v("←")]})],2),_vm._v(" "),_c('h4',{class:['vtd-date__title', _vm.classes.title],attrs:{"id":(_vm.id + "-dialog-label"),"aria-live":"polite"}},[_vm._v("\n        "+_vm._s(_vm.monthYear)+"\n      ")]),_vm._v(" "),_c('button',{class:['vtd-date__next-month', _vm.classes.nextMonth],attrs:{"aria-label":_vm.buttonLabels.nextMonth,"type":"button","disabled":_vm.disableNav.nextMonth},on:{"click":function($event){return _vm.incrementMonthBy(1)}}},[_vm._t("nextMonthLabel",function(){return [_vm._v("→")]})],2),_vm._v(" "),_c('button',{class:['vtd-date__next-year', _vm.classes.nextYear],attrs:{"aria-label":_vm.buttonLabels.nextYear,"type":"button","disabled":_vm.disableNav.nextYear},on:{"click":function($event){return _vm.incrementYearBy(1)}}},[_vm._t("nextYearLabel",function(){return [_vm._v("↠")]})],2)]),_vm._v(" "),_c('table',{class:['vtd-date__calendar', _vm.classes.calendar],attrs:{"role":"grid","aria-labelledby":(_vm.id + "-dialog-label")}},[_c('thead',{class:['vtd-date__thead', _vm.classes.thead]},[_c('tr',{class:['vtd-date__week', _vm.classes.week]},_vm._l((_vm.daysOfWeek),function(val,key){return _c('th',{key:key,class:['vtd-date__th', _vm.classes.th],attrs:{"abbr":val,"scope":"col"}},[_vm._v("\n            "+_vm._s(key)+"\n          ")])}),0)]),_vm._v(" "),_c('tbody',{class:['vtd-date__tbody', _vm.classes.tbody]},_vm._l((6),function(week){return _c('tr',{key:week,class:['vtd-date__tr', _vm.classes.tr]},_vm._l((_vm.daysByWeeks[week - 1]),function(day){
var _obj, _obj$1, _obj$2, _obj$3;
return _c('td',{key:day.date.toString(),class:[
              'vts-date__td',
              { 'vts-date__td--focused': day.isFocused },
              { 'vts-date__td--selected': day.isSelected },
              _vm.classes.td,
              ( _obj = {}, _obj[_vm.classes.tdFocused] = _vm.classes.tdFocused && day.isFocused, _obj ),
              ( _obj$1 = {}, _obj$1[_vm.classes.tdSelected] = _vm.classes.tdSelected && day.isSelected, _obj$1 ) ]},[_c('button',{class:[
                'vts-date__day',
                { 'vts-date__day--focused': day.isFocused },
                { 'vts-date__day--selected': day.isSelected },
                _vm.classes.day,
                ( _obj$2 = {}, _obj$2[_vm.classes.dayFocused] = _vm.classes.dayFocused && day.isFocused, _obj$2 ),
                ( _obj$3 = {}, _obj$3[_vm.classes.daySelected] = _vm.classes.daySelected && day.isSelected, _obj$3 ) ],attrs:{"tabindex":day.isFocused ? '0' : '-1',"aria-selected":day.isFocused,"value":day.date,"disabled":day.disabled,"type":"button"}},[_vm._v("\n              "+_vm._s(day.date.getDate())+"\n            ")])])}),0)}),0)])])],2)};
var __vue_staticRenderFns__$e = [];

  /* style */
  var __vue_inject_styles__$g = function (inject) {
    if (!inject) { return }
    inject("data-v-132cd177_0", { source: ".vtd-date{position:relative}.vts-date__navigation{display:flex;justify-content:space-around}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$g = undefined;
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

//

/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
var script$f = {
  name: 'VDialog',
  inheritAttrs: false,

  model: {
    prop: 'showing',
    event: 'update',
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the dialog content.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Flag to enable/prevent the dialog from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the dialog to.
     */
    width: {
      type: String,
      default: '',
    },
    /**
     * CSS width to set the dialog to.
     */
    inlineSize: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxWidth: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxInlineSize: {
      type: String,
      default: '',
    },
    /**
     * Prevents the page from being scrolled while the dialog is open.
     */
    noScroll: Boolean,
    /**
     * Transition name to apply to the dialog.
     */
    transition: {
      type: String,
      default: '',
    },
    /**
     * Transition name to apply to the background.
     *
     * @deprecated
     */
    bgTransition: {
      type: String,
      default: '',
    },

    /**
     * Transition name to apply to the background.
     */
    contentTransition: {
      type: String,
      default: '',
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localShow: this.showing,
      activeElement: null,
    };
  },

  computed: {
    slots: function slots() {
      if (!isVue3) {
        return this.$scopedSlots;
      }
      return this.$slots;
    },
  },

  watch: {
    showing: function showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler: function handler(next, prev) {
        if (typeof window === 'undefined') { return; }

        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();

          var ref = this;
          var activeElement = ref.activeElement;
          if (activeElement && activeElement.focus) {
            this.$nextTick(function () {
              activeElement.focus();
            });
          }
        }

        this.$emit('update', next);
      },
    },
  },

  destroyed: function destroyed() {
    this.onClose();
  },

  methods: {
    onOpen: function onOpen() {
      var this$1$1 = this;

      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.addEventListener('click', onClick);
      window.addEventListener('keydown', onKeydown);
      noScroll && document.body.style.setProperty('overflow', 'hidden');
      this.$nextTick(function () { return this$1$1.$refs.content.focus(); });
      this.$emit('open');
    },
    onClose: function onClose() {
      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeydown);
      noScroll && document.body.style.removeProperty('overflow');
      this.$emit('close');
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains('vts-dialog') && this.dismissible) {
        this.localShow = false;
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC && this.dismissible) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return; }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return;
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
var __vue_script__$f = script$f;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.localShow || _vm.slots.toggle)?_c('span',[(_vm.slots.toggle)?_vm._t("toggle",null,null,{
      on: {
        click: function () { return (_vm.localShow = !_vm.localShow); },
      },
      bind: {
        type: 'button',
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': '' + _vm.localShow,
      },
    }):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":_vm.bgTransition || _vm.transition,"appear":true}},[(_vm.localShow)?[_c('div',{class:['vts-dialog', _vm.classes.root, _vm.classes.bg, _vm.$attrs.class]},[_c('transition',{attrs:{"name":_vm.contentTransition}},[_c(_vm.tag,{ref:"content",tag:"component",class:['vts-dialog__content', _vm.classes.content],style:({
              width: _vm.width,
              'inline-size': _vm.inlineSize,
              'max-width': _vm.maxWidth,
              'max-inline-size': _vm.maxInlineSize,
            }),attrs:{"tabindex":"-1","role":"dialog","aria-modal":"true"}},[_vm._t("default")],2)],1)],1)]:_vm._e()],2)],2):_vm._e()};
var __vue_staticRenderFns__$d = [];

  /* style */
  var __vue_inject_styles__$f = function (inject) {
    if (!inject) { return }
    inject("data-v-cc63d82e_0", { source: ".vts-dialog{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;inset:0}.vts-dialog__content:focus{outline:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$f = undefined;
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var NAME$1 = 'vts-drawer';

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
var script$e = {
  name: 'VDrawer',
  model: {
    prop: 'showing',
    event: 'update',
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    tag: {
      type: String,
      default: 'aside',
    },
    /**
     * Flag to place the drawer on the right side.
     */
    right: Boolean,
    /**
     * CSS width value.
     */
    width: {
      type: String,
      default: '',
    },
    /**
     * CSS width to set the dialog to.
     */
    inlineSize: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width value.
     */
    maxWidth: {
      type: String,
      default: '',
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxInlineSize: {
      type: String,
      default: '',
    },
    /**
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: {
      type: String,
      default: '',
    },
    /**
     * Vue transition name for the background.
     *
     * @deprecated
     */
    bgTransition: {
      type: String,
      default: '',
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localShow: this.showing,
      activeElement: null,
    };
  },

  computed: {
    slots: function slots() {
      if (!isVue3) {
        return this.$scopedSlots;
      }
      return this.$slots;
    },
  },

  watch: {
    showing: function showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler: function handler(next, prev) {
        if (typeof window === 'undefined') { return; }

        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();

          var ref = this;
          var activeElement = ref.activeElement;
          if (activeElement && activeElement.focus) {
            this.$nextTick(function () {
              activeElement.focus();
            });
          }
        }

        this.$emit('update', next);
      },
    },
  },

  destroyed: function destroyed() {
    this.onClose();
  },

  methods: {
    onOpen: function onOpen() {
      var this$1$1 = this;

      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.addEventListener('click', onClick);
      window.addEventListener('keydown', onKeydown);
      noScroll && document.body.style.setProperty('overflow', 'hidden');
      this.$nextTick(function () { return this$1$1.$refs.content.focus(); });
      this.$emit('open');
    },
    onClose: function onClose() {
      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeydown);
      noScroll && document.body.style.removeProperty('overflow');
      this.$emit('close');
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains(NAME$1)) {
        this.localShow = false;
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return; }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return;
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
var __vue_script__$e = script$e;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.localShow || _vm.slots.toggle)?_c('span',[(_vm.slots.toggle)?_vm._t("toggle",null,null,{
      on: {
        click: function () { return (_vm.localShow = !_vm.localShow); },
      },
      bind: {
        type: 'button',
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': '' + _vm.localShow,
      },
    }):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":_vm.bgTransition || _vm.transition,"appear":""}},[(_vm.localShow)?[_c('div',{class:['vts-drawer', _vm.classes.root, _vm.classes.bg, _vm.$attrs.class]},[_c('transition',{attrs:{"name":_vm.transition,"appear":""}},[(_vm.localShow)?_c(_vm.tag,{ref:"content",tag:"component",class:[
              'vts-drawer__content',
              { 'vts-drawer__content--right': !!_vm.right },
              _vm.classes.content ],style:({
              width: _vm.width,
              'inline-size': _vm.inlineSize,
              'max-width': _vm.maxWidth,
              'max-inline-size': _vm.maxInlineSize,
            }),attrs:{"tabindex":"-1"}},[_vm._t("default")],2):_vm._e()],1)],1)]:_vm._e()],2)],2):_vm._e()};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$e = function (inject) {
    if (!inject) { return }
    inject("data-v-9e6964d8_0", { source: ".vts-drawer{position:fixed;z-index:100;inset:0}.vts-drawer__content{overflow:auto;max-inline-size:20rem;block-size:100%}.vts-drawer__content:focus{outline:0}.vts-drawer__content--right{margin-inline-start:auto}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$e = undefined;
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
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

/**
 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
 */
var script$d = {
  name: 'VDrawer',
  props: {
    /**
     * The toggle button text.
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * Where the content should be placed in relation to the button.
     *
     * Options: 'bottom', 'top'
     */
    position: {
      type: String,
      default: 'bottom',
      validator: function validator(value) {
        return ['top', 'bottom'].includes(value);
      },
    },
    /**
     * The transition name.
     */
    transition: {
      type: String,
      default: '',
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    isHovered: false,
    isFocused: false,
  }); },

  mounted: function mounted() {
    document.addEventListener('click', this.onClickout);
  },

  /** @deprecated in Vue 3 */
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('click', this.onClickout);
  },
  beforeUnmount: function beforeUnmount() {
    document.removeEventListener('click', this.onClickout);
  },

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
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-dropdown', _vm.classes.root],on:{"mouseenter":function($event){_vm.isHovered = true;},"mouseleave":function($event){_vm.isHovered = false;},"focus":function($event){_vm.isFocused = true;},"blur":function($event){_vm.isFocused = false;},"focusout":_vm.onFocusout}},[_c('button',{class:['vts-dropdown__trigger', _vm.classes.trigger],attrs:{"aria-expanded":!!_vm.isHovered || !!_vm.isFocused,"aria-haspopup":"true"},on:{"click":function($event){_vm.isFocused = !_vm.isFocused;}}},[_vm._t("trigger",function(){return [_vm._v("\n      "+_vm._s(_vm.text)+"\n    ")]})],2),_vm._v(" "),_c('transition',{attrs:{"name":_vm.transition}},[(!!_vm.isHovered || !!_vm.isFocused)?_c('div',{staticClass:"vts-dropdown__content",class:[("vts-dropdown__content--" + _vm.position), _vm.classes.content]},[_vm._t("default")],2):_vm._e()])],1)};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$d = function (inject) {
    if (!inject) { return }
    inject("data-v-675e2151_0", { source: ".vts-dropdown{display:inline-block;position:relative}.vts-dropdown__content{position:absolute;z-index:5;min-inline-size:100%}.vts-dropdown__content--top{inset-block-start:0;transform:translateY(-100%)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$d = undefined;
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$c = {
  name: 'VFile',
  model: {
    prop: 'files',
    event: 'update',
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    files: {
      type: Array,
      default: function () { return []; },
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    localFiles: [],
    droppable: false,
  }); },

  computed: {
    listeners: function listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },

  watch: {
    files: function files(files$1) {
      this.localFiles = files$1;
    },
    localFiles: function localFiles() {
      this.droppable = false;
    },
  },

  created: function created() {
    this.id = this.$attrs.id || 'vts-' + randomString(4);
  },

  methods: {
    onChange: function onChange(event) {
      var files = Array.from(event.target.files);
      this.localFiles = files;
      this.$emit('update', files);
    },

    onDrop: function onDrop(event) {
      var files = Array.from(event.dataTransfer.files);
      var isMulti = this.$attrs.multiple != null;
      if (!isMulti && files.length > 1) {
        files.length = 1;
      }
      this.localFiles = files;
      this.$emit('update', files);
    },

    // clear() {
    //   this.localFiles = []
    //   this.$refs.input.value = null
    //   this.$emit("update", [])
    // },
  },
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:[
    'vts-file',
    {
      'vts-file--droppable': _vm.droppable,
      'vts-file--selected': !!_vm.localFiles.length,
    },
    _vm.classes.label ],attrs:{"for":_vm.id}},[_c('input',_vm._g(_vm._b({ref:"input",class:['vts-visually-hidden', _vm.classes.input],attrs:{"id":_vm.id,"type":"file"},on:{"change":_vm.onChange}},'input',_vm.$attrs,false),_vm.listeners)),_vm._v(" "),_c('span',{class:['vts-file__text', _vm.classes.text]},[_vm._t("label",function(){return [_vm._v(_vm._s(_vm.label))]})],2),_vm._v(" "),_c('div',{staticClass:"vts-file__dropzone",on:{"dragenter":function($event){$event.preventDefault();_vm.droppable = true;}}},[_vm._t("default",function(){return [(_vm.localFiles.length)?_c('span',{attrs:{"aria-hidden":"true"}},[(_vm.localFiles.length > 1)?[_vm._v("\n          "+_vm._s(_vm.localFiles.length)+" files selected\n        ")]:[_vm._v("\n          "+_vm._s(_vm.localFiles[0].name)+"\n        ")]],2):_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("\n        Choose files or drop here\n      ")])]},null,{ files: _vm.localFiles, droppable: _vm.droppable }),_vm._v(" "),(_vm.droppable)?_c('span',{staticClass:"vts-file__overlay",on:{"drop":function($event){$event.preventDefault();return _vm.onDrop.apply(null, arguments)},"dragenter":function($event){$event.stopPropagation();_vm.droppable = true;},"dragleave":function($event){$event.stopPropagation();_vm.droppable = false;},"dragover":function($event){$event.preventDefault();}}},[_vm._t("overlay")],2):_vm._e()],2)])};
var __vue_staticRenderFns__$a = [];

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-6be6f352_0", { source: ".vts-visually-hidden{position:absolute;overflow:hidden;clip:rect(0 0 0 0);inline-size:1px;block-size:1px;margin:-1px;border:0;padding:0}.vts-file__dropzone{position:relative}.vts-file__overlay{position:absolute;inset:0}input:focus~.vts-file__dropzone{outline-width:1px;outline-style:auto;outline-color:Highlight;outline-color:-webkit-focus-ring-color}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var controlTypes = new Set(['INPUT', 'SELECT', 'TEXTAREA']);

var script$b = {
  name: 'VForm',
  props: {
    lazy: Boolean,
    errors: {
      type: Object,
      default: function () { return ({}); },
    },
    preventNavigation: Boolean,
    // storageKey: {
    //   type: String,
    //   default: '',
    // },
    honeypot: {
      type: [Boolean, String],
      default: false,
    },
  },

  data: function () { return ({
    dirty: false,
    /** This may need more robust checking. @see https://www.sitepoint.com/detect-html-form-changes/ */
    modified: false,
    localInputs: {},
  }); },

  computed: {
    /** @returns {object} */
    listeners: function listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
    /** @returns {string} */
    event: function event() {
      return this.lazy ? 'change' : 'input';
    },
    /** @returns {boolean} */
    valid: function valid() {
      return !Object.values(this.localInputs).find(function (input) { return !input.valid; });
    },
    /** @returns {boolean} */
    error: function error() {
      return !this.valid && this.dirty;
    },
    /** @returns {object} */
    inputs: function inputs() {
      var inputs = {};
      var ref = this;
      var localInputs = ref.localInputs;
      var errors = ref.errors;

      var loop = function ( key ) {
        var input = Object.assign({}, localInputs[key],
          {error: localInputs[key].dirty && !localInputs[key].valid,
          errors: []});

        var errorsMap = new Map(Object.entries(errors || {}));

        errorsMap.forEach(function (value, key) {
          if (!input.invalid[key]) { return; }

          var errorHandler = errorsMap.get(key);
          // console.log(errorHandler);
          var attrName = key.replace('length', 'Length'); // for minLength and maxLength

          var errorMessage =
            typeof errorHandler === 'string'
              ? errorHandler
              : errorHandler(input._inputEl[attrName]);

          input.errors.push(errorMessage);
        });

        inputs[key] = input;
      };

      for (var key in localInputs) loop( key );

      return inputs;
    },
  },

  mounted: function mounted() {
    this.validate();
    var observer = new MutationObserver(this.validate);
    observer.observe(this.$el, {
      childList: true,
      subtree: true,
    });
    this.observer = observer;

    if (this.preventNavigation) {
      window.addEventListener('beforeunload', this.preventNav);
    }

    // if (this.storageKey) {
    //   this.syncFromLocalStorage();
    // }
  },
  // @ts-ignore
  // eslint-disable-next-line
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (!this.modified) { next(); }
    if (window.confirm('Leave without saving?')) { next(); }
  },
  /** @deprecated */
  beforeDestroy: function beforeDestroy() {
    this.observer.disconnect();
    window.removeEventListener('beforeunload', this.preventNav);
  },
  beforeUnmount: function beforeUnmount() {
    this.observer.disconnect();
  },

  methods: {
    checkModified: function checkModified(ref) {
      var target = ref.target;

      if (!controlTypes.has(target.tagName)) { return; }
      this.modified = true;
    },
    validate: function validate() {
      /** @type {NodeListOf<HTMLInputElement>} */
      var els = this.$el.querySelectorAll('input, textarea, select');

      var localInputs = {};

      els.forEach(function (input) {
        var name = input.name;
        var id = input.id;
        var validity = input.validity;
        var key = name || id;
        if (!key) { return; }

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
            pattern: validity.patternMismatch,
          },
        };

        switch (input.type) {
          case 'checkbox':
            localInputs[key].value = input.checked;
            break;
          case 'radio':
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
    onEvent: function onEvent() {
      this.validate();
      // if (this.storageKey) {
      //   this.syncToLocalStorage();
      // }
    },
    onBlur: function onBlur(ref) {
      var target = ref.target;

      if (!controlTypes.has(target.tagName)) { return; }

      this.dirty = true;
      this.localInputs[target.name].dirty = true;
    },

    clear: function clear() {
      /** @type {HTMLInputElement[]} */
      var els = Array.from(
        this.$el.querySelectorAll('input, textarea, select')
      );
      els.forEach(function (input) {
        if (['radio', 'checkbox'].includes(input.type)) {
          input.checked = false;
        } else {
          input.value = '';
        }
      });
    },

    reset: function reset() {
      this.modified = false;
      this.dirty = false;
      this.validate();
    },

    onSubmit: function onSubmit(event) {
      if (!event.target.checkValidity()) {
        this.$emit('invalid', event);
        return;
      }
      this.reset();
      this.$emit('valid', event);
    },

    preventNav: function preventNav(event) {
      if (!this.modified) { return; }
      event.preventDefault();
      event.returnValue = '';
    },

    // syncToLocalStorage() {
    //   localStorage.setItem(this.storageKey, JSON.stringify(this.localInputs));
    // },

    // syncFromLocalStorage() {
    //   try {
    //     const parsed = JSON.parse(localStorage.getItem(this.storageKey));
    //     if (!parsed) return;

    //     const els = Array.from(
    //       this.$el.querySelectorAll('input, textarea, select')
    //     );
    //     els.forEach(input => {
    //       const key = input.name || input.id;
    //       if (!parsed[key]) return;

    //       // TODO:
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',_vm._g({class:[
    'vts-form',
    {
      'vts-form--invalid': !_vm.valid,
      'vts-form--dirty': _vm.dirty,
      'vts-form--error': _vm.error,
    } ],attrs:{"method":_vm.$attrs.method || 'POST'},on:_vm._d({"keydown":_vm.checkModified,"change":_vm.checkModified,"submit":_vm.onSubmit,"!blur":function($event){return _vm.onBlur.apply(null, arguments)}},[_vm.event,_vm.onEvent])},_vm.listeners),[(_vm.honeypot)?_c('input',{staticClass:"visually-hidden",attrs:{"name":typeof _vm.honeypot === 'string' ? _vm.honeypot : 'vts-honeypot',"tabindex":"-1","autocomplete":"off","aria-hidden":"true"}}):_vm._e(),_vm._v(" "),_vm._t("default",null,null,{ valid: _vm.valid, dirty: _vm.dirty, modified: _vm.modified, error: _vm.error, inputs: _vm.inputs, clear: _vm.clear, validate: _vm.validate })],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$b = function (inject) {
    if (!inject) { return }
    inject("data-v-81c29f42_0", { source: ".vts-visually-hidden{position:absolute;overflow:hidden;clip:rect(0 0 0 0);inline-size:1px;block-size:1px;margin:-1px;border:0;padding:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var NAME = 'vts-img';

/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 *
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
var script$a = {
  name: 'VImg',
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
    srcset: {
      type: String,
      default: '',
    },
    /**
     * URL of the blurred placeholder image to use if you need one (ideally a very small image).
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * CSS background styles for the placeholder in case you just want colors.
     */
    background: {
      type: String,
      default: '',
    },

    transitionDuration: {
      type: [Number, String],
      default: 300,
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    dataUrl: '',
  }); },

  computed: {
    listeners: function listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },

  watch: {
    src: {
      handler: 'init',
    },
    srcset: {
      handler: 'init',
    },
  },

  mounted: function mounted() {
    this.init();
  },
  beforeUnmount: function beforeUnmount() {
    this.observer.disconnect();
  },
  /** @deprecated */
  beforeDestroy: function beforeDestroy() {
    this.observer.disconnect();
  },

  methods: {
    init: function init() {
      this.dataUrl = this.getDataUrl();

      this.observer = new IntersectionObserver(this.handler);
      this.observer.observe(this.$el);
    },

    handler: function handler(ref) {
      var entry = ref[0];

      var ref$1 = this;
      var $el = ref$1.$el;

      if (entry.isIntersecting) {
        // Element is in viewport
        $el.classList.add((NAME + "--loading"));
        this.loadImg();
        this.observer.disconnect();
      }
    },

    getDataUrl: function getDataUrl() {
      if (typeof window === 'undefined') { return; }

      var ref = this.$attrs;
      var width = ref.width;
      var height = ref.height;
      if (!width || !height) { return ''; }

      var w = 100;
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = (height / width) * w;

      return canvas.toDataURL();
    },

    loadImg: function loadImg() {
      var ref = this;
      var src = ref.src;
      var srcset = ref.srcset;
      var ref$1 = this.$refs;
      var img = ref$1.img;

      img.addEventListener('load', this.onLoad);

      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
    },

    onLoad: function onLoad() {
      var ref = this;
      var $el = ref.$el;
      var ref$1 = this.$refs;
      var img = ref$1.img;
      var placeholder = ref$1.placeholder;

      $el.classList.remove((NAME + "--loading"));
      $el.classList.add((NAME + "--loaded"));

      if (placeholder) {
        img.addEventListener('transitionend', function onTransitionEnd() {
          placeholder.remove();
          img.removeEventListener('transitionend', onTransitionEnd);
        });
      }

      img.removeEventListener('load', this.onLoad);
    },
  },
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('picture',{class:['vts-img', _vm.classes.root]},[(_vm.dataUrl)?_c('div',{ref:"placeholder",class:['vts-img__placeholder', _vm.classes.placeholder],style:({ background: _vm.background })},[_c('img',_vm._b({attrs:{"src":_vm.placeholder || _vm.dataUrl,"alt":"","decoding":_vm.$attrs.decoding || 'async'}},'img',_vm.$attrs,false))]):_vm._e(),_vm._v(" "),_c('img',_vm._g(_vm._b({ref:"img",class:['vts-img__img', _vm.classes.img],style:({
      transitionDuration: (_vm.transitionDuration + "ms"),
    }),attrs:{"src":_vm.dataUrl,"alt":_vm.$attrs.alt || '',"decoding":_vm.$attrs.decoding || 'async'}},'img',_vm.$attrs,false),_vm.listeners))])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-166cc415_0", { source: ".vts-img{display:inline-block;position:relative}.vts-img img{vertical-align:top}.vts-img__placeholder{position:absolute;overflow:hidden}.vts-img__placeholder img{transform:scale(1.05);filter:blur(10px)}.vts-img__img{opacity:0;transition-property:opacity;transition-timing-function:ease}.vts-img--loaded .vts-img__img{opacity:1}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

//

/**
 * TODO:
 * Provide prop for error,invalid classes on input
 * Remove span from labels (breaking)
 * Use validationMessage @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
 */

/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
var script$9 = {
  name: 'VInput',
  inheritAttrs: false,

  model: {
    event: 'update',
  },

  props: {
    /**
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The input value. Works for all inputs except type `radio`. See `options` prop.
     */
    value: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },

    /**
     * An array of options used for inputs of type `radio` or type `select`
     */
    options: {
      type: Array,
      default: function () { return []; },
    },

    errors: {
      type: Object,
      default: function () { return ({}); },
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localValue: this.value, // Required for weird bug when nested in VForm
      valid: true,
      anyInvalid: false, // TODO: deprecate
      dirty: false,
      invalid: {},
    };
  },

  computed: {
    /** @returns {any} */
    bind: function bind() {
      var ref = this;
      var id = ref.id;
      var name = ref.name;
      var valid = ref.valid;
      var dirty = ref.dirty;
      var error = ref.error;
      var errorMessages = ref.errorMessages;
      var classes = ref.classes;
      var $attrs = ref.$attrs;

      var describedby = [];
      if (error) { describedby.push((id + "__description")); }
      if (errorMessages.length) { describedby.push((id + "__errors")); }

      var attrs = Object.assign({}, {'aria-invalid': !valid,
        'aria-describedby':
          dirty && describedby.length ? describedby.join(' ') : false},
        $attrs,
        {id: (id + "__input"),
        name: name,
        class: ['vts-input__input', classes.input]});

      return attrs;
    },
    /** @returns {Record<string, string> | Record<string, Function | Function[]>} */
    listeners: function listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
    slots: function slots() {
      if (!isVue3) {
        return this.$scopedSlots;
      }
      return this.$slots;
    },

    computedOptions: function computedOptions() {
      var ref = this;
      var $attrs = ref.$attrs;
      var localValue = ref.localValue;
      return this.options.map(function (item) {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === 'object' ? item : { value: item };
        return Object.assign(item, $attrs, {
          label: item.label || item.value,
          value: item.value,
          checked:
            localValue !== undefined ? item.value === localValue : item.checked,
        });
      });
    },
    /** @returns {boolean} */
    isMultiple: function isMultiple() {
      var ref = this.$attrs;
      var multiple = ref.multiple;
      return multiple != null && multiple != 'false';
    },
    /** @returns {boolean} */
    error: function error() {
      return !this.valid && this.dirty;
    },

    errorMessages: function errorMessages() {
      var ref = this;
      var invalid = ref.invalid;
      var errors = ref.errors;
      var $attrs = ref.$attrs;
      var errorMessages = [];

      Object.keys(errors || {}).forEach(function (key) {
        if (!invalid[key]) { return; }

        var errorHandlerOrMessage = errors[key];

        var errorMessage =
          typeof errorHandlerOrMessage === 'function'
            ? errorHandlerOrMessage($attrs[key])
            : errorHandlerOrMessage;

        errorMessages.push(errorMessage);
      });

      return errorMessages;
    },
  },

  watch: {
    value: function value(value$1, previousValue) {
      if (value$1 === previousValue) { return; }
      this.localValue = value$1;
      // TODO: Do we want to do this to trigger event listeners?
      // inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    },
    localValue: function localValue(value) {
      /**
       * @event update
       * @type { any }
       */
      this.$emit('update', value);
      this.validate();
    },
  },

  created: function created() {
    this.id = this.$attrs.id || 'vts-' + randomString(4);
  },

  mounted: function mounted() {
    this.validate();
  },

  methods: {
    validate: function validate() {
      var input = this.$refs.input;

      if (Array.isArray(input)) {
        if (!input.length) { return; }
        input = input[0];
      }

      var validity = input.validity;

      // https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/

      this.anyInvalid = !validity.valid; // TODO: deprecate
      this.valid = validity.valid;
      this.invalid = {
        type: validity.typeMismatch,
        required: validity.valueMissing,
        minlength: validity.tooShort,
        maxlength: validity.tooLong,
        min: validity.rangeUnderflow,
        max: validity.rangeOverflow,
        pattern: validity.patternMismatch,
      };
    },
  },
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'vts-input',
    ("vts-input--" + (_vm.$attrs.type || 'text')),
    {
      'vts-input--required': _vm.$attrs.hasOwnProperty('required'),
      'vts-input--invalid': !_vm.valid,
      'vts-input--dirty': _vm.dirty,
      'vts-input--error': _vm.error,
    },
    _vm.classes.root ]},[('radio' === _vm.$attrs.type)?_c('fieldset',{class:['vts-input__fieldset', _vm.classes.fieldset]},[(_vm.label)?_c('legend',{class:['vts-input__legend', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.computedOptions),function(option,index){return _c('label',{key:option.value,class:['vts-input__label', _vm.classes.label],attrs:{"for":(_vm.id + "__input-" + index)}},[_c('input',_vm._g(_vm._b({ref:"input",refInFor:true,attrs:{"id":(_vm.id + "__input-" + index)},on:{"input":function($event){_vm.localValue = option.value;},"~blur":function($event){_vm.dirty = true;}}},'input',Object.assign({}, _vm.bind, option),false),_vm.listeners)),_vm._v(" "),_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n        "+_vm._s(option.label)+"\n      ")])])})],2):('checkbox' === _vm.$attrs.type)?_c('label',{class:['vts-input__label', _vm.classes.label],attrs:{"for":(_vm.id + "__input")}},[_c('input',_vm._g(_vm._b({ref:"input",domProps:{"checked":_vm.localValue === undefined ? _vm.$attrs.checked : _vm.localValue},on:{"change":function($event){_vm.localValue = $event.target.checked;},"~blur":function($event){_vm.dirty = true;}}},'input',_vm.bind,false),_vm.listeners)),_vm._v(" "),_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")])]):_c('label',{class:['vts-input__label', _vm.classes.label],attrs:{"for":(_vm.id + "__input")}},[_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]),_vm._v(" "),('select' === _vm.$attrs.type)?_c('select',_vm._g(_vm._b({ref:"input",domProps:{"value":_vm.localValue},on:{"input":function($event){_vm.localValue = $event.target.value;},"change":function($event){_vm.localValue = $event.target.value;},"~blur":function($event){_vm.dirty = true;}}},'select',_vm.bind,false),_vm.listeners),[_vm._t("options",function(){return _vm._l((_vm.computedOptions),function(option,i){return _c('option',_vm._b({key:i},'option',option,false),[_vm._v("\n          "+_vm._s(option.label)+"\n        ")])})})],2):('textarea' === _vm.$attrs.type)?_c('textarea',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"input",domProps:{"value":(_vm.localValue)},on:{"~blur":function($event){_vm.dirty = true;},"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value;}}},'textarea',_vm.bind,false),_vm.listeners)):(((_vm.bind).type)==='checkbox')?_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"input",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.localValue)?_vm._i(_vm.localValue,null)>-1:(_vm.localValue)},on:{"~blur":function($event){_vm.dirty = true;},"change":function($event){var $$a=_vm.localValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.localValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.localValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.localValue=$$c;}}}},'input',_vm.bind,false),_vm.listeners)):(((_vm.bind).type)==='radio')?_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"input",attrs:{"type":"radio"},domProps:{"checked":_vm._q(_vm.localValue,null)},on:{"~blur":function($event){_vm.dirty = true;},"change":function($event){_vm.localValue=null;}}},'input',_vm.bind,false),_vm.listeners)):_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"input",attrs:{"type":(_vm.bind).type},domProps:{"value":(_vm.localValue)},on:{"~blur":function($event){_vm.dirty = true;},"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value;}}},'input',_vm.bind,false),_vm.listeners))]),_vm._v(" "),(_vm.slots.description)?_c('div',{class:['vts-input__description', _vm.classes.description],attrs:{"id":(_vm.id + "__description")}},[_vm._t("description",null,null,{
        valid: _vm.valid,
        dirty: _vm.dirty,
        error: _vm.error,
        invalid: _vm.invalid,
        anyInvalid: _vm.anyInvalid,
        errors: _vm.errorMessages,
      })],2):_vm._e(),_vm._v(" "),(_vm.dirty && _vm.errorMessages.length)?_c('div',{class:['vts-input__errors', _vm.classes.errors],attrs:{"id":(_vm.id + "__errors")}},_vm._l((_vm.errorMessages),function(error){return _c('span',{key:error,class:['vts-input__error', _vm.classes.error]},[_vm._v("\n      "+_vm._s(error)+"\n    ")])}),0):_vm._e()])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
var script$8 = {
  name: 'VIntersect',
  props: {
    /**
     * The IntersectionObserver threshold value.
     */
    threshold: {
      type: [Number, Array],
      default: function () { return null; },
    },
    /**
     * The IntersectionObserver root value.
     */
    root: {
      type: String,
      default: undefined,
    },
    /**
     * The IntersectionObserver rootMargin value.
     */
    rootMargin: {
      type: String,
      default: undefined,
    },

    options: {
      type: Object,
      default: function () { return ({}); },
    },
  },
  emits: ['enter', 'exit', 'change'],

  data: function () { return ({
    entry: {},
  }); },

  mounted: function mounted() {
    var el = this.$el;
    if (isVue3) {
      // I'm not really sure why this is necessary
      el = this.$el.nextElementSibling;
    }
    var ref = this;
    var root = ref.root;
    var threshold = ref.threshold;
    var rootMargin = ref.rootMargin;
    var options = ref.options;
    var handler = ref.handler;
    var observerOptions = Object.assign({}, options,
      {root: root,
      threshold: threshold,
      rootMargin: rootMargin});

    this.observer = new IntersectionObserver(handler, observerOptions);
    this.observer.observe(el);
  },
  beforeUnmount: function beforeUnmount() {
    this.observer.disconnect();
  },
  /** @deprecated */
  beforeDestroy: function beforeDestroy() {
    this.observer.disconnect();
  },

  methods: {
    handler: function handler(ref) {
      var entry = ref[0];

      this.entry = entry;
      // console.log(entry)
      if (entry.isIntersecting) {
        /**
         * Fired when the observed element enters the screen.
         *
         * @event enter
         * @type { IntersectionObserverEntry }
         */
        this.$emit('enter', entry);
      } else {
        /**
         * Fired when the observed element exits the screen.
         *
         * @event exit
         * @type { IntersectionObserverEntry }
         */
        this.$emit('exit', entry);
      }
      /**
       * Fired when the observed element enters or exits the screen.
       *
       * @event change
       * @type { IntersectionObserverEntry }
       */
      this.$emit('change', entry);
    },
  },

  render: function render() {
    /** @slot Content to be tracked with IntersectionObserver */
    var ref = this;
    var entry = ref.entry;
    if (isVue3) {
      return this.$slots.default(entry);
    }

    /** @slot Slot content providing isIntersecting */
    var defaultSlot = this.$slots.default;
    var scopedSlot = this.$scopedSlots.default;

    if (defaultSlot) {
      return defaultSlot;
    }

    return scopedSlot(entry);
  },
};

/* script */
var __vue_script__$8 = script$8;

/* template */

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.
 */
var script$7 = {
  name: 'VModal',

  model: {
    prop: 'showing',
    event: 'change',
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
      default: 'div',
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
    width: {
      type: String,
      default: undefined,
    },
    /**
     * CSS max-width to set the modal to.
     */
    maxWidth: {
      type: String,
      default: undefined,
    },
    /**
     * Prevents the page from being scrolled while the modal is open.
     */
    noScroll: Boolean,
    /**
     * Transition name to apply to the modal.
     */
    transition: {
      type: String,
      default: undefined,
    },
    /**
     * Transition name to apply to the background.
     */
    bgTransition: {
      type: String,
      default: undefined,
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  watch: {
    showing: {
      handler: function handler(next, prev) {
        var this$1$1 = this;

        if (typeof window !== 'undefined') {
          if (next && next != prev) {
            this.noScroll &&
              document.body.style.setProperty('overflow', 'hidden');
            this.$nextTick(function () {
              this$1$1.$refs.content.focus();
            });
          } else {
            this.noScroll && document.body.style.removeProperty('overflow');
          }
        }
      },
    },
  },

  mounted: function mounted() {
    console.warn(
      "Vuetensil's VModal is deprecated. Please use VDialog instead."
    );
  },

  methods: {
    show: function show() {
      /**
       * Fired when the modal opens.
       *
       * @event show
       * @type { boolean }
       */
      this.$emit('show');
      this.$emit('change', true);
    },
    hide: function hide() {
      /**
       * Fired when the modal closes.
       *
       * @event hide
       * @type { boolean }
       */
      this.$emit('hide');
      this.$emit('change', false);
    },
    toggle: function toggle() {
      var ref = this;
      var showing = ref.showing;
      var event = showing ? 'hide' : 'show';
      this.$emit(event, !showing);
      /**
       * Fired whenever the modal opens or closes.
       *
       * @event change
       * @type { boolean }
       */
      this.$emit('change', !showing);
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains('vts-modal') && this.dismissible) {
        this.hide();
      }
    },

    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.hide();
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return; }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return;
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
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.bgTransition}},[(_vm.showing)?_c('div',{class:['vts-modal', _vm.classes.root],on:{"click":_vm.onClick,"keydown":_vm.onKeydown}},[_c('transition',{attrs:{"name":_vm.transition,"appear":""}},[_c(_vm.tag,{ref:"content",tag:"component",class:['vts-modal__content', _vm.classes.content],style:({ width: _vm.width, maxWidth: _vm.maxWidth }),attrs:{"tabindex":"-1","role":"dialog"}},[_vm._t("default")],2)],1)],1):_vm._e()])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-959c937c_0", { source: ".vts-modal{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.2)}.vts-modal [tabindex='-1']:focus{outline:0}.vts-modal__content{overflow:auto;max-width:70vw;max-height:80vh;background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$6 = {
  name: 'VResize',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  data: function () { return ({
    observer: undefined,
    width: undefined,
    height: undefined,
  }); },

  mounted: function mounted() {
    this.observer = new ResizeObserver(this.updateDimensions);
    this.observer.observe(this.$el);
  },
  beforeUnmount: function beforeUnmount() {
    this.observer.disconnect();
  },
  /** @deprecated */
  beforeDestroy: function beforeDestroy() {
    this.observer.disconnect();
  },

  methods: {
    updateDimensions: function updateDimensions() {
      var el = this.$el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.$emit('resize', arguments);
    },
  },
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"vts-resize"},[_vm._t("default",null,null,{ width: _vm.width, height: _vm.height, inlineSize: _vm.width, blockSize: _vm.height })],2)};
var __vue_staticRenderFns__$5 = [];

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
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$5 = {
  name: 'VSkip',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // mounted() {
  //   window.addEventListener(
  //     "hashchange",
  //     () => {
  //       this.skipTo(location.hash.substring(1))
  //     },
  //     false
  //   )
  //   if (location.hash && location.hash.substring(1)) {
  //     this.skipTo(location.hash.substring(1))
  //   }
  // },
  methods: {
    skipTo: function skipTo(id) {
      if (!id) { return; }

      var target = window.document.getElementById(id.slice(1));
      if (!target) { return; }

      if (
        !['a', 'select', 'input', 'button', 'textarea'].includes(
          target.tagName.toLowerCase()
        )
      ) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus();
    },
  },
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"vts-skip",attrs:{"href":_vm.to},on:{"click":function($event){return _vm.skipTo(_vm.to)}}},[_vm._t("default",function(){return [_vm._v("Skip to main content")]})],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-523a856e_0", { source: ".vts-skip{position:fixed;z-index:1000;inset-block-start:0;inset-inline-start:-10000px;border:3px solid;padding:.5rem;color:#000;background-color:#fff}.vts-skip:focus{inset-inline-start:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//

/**
 * @typedef {{ key: string, text: string, sortable: boolean, sort: (a, b, isAscending: boolean) => number }} Header
 * @typedef {Header & { bind: object, sortBtn: object }} ComputedHeader
 */

var script$4 = {
  name: 'VTable',
  provide: function provide() {
    return {
      $table: this,
    };
  },
  props: {
    /** @type {import('vue').PropOptions<Header[]>} */
    headers: {
      type: Array,
      default: function () { return []; },
    },
    /** @type {import('vue').PropOptions<Object[]>} */
    items: {
      type: Array,
      default: function () { return []; },
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    perPage: {
      type: [Number, String],
      default: -1,
    },
    sortBy: {
      type: String,
      default: '',
    },
    /** @type {import('vue').PropOptions<'ASC'|'DESC'>} */
    // @ts-ignore
    sortDirection: {
      type: String,
      default: '',
      validator: function (direction) {
        return new Set(['ASC', 'DESC', '']).has(direction.toUpperCase());
      },
    },
    id: {
      type: String,
      default: 'vts-' + randomString(4),
    },
    caption: {
      type: String,
      default: '',
    },
    sortable: Boolean,
    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localSortBy: this.sortBy,
      localSortDirection: this.sortDirection
        ? this.sortDirection.toUpperCase()
        : '',
      localPage: Number(this.page),
      localPerPage: Number(this.perPage),
      // tabindex: null,
    };
  },

  computed: {
    /** @return {ComputedHeader[]} */
    computedHeaders: function computedHeaders() {
      var this$1$1 = this;

      var ref = this;
      var headers = ref.headers;
      var sortable = ref.sortable;
      var localSortBy = ref.localSortBy;
      var localSortDirection = ref.localSortDirection;
      var computedHeaders = [];

      headers.forEach(function (header) {
        /** @type {ComputedHeader} */
        var computedHeader = Object.assign({}, header,
          {bind: {},
          sortBtn: {
            bind: { 'aria-label': "toggle sort direction" },
            on: { click: function () { return this$1$1.onSort(header.key); } },
          }});

        if (computedHeader.sortable === undefined) {
          computedHeader.sortable = !!computedHeader.sort || sortable;
        }

        if (computedHeader.sortable) {
          if (localSortBy === header.key && localSortDirection) {
            if (localSortDirection === 'ASC') {
              computedHeader.bind['aria-sort'] = 'ascending';
            } else {
              computedHeader.bind['aria-sort'] = 'descending';
            }
          }
        }

        computedHeaders.push(computedHeader);
      });
      return computedHeaders;
    },

    /** @return {Array} */
    computedItems: function computedItems() {
      var ref = this;
      var computedHeaders = ref.computedHeaders;
      var items = ref.items;
      var localSortBy = ref.localSortBy;
      var localSortDirection = ref.localSortDirection;
      var localPage = ref.localPage;
      var localPerPage = ref.localPerPage;

      var computedItems = [].concat( items );

      if (localSortBy && localSortDirection) {
        var targetColumn = computedHeaders.find(function (header) {
          return header.key === localSortBy;
        });

        var compareFn = this.defaultComparisonFn;
        if (typeof targetColumn.sort === 'function') {
          compareFn = targetColumn.sort;
        }

        computedItems = computedItems.sort(function (a, b) {
          return compareFn(a, b, localSortDirection === 'ASC');
        });
      }

      if (localPerPage > -1) {
        var offset = (Math.max(localPage, 1) - 1) * localPerPage;
        computedItems = computedItems.slice(offset, offset + localPerPage);
      }

      return computedItems;
    },

    /** @return {number} */
    lastPage: function lastPage() {
      return Math.ceil(this.items.length / +this.perPage);
    },
  },

  watch: {
    /** @param {string} value */
    sortBy: function sortBy(value) {
      this.localSortBy = value;
    },
    localSortBy: function localSortBy(value) {
      this.$emit('update:sort-by', value);
    },
    /** @param {string} value */
    sortDirection: function sortDirection(value) {
      this.localSortDirection = (value && value.toUpperCase()) || '';
    },
    localSortDirection: function localSortDirection(value) {
      this.$emit('update:sort-direction', value);
    },
    /** @param {string | number} value */
    page: function page(value) {
      this.localPage = Number(value);
    },
    localPage: function localPage(value) {
      this.$emit('update:page', value);
    },
    /** @param {string | number} value */
    perPage: function perPage(value) {
      this.localPerPage = Number(value);
    },
    localPerPage: function localPerPage(value) {
      this.$emit('update:per-page', value);
    },
  },

  // mounted() {
  //   const { scrollWidth, clientWidth } = this.$refs.container;
  //   const scrollable = scrollWidth > clientWidth;
  //   this.tabindex = scrollable ? '0' : null;
  // },

  methods: {
    /**
     * @param a
     * @param b
     * @param {boolean} isAscending
     * @return {number}
     */
    defaultComparisonFn: function defaultComparisonFn(a, b, isAscending) {
      var ref = this;
      var localSortBy = ref.localSortBy;
      var multiplier = isAscending ? 1 : -1;

      var aVal = a[localSortBy];
      var bVal = b[localSortBy];

      var isNumeric = Number.isFinite(aVal) && Number.isFinite(bVal);

      if (isNumeric) {
        return (aVal - bVal) * multiplier;
      }
      if (aVal < bVal) { return -1 * multiplier; }
      if (aVal > bVal) { return 1 * multiplier; }
      return 0;
    },

    onSort: function onSort(key) {
      var ref = this;
      var localSortBy = ref.localSortBy;
      var localSortDirection = ref.localSortDirection;
      this.localPage = 1;

      if (key !== localSortBy) {
        this.localSortBy = key;
        this.localSortDirection = 'ASC';
        return;
      }

      switch (localSortDirection) {
        case 'ASC':
          this.localSortDirection = 'DESC';
          break;
        case 'DESC':
          this.localSortDirection = '';
          break;
        default:
          this.localSortDirection = 'ASC';
      }
    },

    /**
     * @param page
     * @return {void}
     */
    goToPage: function goToPage(page) {
      var ref = this;
      var lastPage = ref.lastPage;
      this.localPage = Math.min(Math.max(1, page), lastPage);
    },
  },
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",class:['vts-table', { 'vts-table--sortable': _vm.sortable }, _vm.classes.root],attrs:{"role":"region","aria-labelledby":"caption"}},[_c('table',{class:[_vm.classes.table]},[_vm._t("default",function(){return [(_vm.caption)?_c('caption',{class:[_vm.classes.caption],attrs:{"id":(_vm.id + "__caption")}},[_vm._v("\n        "+_vm._s(_vm.caption)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.computedHeaders.length)?_c('thead',{class:[_vm.classes.thead]},[_c('tr',{class:[_vm.classes.tr]},_vm._l((_vm.computedHeaders),function(header,index){return _c('th',_vm._b({key:header.key,class:[_vm.classes.th]},'th',header.bind,false),[_vm._t(("header." + (header.key)),function(){return [_vm._v("\n              "+_vm._s(header.text || header.key)+"\n\n              "),(header.sortable)?[(
                    header.key === _vm.localSortBy && _vm.localSortDirection === 'ASC'
                  )?_vm._t("sort-asc",function(){return [_c('button',_vm._g(_vm._b({class:[
                      'vts-table__sort-btn',
                      'vts-table__sort-btn--asc',
                      _vm.classes.sortBtn ]},'button',header.sortBtn.bind,false),header.sortBtn.on),[_vm._v("\n                    ↑\n                  ")])]},null,header.sortBtn):(
                    header.key === _vm.localSortBy &&
                      _vm.localSortDirection === 'DESC'
                  )?_vm._t("sort-desc",function(){return [_c('button',_vm._g(_vm._b({class:[
                      'vts-table__sort-btn',
                      'vts-table__sort-btn--desc',
                      _vm.classes.sortBtn ]},'button',header.sortBtn.bind,false),header.sortBtn.on),[_vm._v("\n                    ↓\n                  ")])]},null,header.sortBtn):_vm._t("sort-none",function(){return [_c('button',_vm._g(_vm._b({class:['vts-table__sort-btn', _vm.classes.sortBtn]},'button',header.sortBtn.bind,false),header.sortBtn.on),[_vm._v("\n                    ↕\n                  ")])]},null,header.sortBtn)]:_vm._e()]},null,{
                header: header,
                index: index,
              })],2)}),0)]):_vm._e(),_vm._v(" "),_c('tbody',{class:[_vm.classes.tbody]},[_vm._t("body",function(){return _vm._l((_vm.computedItems),function(item,index){return _c('tr',{key:item.id,class:['vts-table__row', _vm.classes.tr]},[_vm._t("row",function(){return _vm._l((_vm.computedHeaders),function(column){return _c('td',{key:column.key,class:[_vm.classes.td]},[_vm._t(("column." + (column.key)),function(){return [_vm._v("\n                  "+_vm._s(item[column.key])+"\n                ")]},null,{
                    item: item,
                    index: (_vm.localPage - 1) * _vm.localPerPage + index,
                    row: index + 1,
                    key: column.key,
                    column: column.key,
                    value: item[column.key],
                    cell: item[column.key],
                    data: item[column.key],
                  })],2)})},null,{ item: item, index: index, row: index + 1 })],2)})},null,{
            items: _vm.computedItems,
            sortBy: _vm.localSortBy,
            sortDirection: _vm.localSortDirection,
            page: _vm.localPage,
            perPage: _vm.localPerPage,
          })],2),_vm._v(" "),(_vm.$slots.tfoot)?_c('tfoot',{class:[_vm.classes.tfoot]},[_vm._t("tfoot")],2):_vm._e()]},null,{
        caption: _vm.caption,
        headers: _vm.computedHeaders,
        items: _vm.computedItems,
        sortBy: _vm.localSortBy,
        sortDirection: _vm.localSortDirection,
        page: _vm.localPage,
        perPage: _vm.localPerPage,
      })],2),_vm._v(" "),_vm._t("pagination",function(){return [(_vm.lastPage > 1)?_c('div',{class:['vts-table__pagination', _vm.classes.pagination]},[_c('button',{class:['vts-table__prev', _vm.classes.previous],attrs:{"disabled":_vm.localPage === 1,"aria-label":"go to previous page"},on:{"click":function($event){return _vm.goToPage(_vm.localPage - 1)}}},[_vm._v("\n        Prev\n      ")]),_vm._v(" "),_c('ul',{class:['vts-table__pages', _vm.classes.pageList]},_vm._l((_vm.lastPage),function(pageNum){return _c('li',{key:pageNum,class:[
            'vts-table__page-item',
            { 'vts-table__page-item--current': pageNum === _vm.localPage },
            _vm.classes.pageItem ]},[_c('button',{class:[
              'vts-table__page',
              { 'vts-table__page--current': pageNum === _vm.localPage },
              _vm.classes.page ],attrs:{"disabled":pageNum === _vm.localPage,"aria-label":("go to page " + pageNum)},on:{"click":function($event){return _vm.goToPage(pageNum)}}},[_vm._v("\n            "+_vm._s(pageNum)+"\n          ")])])}),0),_vm._v(" "),_c('button',{class:['vts-table__next', _vm.classes.next],attrs:{"disabled":_vm.localPage === _vm.lastPage,"aria-label":"go to next page"},on:{"click":function($event){return _vm.goToPage(_vm.localPage + 1)}}},[_vm._v("\n        Next\n      ")])]):_vm._e()]},null,{ page: _vm.localPage, perPage: _vm.localPerPage, lastPage: _vm.lastPage, goToPage: _vm.goToPage })],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-5ef05f17_0", { source: ".vts-table table{inline-size:100%;table-layout:fixed}.vts-table__pages,.vts-table__pagination{display:flex}.vts-table__pagination{align-items:center;justify-content:center}.vts-table__page-item,.vts-table__pages{display:contents;list-style-type:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//

// const NAME = "vts-tabs"

// https://codesandbox.io/embed/vue-tabs-pt5lm?codemirror=1

/**
 * Show and hide content based on which tabs are selected.
 *
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 *
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
var script$3 = {
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
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      activeIndex: this.active,
      activeTab: this.active,
    };
  },

  computed: {
    /** @returns {Array} */
    tabList: function tabList() {
      return Object.keys(this.$slots).filter(function (name) { return name.startsWith('tab-'); });
    },
    /** @returns {Array} */
    panelList: function panelList() {
      return Object.keys(this.$slots).filter(function (name) { return name.startsWith('panel-'); });
    },
  },

  watch: {
    active: function active(next) {
      this.activeIndex = Math.max(0, Math.min(this.tabList.length - 1, next));
    },
    activeIndex: function activeIndex(next) {
      this.$emit('change', next);
    },
  },

  created: function created() {
    this.id = this.$attrs.id || ("vts-" + (randomString(4)));
  },

  methods: {
    onKeydown: function onKeydown(event) {
      var keyCode = event.keyCode;
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
    },

    // When a tabList's aria-orientation is set to vertical, only up and down arrow should function. In all other cases only left and right arrow function.
    determineOrientation: function determineOrientation(event) {
      var keyCode = event.keyCode;
      var proceed = false;
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
    switchTabOnArrowPress: function switchTabOnArrowPress(event) {
      var keyCode = event.keyCode;
      var directions = {};
      directions[keycodes.LEFT] = -1;
      directions[keycodes.UP] = -1;
      directions[keycodes.RIGHT] = 1;
      directions[keycodes.DOWN] = 1;

      /* istanbul ignore next */
      if (!directions[keyCode]) { return; }

      var activeIndex = this.activeIndex;
      var tabLength = this.tabList.length;
      var nextIndex = activeIndex + directions[keyCode];

      if (nextIndex < 0) {
        this.activeIndex = tabLength - 1;
      } else if (nextIndex >= tabLength) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = nextIndex;
      }
    },

    setFocus: function setFocus() {
      var ref = this;
      var $refs = ref.$refs;
      var tabList = ref.tabList;
      var activeIndex = ref.activeIndex;
      var activeTab = tabList[activeIndex];

      if (isVue3) {
        return $refs[activeTab].focus();
      }
      $refs[activeTab][0].focus();
    },
  },
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-tabs', _vm.classes.root]},[_c('div',{class:['vts-tabs__tablist', _vm.classes.tablist],attrs:{"role":"tablist","aria-label":_vm.label,"aria-orientation":_vm.orientation}},_vm._l((_vm.tabList),function(tab,index){
var _obj;
return _c('button',{key:tab,ref:tab,refInFor:true,class:[
        ("vts-tabs__tab vts-tabs__tab--" + tab + " vts-tabs__tab--" + index),
        ( _obj = {
          'vts-tabs__tab--active': index === _vm.activeIndex
        }, _obj[_vm.classes.tabActive] = index === _vm.activeIndex, _obj ),
        _vm.classes.tab ],attrs:{"id":(_vm.id + "-" + tab),"aria-selected":index === _vm.activeIndex,"tabindex":index === _vm.activeIndex ? false : -1,"aria-controls":(_vm.id + "-" + (tab.replace('tab', 'panel'))),"role":"tab","type":"button"},on:{"keydown":_vm.onKeydown,"click":function($event){_vm.activeIndex = index;}}},[_vm._t(tab)],2)}),0),_vm._v(" "),_vm._l((_vm.panelList),function(tab,index){
      var _obj;
return _c('div',{key:tab,class:[
      ("vts-tabs__panel vts-tabs__panel--" + index),
      ( _obj = {
        'vts-tabs__panel--active': index === _vm.activeIndex
      }, _obj[_vm.classes.panelActive] = index === _vm.activeIndex, _obj ),
      _vm.classes.panel ],attrs:{"id":(_vm.id + "-panel-" + index),"aria-labelledby":(_vm.id + "-tab-" + index),"hidden":index !== _vm.activeIndex,"tabindex":"0","role":"tabpanel"}},[_vm._t(tab)],2)})],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
var script$2 = {
  name: 'VToggle',
  model: {
    prop: 'open',
    event: 'update',
  },

  props: {
    open: Boolean,

    label: {
      type: String,
      default: '',
    },

    disabled: Boolean,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      isOpen: this.open,
    };
  },

  computed: {
    listeners: function listeners() {
      if (isVue3) {
        return this.$attrs;
      }
      return this.$listeners;
    },
  },

  watch: {
    open: function open(next) {
      this.isOpen = next;
    },
    isOpen: function isOpen(isOpen$1) {
      if (typeof window === 'undefined') { return; }
      this.$emit('update', isOpen$1);
      this.$emit(isOpen$1 ? 'open' : 'close');
    },
  },

  created: function created() {
    var ref = this.$attrs;
    var id = ref.id;
    this.id = id ? id : ("vts-" + (randomString(4)));
  },

  methods: {
    /** @param {HTMLElement} el */
    collapse: function collapse(el) {
      el.style.blockSize = '0';
    },

    /** @param {HTMLElement} el */
    expand: function expand(el) {
      el.style.overflow = 'hidden';
      el.style.blockSize = (el.scrollHeight) + "px";
      // Force repaint to make sure the animation is triggered correctly.
      el.scrollHeight;
    },

    /** @param {HTMLElement} el */
    resetHeight: function resetHeight(el) {
      el.style.overflow = 'visible';
      el.style.blockSize = '';
    },
  },
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-toggle', { 'vts-toggle--open': _vm.isOpen }, _vm.classes.root]},[_c('button',_vm._g({ref:"label",class:['vts-toggle__label', _vm.classes.label],attrs:{"id":(_vm.id + "-label"),"type":"button","disabled":_vm.disabled,"aria-controls":(_vm.id + "-content"),"aria-expanded":String(_vm.isOpen)},on:{"click":function($event){_vm.isOpen = !_vm.isOpen;}}},_vm.listeners),[_vm._v("\n    "+_vm._s(_vm.label)+"\n\n    "),_vm._t("label",null,null,{ isOpen: _vm.isOpen })],2),_vm._v(" "),_c('transition',{on:{"before-enter":_vm.collapse,"enter":_vm.expand,"after-enter":_vm.resetHeight,"before-leave":_vm.expand,"leave":_vm.collapse}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen && !_vm.disabled),expression:"isOpen && !disabled"}],class:['vts-toggle__content', _vm.classes.content],attrs:{"id":(_vm.id + "-content"),"aria-labelledby":(_vm.id + "-label"),"aria-hidden":!_vm.isOpen,"role":"region"}},[_vm._t("default",null,null,{ isOpen: _vm.isOpen })],2)])],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-69ec4312_0", { source: ".vts-toggle__content{transition:.3s ease block-size}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'VTooltip',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    id: {
      type: String,
      default: function () { return ("vts-" + (randomString(4))); },
    },
    focus: Boolean,
    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    show: false,
  }); },

  methods: {
    onMouseenter: function onMouseenter() {
      if (this.focus) { return; }
      this.show = true;
    },
    onMouseleave: function onMouseleave() {
      if (this.focus) { return; }
      this.show = false;
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",class:['vts-tooltip', _vm.classes.toggle],attrs:{"id":_vm.id,"tabindex":"0","aria-describedby":(_vm.id + "__content")},on:{"focus":function($event){_vm.show = true;},"blur":function($event){_vm.show = false;},"mouseenter":_vm.onMouseenter,"mouseleave":_vm.onMouseleave}},[_vm._t("default"),_vm._v(" "),_c('span',{class:[
      'vts-tooltip__content',
      {
        'vts-tooltip__content--visible': _vm.show,
      },
      _vm.classes.content ],attrs:{"id":(_vm.id + "__content"),"role":"tooltip","aria-hidden":!_vm.show + ''}},[_vm._t("tooltip")],2)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-723e7e4e_0", { source: ".vts-tooltip{position:relative}.vts-tooltip__content{position:absolute;inset-block-start:0;inset-inline-start:50%;transform:translate(-50%,-100%)}.vts-tooltip__content[aria-hidden=true]{display:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

var script = {
  name: 'VTry',

  props: {
    stopPropagation: Boolean,
  },

  data: function () { return ({
    error: null,
    // vm: null,
    // info: null,
  }); },

  errorCaptured: function errorCaptured(error /* vm, info */) {
    this.error = error;
    // this.vm = vm
    // this.info = info

    this.$emit('catch', error);

    return !this.stopPropagation;
  },

  render: function render() {
    var ref = this;
    var error = ref.error;
    var $slots = ref.$slots;
    var slots = $slots;

    if (!isVue3) {
      slots = this.$scopedSlots;
    }
    if (error && slots.catch) {
      return slots.catch(error);
    }

    return slots.default(error);
  },
};

/* script */
var __vue_script__ = script;

/* template */

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var allComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VAction: __vue_component__$k,
  VAlert: __vue_component__$j,
  VAsync: __vue_component__$i,
  VBtn: __vue_component__$h,
  VDate: __vue_component__$g,
  VDialog: __vue_component__$f,
  VDrawer: __vue_component__$e,
  VDropdown: __vue_component__$d,
  VFile: __vue_component__$c,
  VForm: __vue_component__$b,
  VImg: __vue_component__$a,
  VInput: __vue_component__$9,
  VIntersect: __vue_component__$8,
  VModal: __vue_component__$7,
  VResize: __vue_component__$6,
  VSkip: __vue_component__$5,
  VTable: __vue_component__$4,
  VTabs: __vue_component__$3,
  VToggle: __vue_component__$2,
  VTooltip: __vue_component__$1,
  VTry: __vue_component__
});

/**
 * Uppercase the first character of a string.
 *
 * @param  {string} str String to uppercase the first letter of
 * @returns {string}     Original string with the first letter in uppercase
 */
var capitalize = function (str) { return str[0].toUpperCase() + str.slice(1); };

/**
 * Formats a number as currency using the user's locale. 1234.56 => '$1,234.56'
 *
 * @param  {number} num      The number to be formatted
 * @param  {string} currency The type of currency, such as 'USD' or 'JPY'
 * @param  {string} locale   The locale for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @returns {string}          The number as a string formatted in the locale of the user
 */
function currency(num, currency, locale) {
  if ( locale === void 0 ) locale = navigator.language;

  // Alternative: (73.57).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(num);
}

/**
 * Formats a number to a culture code locale. 1234 => '1,234'
 *
 * @param  {number} num    The number to be formatted
 * @param  {string} locale Culture-code for formatting the number, such as 'en-US'. Defaults to navigator.language
 * @returns {string}        A formmated number based on a culture code
 */
function number(num, locale) {
  if ( locale === void 0 ) locale = navigator.language;

  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Takes in a value and a fallback. Return fallback if value is falsy.
 *
 * @param  {string} str         Desired text to display
 * @param  {string} placeholder Fallback text
 * @returns {string}             Shows desired text unless falsy, then shows fallback
 */
var placeholder = function (str, placeholder) { return str || placeholder; };

/**
 * Returns the plural or singular form of a word based on a amount
 *
 * @param  {string} singular The singular form of a noun, like "entity"
 * @param  {string} plural   The plural form of a noun, like "entities"
 * @param  {number} amount   The amount of the item the noun represents
 * @returns {string}          The correct plurality
 */
function plural(singular, plural, amount) {
  return amount !== 1 ? plural : singular;
}

/**
 * Replaces all characters of a string that surpass a length with a new string.
 *
 * @param  {string} str    String of text to be truncated
 * @param  {number} length Amount of characters to allow before truncating. Defaults to 100
 * @param  {string} append Text to append to the end of a truncated string. Defaults to '...'
 * @returns {string}        The original string, or a truncated version if it exceed the allowed limit.
 */
function truncate(str, length, append) {
  if ( length === void 0 ) length = 100;
  if ( append === void 0 ) append = '...';

  // TODO: dont split last word
  if (str.length > length) {
    return str.substring(0, length - append.length) + append;
  } else {
    return str;
  }
}

/**
 * TODO:
 * (https://www.npmjs.com/package/vue2-filters)
 * truncate
 * scientific notation
 * filterBy
 * find
 * sortBy
 * mask?
 */

var allFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  capitalize: capitalize,
  currency: currency,
  number: number,
  placeholder: placeholder,
  plural: plural,
  truncate: truncate
});

/**
 * @param {Promise | (() => Promise)} [promise]
 * @param {object} [options = {}]
 * @param {any} [options.placeholder] The initial results value
 * @param {any} [options.default] The default value if the resolved value is `undefined`
 * @param {Function} [options.onChange]
 * @param {Function} [options.onPending]
 * @param {Function} [options.onResolve]
 * @param {Function} [options.onReject]
 * @returns { typeof state & { watch: typeof watch} }
 */
function usePromise(promise, options) {
  if ( options === void 0 ) options = {};

  var state = reactive({
    pending: false,
    results: options.placeholder || null,
    error: null,
  });

  /**
   * @param {Promise | (() => Promise)} promise
   * @returns {Promise<void>}
   */
  var watch = async function watch(promise) {
    promise = typeof promise === 'function' ? promise() : promise;
    if (!promise || !promise.then) { return; }

    state.pending = true;
    options.onChange &&
      options.onChange({
        pending: state.pending,
        results: state.results,
        error: state.error,
      });
    options.onPending && options.onPending(state.pending);

    try {
      var resolved = await promise;

      if (resolved !== undefined) {
        state.results = resolved;
      } else if (options.default !== undefined) {
        state.results = options.default;
      } else {
        state.results = null;
      }

      options.onResolve && options.onResolve(state.results);
    } catch (error) {
      if (error instanceof Error) {
        state.error = {
          name: error.name,
          message: error.message,
        };
      } else {
        state.error = error;
      }
      console.error(error);
      options.onReject && options.onReject(state.error);
    } finally {
      state.pending = false;
      options.onChange &&
        options.onChange({
          pending: state.pending,
          results: state.results,
          error: state.error,
        });
      options.onPending && options.onPending(state.pending);
    }
  };

  if (promise) {
    watch(promise);
  }

  return Object.assign(state, { watch: watch });
}

/**
 * @typedef {import('vue-demi').Ref<HTMLFormElement>} FormRef
 * @typedef {import('vue-demi').ComputedRef} ComputedRef
 * @typedef {string | ((string) => string)} ErrorMessage
 * @typedef {{
 * value: string
 * valid: boolean
 * dirty: boolean
 * invalid: {
 *    type: boolean
 *    required: boolean
 *    minlength: boolean
 *    maxlength: boolean
 *    min: boolean
 *    max: boolean
 *    pattern: boolean
 * }
 * errors: any[]
 * }} FormInputState
 */

/**
 * @param {FormRef} formRef
 * @param {{
 * errors?:  {
 *   type?: ErrorMessage
 *   required?: ErrorMessage
 *   minlength?: ErrorMessage
 *   maxlength?: ErrorMessage
 *   min?: ErrorMessage
 *   max?: ErrorMessage
 *   pattern?: ErrorMessage
 * }
 * }} options
 */
var useForm = function (formRef, options) {
  if ( options === void 0 ) options = {};

  var baseState = {
    invalid: false,
    dirty: false,
    /** @type {boolean | ComputedRef} */
    error: false,
    /** @type {Record<string, FormInputState>} */
    inputs: {},
  };

  /**
   * @typedef {object} FormMethods
   * @property {Function} clear Assigns all form input values to empty strings
   * @property {Function} validate
   * @property {Function} reset Resets form dirty state and calls validate()
   */

  /**
   * @type {typeof baseState & Partial<FormMethods>}
   */
  var state = reactive(baseState);

  var errors = new Map(Object.entries(options.errors || {}));

  var validate = async function (form) {
    if (!form) { return; }

    await nextTick();

    state.invalid = !form.checkValidity();

    /** @type {HTMLInputElement[]} */
    var els = form.querySelectorAll('input, textarea, select');
    /** @type {typeof baseState.inputs} */
    var inputs = {};

    els.forEach(function (input) {
      var name = input.name;
      var id = input.id;
      var validity = input.validity;
      var inputId = name || id;

      if (!inputId) { return; }

      var inputStatus = {
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
          pattern: validity.patternMismatch,
        },
        errors: [],
      };

      errors.forEach(function (value, key) {
        if (!inputStatus.invalid[key]) { return; }

        var errorHandler = errors.get(key);
        var attrName = key.replace('length', 'Length'); // for minLength and maxLength

        var errorMessage =
          typeof errorHandler === 'string'
            ? errorHandler
            : errorHandler(input[attrName]);

        inputStatus.errors.push(errorMessage);
      });

      // Weird reactivity issue means we have to handle dirty state this way
      inputStatus.dirty = state.inputs[inputId]
        ? state.inputs[inputId].dirty
        : false;

      inputs[inputId] = inputStatus;
    });
    state.inputs = inputs;
  };

  var onInput = function () { return validate(formRef.value); };
  var onBlur = function (event) {
    validate(formRef.value);
    var input = event.target;
    var inputId = input.name || input.id;

    state.dirty = true;

    if (!inputId) { return; }
    if (!state.inputs[inputId]) { return; }

    state.inputs[inputId].dirty = true;
  };
  var observer = new MutationObserver(onInput);

  watch(formRef, async function (form, prev, onInvalidate) {
    if (!form) { return; }
    await nextTick();

    validate(form);

    form.addEventListener('input', onInput);
    form.addEventListener('blur', onBlur, {
      capture: true,
    });

    observer.observe(form, {
      childList: true,
      subtree: true,
      // attributes: true, // TODO: hy does this cause infinite loop?
    });

    onInvalidate(function () {
      form.removeEventListener('input', onInput);
      form.removeEventListener('blur', onBlur);
      observer.disconnect();
    });
  });

  state.error = computed(function () { return state.invalid && state.dirty; });
  state.validate = function () { return validate(formRef.value); };
  state.reset = function () {
    state.dirty = false;
    validate(formRef.value);
  };
  state.clear = function () {
    var form = formRef.value;
    /** @type {NodeListOf<HTMLInputElement>} */
    var inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function (input) {
      input.value = '';
    });
  };

  return state;
};

/* eslint-disable import/namespace */

var components = allComponents;
var directives = allDirectives;
var filters = allFilters;

/**
 * TODO:
 * Provide config options for library/components
 * Finish up rebuilding table
 * Get rid of auto safe slot (breaking)
 * Create main.css file
 * Prop warning messages (img alt, input label)
 */

/**
 * @typedef {{
 * components?: Partial<Record<keyof allComponents, Record<string, any> | boolean>>,
 * directives?: Record<keyof allDirectives, Record<string, any> | boolean>,
 * filters?: Record<keyof allFilters, Record<string, any> | boolean>
 * }} VuetensilsConfig
 */

/** @type {import('vue').PluginObject} */
var entry = {
  /**
   * @param {*} Vue Vue instance
   * @param {VuetensilsConfig} [pluginConfig] Vuetensils configuration
   */
  install: function install(Vue, pluginConfig) {
    if ( pluginConfig === void 0 ) pluginConfig = {};

    if (pluginConfig.components) {
      if (Array.isArray(pluginConfig.components)) {
        pluginConfig.components = pluginConfig.components.reduce(
          function (config, key) {
            config[key] = true;
            return config;
          },
          {}
        );
      }
      Object.entries(pluginConfig.components).forEach(function (entry) {
        var key = entry[0];
        var options = entry[1];
        var component = allComponents[key];
        // @ts-ignore
        var name = typeof options === 'boolean' ? options.name || key : key;
        Vue.component(name, component);
      });
    }

    if (pluginConfig.directives) {
      if (Array.isArray(pluginConfig.directives)) {
        pluginConfig.directives = pluginConfig.directives.reduce(
          function (config, key) {
            config[key] = true;
            return config;
          },
          {}
        );
      }
      Object.entries(pluginConfig.directives).forEach(function (entry) {
        var key = entry[0];
        var directive = allDirectives[key];
        Vue.directive(key, directive);
      });
    }

    if (pluginConfig.filters) {
      if (Array.isArray(pluginConfig.filters)) {
        pluginConfig.filters = pluginConfig.filters.reduce(function (config, key) {
          config[key] = true;
          return config;
        }, {});
      }
      Object.entries(pluginConfig.filters).forEach(function (entry) {
        var key = entry[0];
        var filter = allFilters[key];
        Vue.filter(key, filter);
      });
    }
  },
};

export { __vue_component__$k as VAction, __vue_component__$j as VAlert, __vue_component__$i as VAsync, __vue_component__$h as VBtn, __vue_component__$g as VDate, __vue_component__$f as VDialog, __vue_component__$e as VDrawer, __vue_component__$d as VDropdown, __vue_component__$c as VFile, __vue_component__$b as VForm, __vue_component__$a as VImg, __vue_component__$9 as VInput, __vue_component__$8 as VIntersect, __vue_component__$7 as VModal, __vue_component__$6 as VResize, __vue_component__$5 as VSkip, __vue_component__$4 as VTable, __vue_component__$3 as VTabs, __vue_component__$2 as VToggle, __vue_component__$1 as VTooltip, __vue_component__ as VTry, autofocus, capitalize, clickout, components, copy, currency, entry as default, directives, filters, intersect, number, placeholder, plural, truncate, usePromise as useAsync, useForm };
