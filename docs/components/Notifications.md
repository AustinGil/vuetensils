# Notifications WIP

<!-- Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.

The components accepts four props: `root`, `rootMargin`, `threshold`, and `options`. The first three correspond to the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) options properties, or you can pass them all together to the `options` prop.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VIntersect/VIntersect.vue) -->

# Usage

The library exports a default `VNotifications` component as well as a `notify` named export function. The `VNotifications` component must be placed somewhere in your application. Usually a top level `<App>` component is a good spot. Creating notifications relies on the execution of the `notify` function.

If you want to make the `notify` function available within your template, there are a few options:

1. Import the function into a `<script setup>`
  ```vue
  <script setup>
  import { notify } from './components/VNotifications/VNotifications.vue';
  </script>
  ```
2. Return it from a `setup()` function
  ```vue
  <script>
  import { notify } from './components/VNotifications/VNotifications.vue';
  export default {
    setup() {
      return {
        notify
      }
    }
  }
  </script>
  ```
3. Assign it to a method
  ```vue
  <script>
  import { notify } from './components/VNotifications/VNotifications.vue';
  export default {
    methods: {
      notify
    }
  }
  </script>
  ```
3. Extend the [`globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties)
  ```js
  import { createApp } from 'vue'
  import VNotifications, { notify } from './components/VNotifications/VNotifications.vue';

  const app = createApp()
  app.component('VNotifications', VNotifications)
  app.config.globalProperties.$vnotify = notify;
  app.mount('#app')
  ```
(Note that if you register the component via plugin, this will be setup for you)

## Styled Example

This application extends the `globalProperties` method described above and placed both the component and the `notify` function in the same place, but you can separate them.

```vue live
<script>
export default {
  data: () => ({
    count: 0,
  }),
  methods: {
    click() {
      this.count += 1
      this.$vnotify(`The count has increased to ${this.count}`)
    }
  },
};
</script>

<template>
  <div class="styled">
    <button @click="click">Increment counter</button>

    <VNotifications timeout="5000" persistent transition="slide-left"/>
  </div>
</template>

<style>
.vts-notifications {
  display: grid;
  justify-items: end;
  right: 0;
  bottom: 0;
  max-width: 20rem;
  padding: 1rem;
}
.vts-notification {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
  border: 2px solid;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: #fff;
}
.vts-notification__dismiss {
  border: 0;
  padding: 0;
  font-size: 1.5rem;
  background-color: transparent;
}
</style>
```

## Notification Arguments

The `notify` function accepts either a string, or an object. If you pass a string, the notification settings will be inherited from the `<VNotifications>` component props. Using an object allows you to customize individual notifications.

```vue live
<template>
  <div class="styled">
    <button @click="click1">Show default notification</button>
    <button @click="click2">Show custom notification</button>
  </div>
</template>

<script>
export default {
  methods: {
    click1() {
      this.$vnotify("Just the text. I'll inherit the rest.")
    },
    click2() {
      this.$vnotify({
        text: "With an object, I can be more specific.",
        timeout: false,
        persistent: false   
      })
    }
  },
};
</script>
```

### Notify Object Argument

```ts
{
  id?: string, // Unique identifier for the notification
  text: string, // Notification text
  persistent?: boolean, // Determines if the dismiss button should be displayed
  timeout?: number|false, // Time in milliseconds to display the notification
}
```

<!-- | Item         | Price     | # In stock |
|--------------|-----------|------------|
| Juicy Apples | 1.99      | *7*        |
| Bananas      | **1.89**  | 5234       | -->

## Timeouts

By default, notifications will pop in and just kind of hang out until you ask them to leave. But if you want, you can set a deadline for them to make their exit. You can pass a timeout in milliseconds either through the `<VNotifications>` `timeout` prop, or as the `timeout` property of the `notify` function's object argument.

## Persistent vs. Dismissible

Sometimes you want notifications that the user can acknowledge and dismiss, and other times you want notifications that persist. You can control that through the `persistent` prop on `<VNotifications>` which accepts a boolean value. You can also overwrite the settings on an individual notification through the `notify` functions 
