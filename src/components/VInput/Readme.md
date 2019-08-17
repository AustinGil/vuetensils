```vue
<template>
  <div>
    {{ input }}
    <VInput v-model="input" label="Radios" type="select" :options="[1, 2, 3, 4]" required>
      <template v-slot:description="invalid">
        <pre>{{ invalid }}</pre>
      </template>
    </VInput>
  </div>
</template>

<script>
export default {
  data: () => ({
    input: ""
  })
}
</script>
```

```vue
<template>
  <div>
    {{ input }}
    <VInput v-model="input" label="test" type="checkbox" required />
  </div>
</template>

<script>
export default {
  data: () => ({
    input: ""
  })
}
</script>
```

```vue
<template>
  <form @submit.prevent>
    {{ input }}
    <br />
    <VInput
      v-model="input"
      label="test"
      required
      min="1"
      max="2"
      minlength="2"
      maxlength="20"
      pattern="[0-9]{4}"
    >
      <template v-slot:description="invalid">
        Here's a description of the input, and I also have access to the validation state object.
        <pre>{{ invalid }}</pre>
        Which I can transform into an error list:
        <ul>
          <li
            v-for="invalid in Object.keys(invalid).filter(
              key => invalid[key] && key !== 'anyInvalid'
            )"
          >
            {{ errorText(invalid) }}
          </li>
        </ul>
      </template>
    </VInput>
  </form>
</template>

<script>
export default {
  data: () => ({
    input: "blah",
    options: [1, 2, 3]
  }),

  methods: {
    errorText(error) {
      const map = {
        required: "This field is required",
        minLength: "Must be at least 2 characters",
        pattern: "Must be a 4 digit number"
      }
      return map[error]
    }
  }
}
</script>
```

```vue
<template>
  <VInput label="test" type="textarea" class="styled" placeholder="test" />
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <VInput label="test" type="textarea" class="styled" placeholder="test" />
</template>

<script>
export default {}
</script>
```
