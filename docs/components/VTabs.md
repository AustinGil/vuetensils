# VTabs

Show and hide content based on which tabs are selected.

Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.

Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.

## Styled Example

```vue live
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
```

```css
.vts-tabs {
  overflow: hidden;
  border: 1px solid #ccc;
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
  border-bottom-color: #fff;
  background: #fff;
}

.vts-tabs [role="tabpanel"] {
  padding: 1rem;
}
```

## Basic Usage

```vue live
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
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', tablist: 'tablist-class', tab: 'tab-class' }"
```
