# Btn

A functional component for logically rendering the appropriate actionable elements: `<RouterLink>`, `<a>`, or `<button>`. At first glance, this may not be a particularly helpful component, but it really simplifies list rendering.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VBtn/VBtn.vue)

Features:

- Renders a `<button>` by default.
- Renders a [`<RouterLink>`](https://router.vuejs.org/api/#router-link) when provided a `to` prop.
- Renders an `<a>` link when provided a `href` prop.
- Renders an `<form>` link when provided an `action` and `data` prop.
- Adds `type="button"` to `<button>` elements.
- Adds `rel="noopener"` to links with `target="blank"`

## Button Example (Default)

```vue live
<template>
  <VBtn @click="log">
    Log event to console
  </VBtn>
</template>

<script>
export default {
  methods: {
    log: console.log,
  },
};
</script>
```

## RouterLink Example

```vue live
<template>
  <VBtn :to="'/'">
    Home
  </VBtn>
</template>
```

## Anchor Link Example

```vue live
<template>
  <VBtn href="/components/Btn.html">
    Vuetensils
  </VBtn>
</template>
```

## Form Example

```vue live
<script>
export default {
  methods: {
    async onSubmit(event) {
      console.log(event); // a standard form submit event
      event.preventDefault();
      const form = event.target
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
      });
    },
  },
}
</script>

<template>
  <VBtn
    action="https://jsonplaceholder.typicode.com/posts"
    :data="{ name: 'value', other: 'value 2' }"
    @submit="onSubmit"
  >
    Vuetensils
  </VBtn>
</template>
```

## List Example

```vue live
<template>
  <ul>
    <li v-for="item in items" :key="item.text">
      <VBtn v-bind="item.bind" v-on="item.on || {}">
        {{ item.text }}
      </VBtn>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Home (router-link)',
        bind: {
          to: '/'
        }
      },
      {
        text: 'Second (anchor link)',
        bind: {
          href: '/components/Btn.html'
        }
      },
      {
        text: 'Third (button)',
        on: {
          click: () => console.log('click')
        }
      }
    ]
  })
};
</script>
```
