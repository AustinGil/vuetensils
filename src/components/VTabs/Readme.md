### Styled Example

```vue
<template>
  <VTabs class="styled">
    <template slot="Tab 1">
      Here's the content for tab 1.
    </template>

    <template slot="Tab 2">
      Here's the content for tab 2.
    </template>

    <template slot="Tab 3">
      Here's the content for tab 3.
    </template>
  </VTabs>
</template>

<script>
export default {};
</script>

<style>
.vts-tabs {
  overflow: hidden;
  border: 1px solid #CCC;
  border-radius: 0.25rem;
}

.vts-tabs [role="tablist"] {
  display: flex;
}

.vts-tabs [role="tab"] {
  flex-grow: 1;
  border: 0;
  padding: 0.5rem;
}

.vts-tabs [role="tab"][aria-selected="true"] {
  border-bottom-color: #FFF;
  background: #FFF;
}

.vts-tabs [role="tabpanel"] {
  padding: 1rem;
}
</style>
```

### Basic Usage

```vue
<template>
  <VTabs>
    <template slot="Tab 1 label">
      This is my content for tab 1
    </template>

    <template slot="Second tab">
      Here's the content for tab 2.
      <p>It supports markup, and any any other components.</p>
    </template>
  </VTabs>
</template>

<script>
export default {};
</script>
```

### Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: 'root-class', tablist: 'tablist-class', tab: 'tab-class' }"
```
