---
title: 'Tooltip'
category: 'Components'
---

**WIP: Still need to add transitions, but feel free to copy from source.**

A component that let's you add a tooltip to an element.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTooltip/VTooltip.vue)

Features:
- Supports keyboard navigation for the target DOM node.
- Toggles the tooltip on hover and/or focus.
- Includes `role="tooltip"` attribute for tooltip content.
- Manages `aria-hidden` and `aria-describedby` attributes.

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VTooltip } from 'vuetensils/src/components';

Vue.component('VTooltip', VTooltip);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VTooltip } from 'vuetensils/src/components';

export default {
  components: {
    VTooltip,
  },
  // ...
};
</script>
```

## Default Example

Try tabbing through these elements.

```vue live
<template>
  <div>
    <VTooltip>
      <template #tooltip>
        heyo :)
      </template>

      I have a tooltip!
    </VTooltip>
  </div>
</template>
```

## Tabbing Example

Try tabbing through these elements.

```vue live
<template>
  <div>
    <button>before</button>

    <VTooltip>
      <template #tooltip>
        heyo :)
      </template>

      I have a tooltip!
    </VTooltip>

    <button>after</button>
  </div>
</template>
```

## Custom root tag

```vue live
<template>
  <VTooltip tag="div">
    <template #tooltip>
      heyo :)
    </template>

    <h1>I have a tooltip!</h1>
  </VTooltip>
</template>
```

## Only on focus

Hovering over the target will not do anything, but you can click on it or tab to it to enable the focus state.

```vue live
<template>
  <VTooltip focus>
    <template #tooltip>
      heyo :)
    </template>

    I have a tooltip!
  </VTooltip>
</template>
```


## Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
