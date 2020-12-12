# Try

A utillity component to wrap around components that may or may not throw and error or reject a promise. Provides you with some logic to handle those errors.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTry/VTry.vue)

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VTry } from 'vuetensils/src/components';

Vue.component('VTry', VTry);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VTry } from 'vuetensils/src/components';

export default {
  components: {
    VTry,
  },
  // ...
};
</script>
```

## Default Example

```vue live
<template>
  <VTry>
    <template #default="error">
      <ThisWillThrow />

      <div v-if="error">
        There was an error in the component:
        <pre>{{ error }}</pre>
      </div>
    </template>
  </VTry>
</template>

<script>
import Vue from 'vue';
Vue.component('ThisWillThrow', {
  methods: {
    onClick() {
      throw new Error('ThisWillThrow...threw...');
    }
  },
  template: '<button @click="onClick">Throw</button>',
});
export default {};
</script>
```

## With Rejected Promise

```vue live
<template>
  <VTry>
    <template #default="error">
      <ThisWillReject />

      <div v-if="error">
        There was an error in the component:
        <pre>{{ error }}</pre>
      </div>
    </template>
  </VTry>
</template>

<script>
import Vue from 'vue';
Vue.component('ThisWillReject', {
  methods: {
    onClick() {
      return Promise.reject(new Error('ThisWillReject...rejected...'));
    }
  },
  template: '<button @click="onClick">Reject</button>',
});
export default {};
</script>
```


## Events

```vue live
<template>
  <VTry @catch="onError">
    <ThisWillThrow />

    Error was logged to the console.
  </VTry>
</template>

<script>
import Vue from 'vue';
Vue.component('ThisWillThrow', {
  /* eslint-disable-next-line vue/require-render-return */
  render() {
    throw new Error('ThisWillThrow...threw...');
  }
});

export default {
  methods: {
    onError(error) {
      console.log('There was an error in the component:', error);
    }
  }
};
</script>
```

## Catch Slot

If you want to only show the error handling template on errors, then the catch slot can simplify the logic.

```vue live
<template>
  <VTry>
    <ThisWillThrow />

    <template #catch="error">
      <pre>{{ error }}</pre>
    </template>
  </VTry>
</template>

<script>
import Vue from 'vue';
Vue.component('ThisWillThrow', {
  methods: {
    onClick() {
      throw new Error('ThisWillThrow...threw...');
    }
  },
  template: '<button @click="onClick">Throw</button>',
});
export default {};
</script>
```
