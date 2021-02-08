---
title: Cookbook
category: Cookbook
pageClass: cookbook
---

Just some simple copy/paste examples.

## Custom Radio & Checkbox CSS

```vue live
<template>
  <div>
    <VInput
      label="Favorite Ice Cream"
      name="ice-cream"
      type="radio"
      :options="iceCreams"
      :classes="{ input: 'visually-hidden' }"
    />

    <VInput
      label="Check me out!"
      name="check-me"
      type="checkbox"
      :classes="{ input: 'visually-hidden' }"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    iceCreams: [
      {
        label: 'Vanilla',
        value: 'vanilla' 
      },
      {
        label: 'Strawberry',
        value: 'strawberry' 
      },
      {
        label: 'Chocolate',
        value: 'chocolate' 
      },
    ],
  }),
};
</script>

<style>
fieldset,
legend {
  margin: 0;
  border: 0;
  padding: 0;
}
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap;
}
.vts-input__input[type="checkbox"],
.vts-input__input[type="radio"] {
  display: initial;
  width: unset;
}
.vts-input--checkbox .vts-input__text:before,
.vts-input--radio .vts-input__text:before {
  content: "";
  display: inline-block;
  width: 0.75em;
  height: 0.75em;
  border: 1px solid;
}
.vts-input--radio .vts-input__text:before {
  border-radius: 50%;
}
input:checked + .vts-input__text:before {
  background-color: darkcyan;
}
input:focus + .vts-input__text:before {
  outline-width: 1px;
  outline-style: auto;
  outline-color: Highlight;
  outline-color: -webkit-focus-ring-color;
}
</style>
```
