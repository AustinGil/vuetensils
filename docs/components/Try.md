# Try

A utillity component to wrap around components that may or may not throw and error or reject a promise. Provides you with some logic to handle those errors.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTry/VTry.vue)

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
export default {
  components: {
    ThisWillThrow: {
      template: '<button @click="onClick">Throw</button>',
      methods: {
        onClick() {
          throw new Error('ThisWillThrow...threw...');
        }
      },
    }
  }
};
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
export default {
  components: {
    ThisWillReject: {
      methods: {
        onClick() {
          return Promise.reject(new Error('ThisWillReject...rejected...'));
        }
      },
      template: '<button @click="onClick">Reject</button>',
    },
  }
}
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
export default {
  components: {
    ThisWillThrow: {
      render() {
        throw new Error('ThisWillThrow...threw...');
      }
    }
  },
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
export default {
  components: {
    ThisWillThrow: {
      template: '<button @click="onClick">Throw</button>',
      methods: {
        onClick() {
          throw new Error('ThisWillThrow...threw...');
        }
      },
    }
  }
};
</script>
```
