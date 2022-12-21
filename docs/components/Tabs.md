# Tabs

Show and hide content based on which tabs are selected.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTabs/VTabs.vue)

Features:

- Manages ARIA roles for `tablist`, `tab`, and `tabpanel`.
- Manages ARIA attributes for `aria-label`, `aria-selected`, `aria-controls`, `aria-labelledby`.
- Provides keyboard navigation to focus on tabs and navigate between with arrow keys.

Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.

## Styled Example

```vue live
<template>
  <VTabs class="styled">
    <template #tab-1>Tab 1</template>
    <template #panel-1>
      Here's the content for tabpanel 1.
    </template>

    <template #tab-2>Tab 2</template>
    <template #panel-2>
      Here's the content for tabpanel 2.
    </template>

    <template #tab-3>Tab 3</template>
    <template #panel-3>
      Here's the content for tabpanel 3.
    </template>
  </VTabs>
</template>
```

```css
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
  color: #000;
  background: #FFF;
}

.vts-tabs [role="tabpanel"] {
  padding: 1rem;
}
```

## Basic Usage

Tabs and panels use slot names with this syntax: `tab-{name}`, `panel-{name}`. The names can be dynamic, but must be prefixed with `tab-` and `panel-`. Order is determined by source order.

```vue live
<template>
  <VTabs>
    <template #tab-1>Tab 1</template>
    <template #panel-1>
      This is my content for tab 1
    </template>

    <template #tab-second>Second Tab</template>
    <template #panel-second>
      Here's the content for tab 2.
      <p>It supports markup, and any any other components.</p>
    </template>
  </VTabs>
</template>
```

## Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ 
  root: 'root-class', 
  tablist: 'tablist-class', 
  tab: 'tab-class'
  tabActive: 'tabActive-class'
  panel: 'panel-class'
  panelActive: 'panelActive-class'
}"
```
