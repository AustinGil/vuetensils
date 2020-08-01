# intersect

A Vue directive which adds an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to the element it's placed on. The observer watches for the element to enter and/or exit the parent (defaults to window), and fires a callback function on that event. The callback function is provided the [IntersectionObsesrverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) and the element's [DOM node](https://developer.mozilla.org/en-US/docs/Web/API/Node) so you can view the status of the element and make changes as needed.

The directive also supports modifiers to fire only when the element enters, only when the element exits, or to only fire the handler once.

Check your JavaScript console and scroll around to see what's going on.

- [Source](https://github.com/Stegosource/vuetensils/blob/master/src/directives/intersect.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { intersect } from 'vuetensils/src/directives';

Vue.directive('intersect', intersect);
```

Local install:

```html
<script>
  import { intersect } from 'vuetensils/src/directives';

  export default {
    directives: {
      intersect,
    },
  };
</script>
```

For IE 11 support, you may want to add the following polyfill:

`<script src='https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver'></script>`

**Note: This site adds styles for the .intersect-example class**

## Default Behavior

The default handler fires whenever the element enter or exits the context.

```vue live
<template>
  <div>
    <div v-intersect="$log" class="intersect-example" />
    <div
      v-intersect="() => $log('something happened')"
      class="intersect-example"
    />
  </div>
</template>
```

## .enter modifier

Only fires when the element enters the context.

```vue live
<template>
  <div>
    <div
      v-intersect.enter="() => $log('I have arrived!')"
      class="intersect-example"
    />
  </div>
</template>
```

## .exit modifier

Only fires when the element exits the context.

```vue live
<template>
  <div>
    <div
      v-intersect.exit="() => $log('Peace out!')"
      class="intersect-example"
    />
  </div>
</template>
```

## .once modifier

Only fires when the handler once. Can be chained to `.enter` or `.exit`.

```vue live
<template>
  <div>
    <div
      v-intersect.once="() => $log('You will not see me again')"
      class="intersect-example"
    />
  </div>
</template>
```

## Multiple Handlers

You can attach a handler for the `onEnter`, `onExit`, and `onChange` events.

```vue live
<template>
  <div>
    <div
      v-intersect="{ onEnter, onExit, onChange }"
      class="intersect-example"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onEnter(entry, el) {
      console.log('I am here!');
    },
    onExit(entry, el) {
      console.log('I am gone!');
    },
    onChange(entry, el) {
      console.log('Let me check... I am ' + entry.isIntersecting ? 'here' : 'gone');
    },
  },
};
</script>
```

## IntersectionObserver Options

You could also specify the options for the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) in the object you pass in. These include `root`, `rootMargin`, and `threshold`.

For example, if I wanted the entire element to be visible before considering it in, I could do:

```vue live
<template>
  <div v-intersect="{ threshold: 1, onChange }" class="intersect-example" :style="{backgroundColor: isVisible ? 'palegreen' : 'lightpink'}">
    Entirely visible: {{ isVisible }}
  </div>
</template>
<script>
export default {
  data: () => ({
    isVisible: false,
  }),

  methods: {
    onChange({ isIntersecting }) {
      this.isVisible = isIntersecting;
    },
  },
};
</script>
```

## Available properties

- **onChange:** The callback invoked when intersection state changes.
- **onEnter:** The callback invoked when element is intersecting with context.
- **onExit:** The callback invoked when element is not intersecting with context.
- **threshold:** A number between 0 and 1. For example, if it is 0.5 the function will be invoked when half of the element is visible in the root element.
- **root:** The scrollable element query selector like `'#some-id'`. Must be an ancestor of the element with on which you use this directive.
- **rootMargin:** The margin given to the root element. Same as CSS margin.

## Available modifiers

- **change:** Will take the passed function and assign it to `onChange` (default).
- **enter:** Will take the passed function and assign it to `onEnter`.
- **exit:** Will take the passed function and assign it to `onExit`.
