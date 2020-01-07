# Scroll Directive

## Installation
```js
// main.js
import Vue from 'vue'
import { scroll } from 'vuetensils'

Vue.directive("scroll", scroll)
```
---
## Example

```vue
<template>
    <div class="some-div-down-below" v-scroll="seen">
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
    <div class="some-div-down-below" v-scroll="{threshold: 0.3, handler: seen}">
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
### all available properties
- handler: The callback function to be invoked

- threshold: A number between 0 and 1. for example if it is 0.5 the function will be invoked when half of the element is visible in the root element.

- root: The scrollable element query selector like "#some-id". must be an ancestor of the element with which you use this directive

- margin: the margen given to the root element. same as css margin.