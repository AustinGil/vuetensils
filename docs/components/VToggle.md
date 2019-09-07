# VToggle

Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.

## Styled Example

```vue live
<template>
  <VToggle label="test" class="styled">
    <template v-slot:label>
      Click here to open the toggle
    </template>

    <div class="toggle-content">
      <p>Here is the content. Sweet!</p>
    </div>
  </VToggle>
</template>
```

```css
.vts-toggle__button {
  display: block;
  width: 100%;
  border: 0;
  padding: 5px;
  font-size: 18px;
  text-align: left;
  color: #fff;
  background-color: mediumseagreen;
}

.toggle-content {
  border: 1px solid #ccc;
  padding: 5px;
}
```

## Basic Usage

```vue live
<template>
  <VToggle label="test">
    <template v-slot:label>
      Title
    </template>

    content here
  </VToggle>
</template>
```
