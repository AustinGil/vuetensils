module.exports = {
  "extends": "stylelint-config-sass-guidelines",
  "rules": {
    "comment-whitespace-inside": "always",
    "declaration-no-important": true,
    "font-family-name-quotes": "always-unless-keyword",
    "function-parentheses-space-inside": "never-single-line",
    "max-nesting-depth": 3,
    "media-feature-range-operator-space-before": "always",
    "media-feature-range-operator-space-after": "always",
    "media-feature-parentheses-space-inside": "never",
    "media-feature-colon-space-before": "never",
    "media-feature-colon-space-after": "always",
    "no-duplicate-selectors": true,
    "order/order": [
      "dollar-variables",
      {
        "type": "at-rule",
        "name": "extend"
      },
      "custom-properties",
      "declarations",
      "at-rules",
      "rules"
    ],
    "order/properties-order": [
      "content",
      "display",

      "align-items",
      "align-content",
      "align-self",
      "justify-items",
      "justify-content",
      "justify-self",

      "position",
      "z-index",
      "top",
      "right",
      "bottom",
      "left",

      "float",
      "clear",

      "visibility",
      "opacity",

      "transform",
      "overflow",
      "clip",
      "box-sizing",

      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "outline",
      "border",
      "border-radius",
      "padding",

      "font-size",
      "line-height",
      "font-family",
      "font-weight",
      "font-style",
      "text-align",
      "text-transform",
      "word-spacing",

      "color",
      "background",
      "box-shadow",
      "cursor",

      "animation",
      "transition"
    ],
    "order/properties-alphabetical-order": null,
    "scss/at-extend-no-missing-placeholder": null,
    "scss/dollar-variable-pattern": "[a-zA-Z-]+",
    "selector-attribute-brackets-space-inside": "never",
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-operator-space-before": "never",
    "selector-attribute-quotes": "always",
    "selector-class-pattern": "[a-z-_]+",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-no-qualifying-type": [
      true,
      {
        "ignore": ["attribute", "class"]
      }
    ],
    "selector-pseudo-element-colon-notation": "single",
    "string-quotes": "double"
  }
}
