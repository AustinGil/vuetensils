# focusout

Vue directive to fire a function when focus exits from an element.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/directives/focusout.js)

## Usage

Open your console to see the results

```vue live
<template>
  <div>
    <button>Focusing me from the div does something</button>
    <div v-focusout="onFocusout" class="focusout-example">
      <button>Focusing me does nothing</button>
      <button>Focusing me does nothing</button>
    </div>
    <button>Focusing me from the div does something</button>
  </div>
</template>

<script>
export default {
  methods: {
    onFocusout() {
      console.log("Concentrate, you're losing focus!!!");
    },
  },
};
</script>

<style>
.focusout-example {
  border: 1px solid;
}
</style>
```
