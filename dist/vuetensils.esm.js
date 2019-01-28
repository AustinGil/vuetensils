var KEYCODES = {
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

var NAME = "vts-drawer";

/**
 * A sidebar that can be toggled on or off
 */
var script = {
  name: NAME,

  props: {
    showing: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String
    },
    bgTransition: {
      type: String
    }
  },
  model: {
    prop: "showing",
    event: "change"
  },

  methods: {
    show: function show() {
      this.$emit("open");
      this.$emit("change", true);
    },
    hide: function hide() {
      this.$emit("close");
      this.$emit("change", false);
    },
    toggle: function toggle() {
      var event = this.showing ? "close" : "open";
      this.$emit(event, !this.showing);
      this.$emit("change", !this.showing);
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide();
      }
      if (event.keyCode === KEYCODES.TAB) {
        var content = this.$refs.content;
        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (this.visible && content && !content.contains(document.activeElement) && focusable) {
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
    }
  },

  watch: {
    showing: {
      handler: function(next, prev) {
        var this$1 = this;

        if (next && next != prev) {
          this.preventScroll && document.body.style.setProperty("overflow", "hidden");
          this.$nextTick(function () {
            this$1.$refs.content.focus();
          });
        } else {
          this.preventScroll && document.body.style.removeProperty("overflow");
        }
      }
    }
  },

  render: function render(create) {
    var this$1 = this;

    if (!this.showing) {
      return create(false)
    }

    var content = create(
      "aside",
      {
        ref: "content",
        class: (NAME + "__content"),
        style: {
          width: this.width || null,
          maxWidth: this.maxWidth || null
        },
        attrs: {
          tabindex: "-1"
          // 'aria-label': "submenu"
        }
      },
      [this.$slots.default]
    );
    content = create(
      "transition",
      {
        props: { name: this.transition, appear: true }
      },
      [content]
    );

    var drawer = create(
      "div",
      {
        class: NAME,
        on: {
          click: function (event) {
            if (event.target.classList.contains(("" + NAME))) {
              this$1.hide();
            }
          },
          keydown: this.onKeydown
        }
      },
      [content]
    );
    drawer = create(
      "transition",
      {
        props: { name: this.bgTransition }
      },
      [drawer]
    );

    return drawer
  }
};

/* script */
            var __vue_script__ = script;
            
/* template */

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-f2509bcc_0", { source: ".vts-drawer{position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.2)}.vts-drawer [tabindex=\"-1\"]:focus{outline:0}.vts-drawer__content{overflow:auto;width:100%;max-width:300px;height:100%;background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Drawer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

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

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Drawer = __vue_normalize__(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

var NAME$1 = "vts-dropdown";

/**
 * Show/hide inline content
 */
var script$1 = {
  name: NAME$1,

  props: {
    text: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "bottom"
    },
    transition: {
      type: String
    }
  },

  data: function () { return ({
    isHovered: false,
    isFocused: false
  }); },

  methods: {
    onClickout: function onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    document.addEventListener("click", this.onClickout);
    this.$once("hook:beforeDestroy", function () {
      document.removeEventListener("click", this$1.onClickout);
    });
  },

  render: function render(create) {
    var this$1 = this;

    var button = create(
      "button",
      {
        attrs: {
          "aria-haspopup": true,
          "aria-expanded": this.isHovered || this.isFocused ? "true" : "false"
        },
        on: {
          click: function () {
            this$1.isFocused = !this$1.isFocused;
          }
        }
      },
      this.text
    );

    var content = create(false);
    if (this.isHovered || this.isFocused) {
      var contentClass = NAME$1 + "__content";
      if (!!this.position) {
        contentClass += " " + NAME$1 + "__content--" + (this.position);
      }

      content = create(
        "transition",
        {
          props: { name: this.transition, appear: true }
        },
        [create("div", { class: contentClass }, [this.$slots.default])]
      );
    }

    return create(
      "div",
      {
        class: NAME$1,
        on: {
          mouseover: function () {
            this$1.isHovered = true;
          },
          mouseleave: function () {
            this$1.isHovered = false;
          },
          focusout: function (event) {
            if (!this$1.$el.contains(event.relatedTarget)) {
              this$1.isFocused = false;
            }
          }
        }
      },
      [button, content]
    )
  }
};

/* script */
            var __vue_script__$1 = script$1;
            
/* template */

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-20fceb6c_0", { source: ".vts-dropdown{display:inline-block;position:relative}.vts-dropdown__content{position:absolute;z-index:5;min-width:100%;border:1px solid rgba(0,0,0,.2);background-color:#fff}.vts-dropdown__content--top{top:0;transform:translateY(-100%)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = undefined;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Dropdown.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

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

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Dropdown = __vue_normalize__$1(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1,
    undefined
  );

var NAME$2 = "vts-fetch";

/**
 * Makes JSON API requests and provides responses, loading states, and errors
 */
var script$2 = {
  name: NAME$2,

  props: {
    url: {
      type: String
    }
  },

  data: function () { return ({
    loading: false,
    response: null,
    error: null
  }); },

  mounted: function mounted() {
    this.fetch();
  },

  methods: {
    fetch: function fetch$1(url) {
      var this$1 = this;

      this.loading = true;
      this.response = null;
      this.error = null;
      fetch(url || this.url)
        .then(function (res) { return res.json(); })
        .then(function (response) {
          this$1.response = response;
          this$1.loading = false;
          this$1.$emit("success", response);
        })
        .catch(function (error) {
          this$1.error = error;
          this$1.loading = false;
          this$1.$emit("error", error);
        });
    }
  },

  render: function render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    var scopedSlot = this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
      error: this.error,
      fetch: this.fetch
    });
    if (scopedSlot.length) {
      console.warn("[ItemsList] Requires 1 root element. Using injected <div>.");
      return create("div", [scopedSlot])
    }
    return scopedSlot
  }
};

