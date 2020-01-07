# Scroll Directive

## Installation
```js
// main.js
import Vue from 'vue'
import { intersect } from 'vuetensils'

Vue.directive("intersect", intersect)
```
---
## Example

```vue
<template>
    <div class="some-div-down-below" v-intersect="seen">
        <img src="someUrl" :class="img_class"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img_class: "hidden"
        }
    },
    methods: {
        seen() {
            this.img_class = "shown";
        }
    }
}
</script>
```
---

## More specific example
### You could also specify a threshold after which you want to invoke the callback function
### You do this by passing an object
```vue
<template>
    <div class="some-div-down-below" v-intersect="{threshold: 0.3, onEnter: seen, onExit: hidden}">
        <img src="someUrl" :class="img_class"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img_class: "hidden"
        }
    },
    methods: {
        seen() {
            this.img_class = "shown";
        },
        hidden() {
            this.img_class = "hidden"
        }
    }
}
</script>
```
## Using modifiers
```vue
<template>
    <div class="some-div-down-below" v-show="seen" v-intersect.change="toggle">
        <img src="someUrl" class="img_class"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            seen: false
        }
    },
    methods: {
        toggle() {
            this.seen = !this.seen;
        }
    }
}
</script>
```

### Available properties
- onEnter: The callback to be invoked if element is intersecting with viewport.
- onExit: The callback to be invoked if element is not intersecting with viewport.
- onChange: The callback to be invoked if intersection state changes.

- threshold: A number between 0 and 1. for example if it is 0.5 the function will be invoked when half of the element is visible in the root element.

- root: The scrollable element query selector like "#some-id". must be an ancestor of the element with which you use this directive

- rootMargin: the margen given to the root element. same as css margin.

### Available modifiers
- enter: will take the passed function and assign it to onEnter (Default).
- exit: will take the passed function and assign it to onExit.
- change: will take the passed function and assign it to onChange.