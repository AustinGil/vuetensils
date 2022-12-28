# Toggle

Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VToggle/VToggle.vue)

## Styled Example

```vue live
<template>
  <VToggle label="Click here to open the toggle" class="styled">
    <div class="toggle-content">
      <p>Here is the content. Sweet!</p>
    </div>
  </VToggle>
</template>

<style>
.vts-toggle__button {
  display: block;
  width: 100%;
  border: 0;
  padding: 5px;
  font-size: 18px;
  text-align: left;
  color: #FFF;
  background-color: mediumseagreen;
}
.toggle-content {
  border: 1px solid #CCC;
  padding: 5px;
}
</style>
```

## Basic Usage

```vue live
<template>
  <VToggle label="Toggle label">
    content here
  </VToggle>
</template>
```

## Label Slot

Sometimes just a text string won't do. For example, you may want to add icons or something.

```vue live
<template>
  <VToggle>
    <template #label>
      <span aria-hidden>🔽</span>
      Title
    </template>

    content here
  </VToggle>
</template>
```

## Scoped Slots

You can access the `open` status through the scoped slots.

```vue live
<template>
  <VToggle>
    <template #label="{ isOpen }">
      <span aria-hidden>{{ isOpen ? "🔼" : "🔽" }}</span>
      Title
    </template>

    <template #default="{isOpen}">
      isOpen: {{ isOpen }}
    </template>
  </VToggle>
</template>
```

## Events

- update: fires on any change and provides the `open` status
- open: fires on open.
- close: fires on close.

## Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: string, label: string, content: string }"
```