/* script */
            var __vue_script__$2 = script$2;
            
/* template */

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = undefined;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Fetch.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Fetch = __vue_normalize__$2(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var NAME$3 = "vts-img";

var script$3 = {
  name: NAME$3,
  inheritAttrs: false,
  // functional: true, // TODO

  props: {
    src: {
      type: String,
      required: true
    },
    srcset: String,
    sizes: String,
    width: [String, Number],
    height: [String, Number],
    placeholder: String,
    background: String,
    immediate: Boolean,
    alt: String
  },

  mounted: function mounted() {
    var this$1 = this;

    // this.$isServer
    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      var wrapper = entry.target;
      var img = entry.target.querySelector(".vts-img__img");
      var placeholder = entry.target.querySelector(".vts-img__placeholder");

      img.onload = function() {
        delete img.onload;
        wrapper.classList.remove((NAME$3 + "--loading"));
        wrapper.classList.add((NAME$3 + "--loaded"));
        setTimeout(function () {
          placeholder.remove();
        }, 300);
      };
      if (entry.isIntersecting) {
        // Element is in viewport
        wrapper.classList.add((NAME$3 + "--loading"));
        img.src = this$1.src;
        if (!!this$1.srcset) { img.srcset = this$1.srcset; }
        if (!!this$1.alt) { img.alt = this$1.alt; }
        observer.disconnect();
      }
    });

    observer.observe(this.$el);
    this.$once("hook:beforeDestroy", function () {
      observer.disconnect();
    });
  },

  render: function render(create, ctx) {
    // const randomStr = Math.random()
    //   .toString(36)
    //   .substr(2)
    // const id = `${NAME}-${randomStr}`
    // if (this.$parent.$isServer) {
    //   return create(false)
    // }

    var img = create("img", {
      class: (NAME$3 + "__img"),
      attrs: Object.assign({}, this.$attrs,
        {width: this.width || false,
        height: this.height || false})
    });

    var placeholder = create(false);
    // Only add the placeholder if we have something to show, and we have the dimensions
    if ((this.placeholder || this.background) && this.width && this.height) {
      placeholder = create("div", { class: (NAME$3 + "__placeholder") }, [
        create("img", {
          attrs: {
            src: this.placeholder,
            width: this.width,
            height: this.height
          },
          style: {
            background: this.background || false
          }
        })
      ]);
    }

    // TODO: Add this when SSR support is enabled
    // const noscript = create("noscript", [
    //   create("img", {
    //     attrs: {
    //       src: this.src || ''
    //     }
    //   })
    // ])
    return create(
      "div",
      {
        class: NAME$3
      },
      [placeholder, img]
    )
  }
};

/* script */
            var __vue_script__$3 = script$3;
            
