# Dialog

A dialog component for showing users content which overlays the rest of the application. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VDialog/VDialog.vue)

Features:

- Manages `tabindex`, and `role` attributes for dialog accessibility.
- Manages `aria-haspopup` and `aria-expanded` attributes for toggle button accessibility.
- Maintains focus states to remain within the dialog for keyboard users.
- Adds event listener to close dialog on the `esc` key.
- Supports preventing page scroll while open.

## Styled Example

```vue live
<template>
  <VDialog
    v-model="dialog"
    bg-transition="fade"
    class="my-dialog"
    @change="log"
  >
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Show the dialog
      </button>
    </template>

    This is the dialog content.<br />
    It traps the user's focus.<br />
    <button
      aria-label="close"
      class="my-dialog__close"
      @click="dialog = false"
    >
      &times;
    </button>
  </VDialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    log: console.log
  }
};
</script>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.my-dialog .vts-dialog {
  background: rgba(0, 0, 0, 0.7);
}

.my-dialog .vts-dialog__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
  background: #FFF;
  transition: 0.3s ease transform;
}

.my-dialog .fade-enter .vts-dialog__content,
.my-dialog .fade-leave-active .vts-dialog__content {
  transform: translateY(20px);
}

.my-dialog__close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  padding: 5px;
  background: transparent;
}
```

## NOTE:

Dialog background colors have been removed. The following styles have been added to this site to make the dialogs easier to see:

```css
.bg-white {
  background-color: #FFF;
}

.bg-black-alpha .vts-modal {
  background: rgba(0, 0, 0, 0.2);
}
```

## Basic dialog

```vue live
<template>
  <VDialog class="test" :classes="{ bg: 'bg-black-alpha' }">
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Show the dialog
      </button>
    </template>

    <div class="bg-white">
      This is the dialog content.
    </div>
  </VDialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
```

## Using v-model

```vue live
<template>
  <div>
    <VDialog v-model="dialog" :classes="{ bg: 'bg-black-alpha' }">
      <div class="bg-white">
        This is the dialog content.
      </div>
    </VDialog>
    <button @click="dialog = !dialog">
      Show the dialog
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
```

## Add a close button

```vue live
<template>
  <div>
    <VDialog v-model="dialog" :classes="{ bg: 'bg-black-alpha' }">
      <div class="bg-white">
        This is the dialog content.<br />
        <button @click="dialog = false">
          Close
        </button>
      </div>
    </VDialog>
    <button @click="dialog = !dialog">
      Show the dialog
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
```

## Prevent scrolling

```vue live
<template>
  <VDialog no-scroll :classes="{ bg: 'bg-black-alpha' }">
    <template #toggle="{ bind, on }">
      <button v-bind="bind" v-on="on">
        Show the dialog
      </button>
    </template>

    <div class="bg-white">
      This is the dialog content.
    </div>
  </VDialog>
</template>
```

## With transitions

```vue live
<template>
  <div>
    <VDialog
      v-model="dialog"
      transition="slide-up"
      bg-transition="fade"
      :classes="{ bg: 'bg-black-alpha' }"
    >
      <div class="bg-white">
        This is the dialog content.<br />
        It traps the user focus.<br />
        <button @click="dialog = false">
          Close
        </button>
      </div>
    </VDialog>
    <button @click="dialog = !dialog">
      Show the dialog
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
```

## Custom Classes

This component can accept a `classes` prop to customize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