/* template */

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-1b3c3a1b_0", { source: ".vts-img{position:relative}.vts-img img{vertical-align:top}.vts-img__img{opacity:0;transition:opacity .3s ease}.vts-img__placeholder{position:absolute;top:0;left:0;overflow:hidden;transition:opacity .3s ease}.vts-img__placeholder img{transform:scale(1.05);filter:blur(10px)}.vts-img--loaded .vts-img__placeholder{opacity:0}.vts-img--loaded .vts-img__img{opacity:1}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = undefined;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Img.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

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

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Img = __vue_normalize__$3(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__$2,
    undefined
  );

var NAME$4 = "vts-intersection";

/**
 * Adds [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to content and provides event callbacks
 */
var script$4 = {
  name: NAME$4,
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: function () { return [0, 0.2]; }
    },
    root: {
      type: String,
      required: false,
      default: function () { return null; }
    },
    rootMargin: {
      type: String,
      required: false,
      default: function () { return "0px 0px 0px 0px"; }
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.observer = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) {
          this$1.$emit("leave", [entries[0]]);
        } else {
          this$1.$emit("enter", [entries[0]]);
        }
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
  },
  render: function render(create) {
    // TODO: check variable content support
    return create(
      this.tag,
      {
        class: NAME$4
      },
      [this.$slots.default]
    )
  }
};

/* script */
            var __vue_script__$4 = script$4;
            
/* template */

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = undefined;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Intersection.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Intersection = __vue_normalize__$4(
    {},
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

var svgs = {
  bars: "<rect y=\"30\" height=\"40\" x=\"15\" width=\"10\">\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0.2;1\" keyTimes=\"0;0.5;1\" dur=\"1.5\" keySplines=\"0.5 0 0.5 1;0.5 0 0.5 1\" begin=\"-0.6s\"   repeatCount=\"indefinite\"></animate>\n\t</rect>\n\t<rect y=\"30\" height=\"40\" x=\"35\" width=\"10\">\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0.2;1\" keyTimes=\"0;0.5;1\" dur=\"1.5\" keySplines=\"0.5 0 0.5 1;0.5 0 0.5 1\" begin=\"-0.4s\"   repeatCount=\"indefinite\"></animate>\n\t</rect>\n\t<rect y=\"30\" height=\"40\" x=\"55\" width=\"10\">\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0.2;1\" keyTimes=\"0;0.5;1\" dur=\"1.5\" keySplines=\"0.5 0 0.5 1;0.5 0 0.5 1\" begin=\"-0.2s\"   repeatCount=\"indefinite\"></animate>\n\t</rect>\n\t<rect y=\"30\" height=\"40\" x=\"75\" width=\"10\">\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0.2;1\" keyTimes=\"0;0.5;1\" dur=\"1.5\" keySplines=\"0.5 0 0.5 1;0.5 0 0.5 1\" begin=\"0s\"   repeatCount=\"indefinite\"></animate>\n  </rect>",
  //   dots: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
  //   <circle transform="translate(8 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  //   <circle transform="translate(16 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  //   <circle transform="translate(24 0)" cx="0" cy="16" r="0">
  //     <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6"
  //       keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
  //   </circle>
  // </svg>`,
  ring: "<circle cx=\"50\" cy=\"50\" stroke-width=\"5\" r=\"45\" stroke-dasharray=\"164.93361431346415 56.97787143782138\">\n\t\t<animateTransform attributeName=\"transform\" type=\"rotate\" calcMode=\"linear\" values=\"0 50 50;360 50 50\" keyTimes=\"0;1\" dur=\"1.5\" begin=\"0s\" repeatCount=\"indefinite\"></animateTransform>\n\t</circle>",
  ripple: "<circle cx=\"50\" cy=\"50\" r=\"0\" stroke-width=\"2\">\n\t\t<animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"2\" keySplines=\"0 0.2 0.8 1\" begin=\"-1.05s\" repeatCount=\"indefinite\"></animate>\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"2\" keySplines=\"0.2 0 0.8 1\" begin=\"-1.05s\" repeatCount=\"indefinite\"></animate>\n\t</circle>\n\t<circle cx=\"50\" cy=\"50\" r=\"0\" stroke-width=\"2\">\n\t\t<animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"2\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n\t\t<animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"2\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\n\t</circle>",
  "dual-ring": "<circle cx=\"50\" cy=\"50\" stroke-linecap=\"round\" r=\"40\" stroke-width=\"4\" stroke-dasharray=\"62.83185307179586 62.83185307179586\" transform=\"rotate(45.5694 50 50)\">\n\t\t<animateTransform attributeName=\"transform\" type=\"rotate\" calcMode=\"linear\" values=\"0 50 50;360 50 50\" keyTimes=\"0;1\" dur=\"1.5\" begin=\"0s\" repeatCount=\"indefinite\"></animateTransform>\n  </circle>"
  //   spin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
  //   <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
  //   <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
  //     <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
  //   </path>
  // </svg>`
};

var NAME$5 = "vts-loading";

/**
 * SVG loading icons
 */
var script$5 = {
  name: NAME$5,
  /**
   * TODO
   * size: width / height
   * stroke: color / width / dasharray
   * animation: timing
   */
  props: {
    name: {
      type: String,
      default: "ring"
    },
    width: {
      type: String | Number
    },
    height: {
      type: String | Number
    },
    fill: {
      type: String,
      default: "none"
    },
    stroke: {
      type: String,
      default: "currentColor"
    }
  },
  render: function(create, context) {
    return create("svg", {
      class: NAME$5,
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 100 100",
        fill: this.fill,
        stroke: this.stroke,
        width: this.width,
        height: this.height
      },
      domProps: {
        innerHTML: svgs[this.name || "ring"]
      }
    })
  }
};

/* script */
            var __vue_script__$5 = script$5;
            
/* template */

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = undefined;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Loading.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Loading = __vue_normalize__$5(
    {},
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

var NAME$6 = "vts-modal";

/**
 * A modal dialogue that traps user focus
 */
var script$6 = {
  name: NAME$6,

  props: {
    showing: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: String,
      default: ""
    },
    preventScroll: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String
    },
    bgTransition: {
      type: String
    }
  },
  model: {
    prop: "showing",
    event: "change"
  },

  methods: {
    show: function show() {
      this.$emit("show");
      this.$emit("change", true);
    },
    hide: function hide() {
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle: function toggle() {
      var event = this.showing ? "hide" : "show";
      this.$emit(event, !this.showing);
      this.$emit("change", !this.showing);
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === KEYCODES.ESC) {
        this.hide();
      }
      if (event.keyCode === KEYCODES.TAB) {
        var content = this.$refs.content;
        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (this.showing && content && !content.contains(document.activeElement) && focusable) {
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
    }
  },

  watch: {
    showing: {
      handler: function(next, prev) {
        var this$1 = this;

        if (typeof window !== "undefined") {
          if (next && next != prev) {
            this.preventScroll && document.body.style.setProperty("overflow", "hidden");
            this.$nextTick(function () {
              this$1.$refs.content.focus();
            });
          } else {
            this.preventScroll && document.body.style.removeProperty("overflow");
          }
        }
      }
    }
  },

  render: function render(create) {
    var this$1 = this;

    if (!this.showing) {
      return create(false)
    }

    var content = create(
      "div",
      {
        ref: "content",
        class: (NAME$6 + "__content"),
        style: {
          width: this.width || null,
          maxWidth: this.maxWidth || null
        },
        attrs: {
          tabindex: "-1",
          role: "dialog"
        }
      },
      [this.$slots.default]
    );
    content = create(
      "transition",
      {
        props: { name: this.transition, appear: true }
      },
      [content]
    );

    var modal = create(
      "div",
      {
        class: ("" + NAME$6),
        on: {
          click: function (event) {
            if (event.target.classList.contains(("" + NAME$6)) && this$1.dismissible) {
              this$1.hide();
            }
          },
          keydown: this.onKeydown
        }
      },
      [content]
    );

    modal = create(
      "transition",
      {
        props: { name: this.bgTransition }
      },
      [modal]
    );

    return modal
  }
};

/* script */
            var __vue_script__$6 = script$6;
            
/* template */

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-f4cf9684_0", { source: ".vts-modal{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.2)}.vts-modal [tabindex=\"-1\"]:focus{outline:0}.vts-modal__content{overflow:auto;max-width:70vw;max-height:80vh;background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = undefined;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Modal.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

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

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Modal = __vue_normalize__$6(
    {},
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    __vue_create_injector__$3,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
  Drawer: Drawer,
  Dropdown: Dropdown,
  Fetch: Fetch,
  Img: Img,
  Intersection: Intersection,
  Modal: Modal,
  Loading: Loading
});

// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return }
  install.installed = true;
  Object.keys(components).forEach(function (key) {
    Vue.component(components[key].name, components[key]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { Drawer, Dropdown, Fetch, Img, Intersection, Modal, Loading };
